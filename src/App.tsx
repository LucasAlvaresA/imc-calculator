import React from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png"
import * as langs from "./langs/texts.json";
import { langsType } from "./types/Langs";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";

const App = () => {
  const [language, setLanguage] = React.useState('pt-br' as langsType);
  const [heightField, setHeightField] = React.useState<number>(0);
  const [weightField, setWeightField] = React.useState<number>(0);
  const [toShow, setToShow] = React.useState<Level | null>(null);

  const texts = langs;

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert(`${texts.calculateAlert[language]}`)
    }
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
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
          />
          <input 
            type="number"
            placeholder={texts.placeholder_weight[language]}
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWeightField(parseFloat(e.target.value))}
          />

          <button onClick={handleCalculateButton}>{texts.calculate_button[language]}</button>
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
              <div className={styles.rightArrow}></div>
              <GridItem item={toShow} />
            </div> 
          }
        </div>
      </div>
    </div>
  )
}

export default App;