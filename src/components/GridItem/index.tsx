import React from "react";
import { Level } from "../../helpers/imc";
import styles from "./GridItem.module.css";
import upImage from "../../assets/up.png";
import downImage from "../../assets/down.png";
import { useLangs } from "../../context/langsContext";
import * as langs from "../../langs/texts.json";

type Props = {
    item: Level
};

export const GridItem = ({ item }: Props) => {
    const [title, setTitle] = React.useState("");

    const { language } = useLangs();
    const texts = langs;

    React.useEffect(() => {
        if(item.title === "Magreza") {
            setTitle(texts.imc_levels[1][language])
        }
        if(item.title === "Normal") {
            setTitle(texts.imc_levels[2])
        }
        if(item.title === "Sobrepeso") {
            setTitle(texts.imc_levels[3][language])
        }
        if(item.title === "Obesidade") {
            setTitle(texts.imc_levels[4][language])
        }
    },[language])
    return (
        <div className={styles.main} style={{ backgroundColor: item.color }}>
            <div className={styles.gridIcon}>
                <img src={item.icon === "up" ? upImage : downImage} alt="" width="30" />
            </div>
            <div className={styles.gridTitle}>{title}</div>

            {item.yourImc &&
                <div className={styles.yourImc}>{`${texts.imc_text.your_imc[1][language]} ${item.yourImc} ${texts.imc_text.your_imc[2]}`}</div>
            }

            <div className={styles.gridInfo}>
                <>
                    {`${texts.imc_text.imc_result[1][language]}`} <strong>{item.imc[0]} {`${texts.imc_text.imc_result[2][language]}`}  {item.imc[1]}</strong>
                </>
            </div>
        </div>
    );
}