import { useState } from "react";

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import clsx from "clsx";
import styles from "./MenuUntil.module.scss";
import { BoxMenu, TipSuggest } from "~/Components";

function MenuUntil({ state, valueState, children }) {
  const [show, setShow] = useState(true);
  const [showMenuUtil, setShowMenuUtil] = useState(true);

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
      <h1
        className={clsx(styles.title, {
          [styles.hidden]: !show,
        })}
      >
        Components
      </h1>
      {/* //contenm */}
      <div className={clsx(styles.wrapper_component)}>
        <div className={clsx(styles.content)}>
          <BoxMenu></BoxMenu>
        </div>
      </div>
      <div className={clsx(styles.nav_icon)} onClick={() => handleChangeMenu()}>
        <div>
          <TipSuggest content='Close menu util' position='right'>
            <FontAwesomeIcon
              className={clsx(styles.btn_left_menu, {
                [styles.hidden]: !show,
              })}
              icon={faArrowAltCircleLeft}
            ></FontAwesomeIcon>
          </TipSuggest>
        </div>
        <div>
          <TipSuggest content='Open menu util' position='right'>
            <FontAwesomeIcon
              className={clsx(styles.btn_right_menu, {
                [styles.hidden]: show,
              })}
              icon={faArrowAltCircleRight}
            ></FontAwesomeIcon>
          </TipSuggest>
        </div>
      </div>
      {showMenuUtil ? children : <></>}
    </div>
  );
}

export default MenuUntil;
