import { faComputer, faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";

import styles from "./Header.module.scss";
import { Button, TipSuggest } from "~/Components";
import { Link } from "react-router-dom";

function Header({ setShowPreview }) {
  const [title, setTitle] = useState("Enter title");
  const handleDataTitle = (e) => {
    document.title = e.target.value;
    setTitle(e.target.value);
  };

  const handleDataTitleEmpty = (e) => {
    if (e.target.value === "") {
      setTitle("Trang web không có tiêu đề");
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.wrapper_input)}>
        <TipSuggest content='Return Home'>
          <Link to='/'>
            <FontAwesomeIcon
              className={clsx(styles.icon_home)}
              icon={faHomeLg}
            ></FontAwesomeIcon>
          </Link>
        </TipSuggest>

        <TipSuggest classNames={clsx(styles.input)} content='Edit'>
          <input
            value={title}
            onChange={handleDataTitle}
            onBlur={handleDataTitleEmpty}
          ></input>
        </TipSuggest>
      </div>

      <div className={clsx(styles.until_options)}>
        <TipSuggest content='Show preview'>
          <FontAwesomeIcon
            onClick={(e) => {
              setShowPreview(true);
            }}
            icon={faComputer}
          ></FontAwesomeIcon>
        </TipSuggest>
        {/* <TipSuggest content='Get Link'>
          <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>
        </TipSuggest> */}
        {/* <TipSuggest content='Share'>
          <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
        </TipSuggest> */}
        {/* <TipSuggest content='Settings'>
          <FontAwesomeIcon icon={faGears}></FontAwesomeIcon>
        </TipSuggest> */}
        {/* <TipSuggest content='Menu'>
          <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
        </TipSuggest> */}
        <TipSuggest content='Public'>
          <Button primary className={clsx(styles.button)}>
            Public
          </Button>
        </TipSuggest>
      </div>
    </div>
  );
}

export default Header;
