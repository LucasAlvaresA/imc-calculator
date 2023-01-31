import React from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png"
import leftArrowImage from "./assets/leftarrow.png"
import brazilFlag from './assets/brazilflag.svg';
import usaFlag from './assets/usaflag.svg';
import spainFlag from './assets/spainflag.svg';
import * as langs from "./langs/texts.json";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";
import { useLangs } from "./context/langsContext";

const App = () => {
  const [heightField, setHeightField] = React.useState<number>(0);
  const [weightField, setWeightField] = React.useState<number>(0);
  const [toShow, setToShow] = React.useState<Level | null>(null);

  const { language, setLanguage } = useLangs();
  const texts = langs;

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert(`${texts.calculate_alert[language]}`)
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
          <div className={styles.langsArea}>
            <div 
              className={styles.langContainer} 
              onClick={() => setLanguage("pt-br")}
            >
              <img src={brazilFlag} alt="" />
              Português
            </div>
            <div 
              className={styles.langContainer} 
              onClick={() => setLanguage("en-en")}
            >
              <img src={usaFlag} alt="" />
              English
            </div>
            <div 
              className={styles.langContainer} 
              onClick={() => setLanguage("es-es")}
            >
              <img src={spainFlag} alt="" />
              Español
            </div>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>{texts.main_title[language]}</h1>
          <p>{texts.main_text[language]}</p>

          <input 
            type="number"
            placeholder={texts.placeholder_height[language]}
            value={heightField > 0 ? heightField : ""}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input 
            type="number"
            placeholder={texts.placeholder_weight[language]}
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button 
            onClick={handleCalculateButton}
            disabled={toShow ? true : false}
          >
            {texts.calculate_button[language]}
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div> 
          }
        </div>
      </div>
    </div>
  )
}

export default App;