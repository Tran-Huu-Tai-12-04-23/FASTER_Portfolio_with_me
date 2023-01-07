import clsx from "clsx";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from "./HomeContent.module.scss";
import img_content_1 from "../../../../assets/img/img_content_1.png";
import ChooseTemplate from "../Chootemplate";

function HomeContent({ stateModalChooseTemplate, modeTheme, setModeTheme }) {
    return (
        <div
            className={clsx(styles.wrapper)}
            id='home'
            style={{
                backgroundColor: !modeTheme ? "#212121" : "#fff",
            }}
        >
            <div className={clsx(styles.wrapper_info)}>
                <h1>Ready to started with your portfolio?</h1>

                <Link to='/chooseTemplate' className={clsx(styles.button)}>
                    Try with us
                </Link>
            </div>
            <img src={img_content_1} className={clsx(styles.img)}></img>
        </div>
    );
}
export default HomeContent;
