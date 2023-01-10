import { useState, useContext } from "react";

import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

import clsx from "clsx";
import styles from "./MenuUntil.module.scss";
import { BoxMenu, TipSuggest } from "~/Components";
import { ContextShowEditorComponent } from "~/Store/Context";

function MenuUntil({ state, valueState, children }) {
    const [show, setShow] = useState(true);
    const [showMenuUtil, setShowMenuUtil] = useState(true);
    const [showEditorComponent, setEditorComponent] = useContext(
        ContextShowEditorComponent
    );

    const handleChangeMenu = () => {
        setShow(!show);
        setShowMenuUtil(!showMenuUtil);
        if (show === true) {
            state("0");
        } else {
            state("22%");
        }
    };

    return (
        <div
            style={{
                width: valueState,
            }}
            className={clsx(styles.wrapper, {
                [styles.translate_x]: !showMenuUtil,
            })}
        >
            {/* <h1
                className={clsx(styles.title, {
                    [styles.hidden]: !show,
                })}
            >
                {showEditorComponent ? "Editor" : "Components"}
            </h1> */}
            {/* //contenm */}
            <div className={clsx(styles.wrapper_component)}>
                <BoxMenu></BoxMenu>
            </div>

            {showMenuUtil ? children : <></>}
        </div>
    );
}

export default MenuUntil;
