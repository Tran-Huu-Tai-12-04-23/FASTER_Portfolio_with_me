import clsx from "clsx";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from "./HomeContent.module.scss";
import img_content_1 from "../../../../assets/img/img_content_1.png";
import ChooseTemplate from "../Chootemplate";

function HomeContent({ stateModalChooseTemplate, theme, setTheme }) {
    return (
        <div
            className={clsx(styles.wrapper)}
            id='home'
            style={{
                backgroundColor: !theme ? "var(--second_background)" : "#fff",
            }}
        >
            <div className={clsx(styles.wrapper_info)}>
                <h1>Ready to started with your portfolio?</h1>

                <button
                    className={clsx(styles.button)}
                    onClick={(e) => {
                        stateModalChooseTemplate(true);
                    }}
                >
                    Try with us
                </button>
            </div>
            <img src={img_content_1} className={clsx(styles.img)}></img>
        </div>
    );
}
export default HomeContent;
