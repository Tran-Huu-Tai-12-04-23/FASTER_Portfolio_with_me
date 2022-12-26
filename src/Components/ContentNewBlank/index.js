import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./ContentNewBlank.module.scss";
import { Template } from "~/Components";
import { templates } from "~/assets/img";
const contentTip = [
  "Create with  blue templates",
  "Create with professinal templates ",
  "Create with normal templates",
  "Create with pink templates",
];
function ContentNewBlank({ setShowModalChooseTemplate }) {
  function renderTemplate() {
    return templates.map((temp, index) => {
      const nameTemplate = "/template" + (index + 2);
      return (
        <a
          key={index + 1}
          href={nameTemplate}
          target='_blank'
          onClick={(e) => {
            setShowModalChooseTemplate(false);
          }}
        >
          <Template background={temp} content={contentTip[index]} />
        </a>
      );
    });
  }

  return (
    <Fragment>
      <h1 className={clsx(styles.heading)}>Choose Template</h1>

      <div className={clsx(styles.wrapper)}>
        <a
          href='/template1'
          target='_blank'
          onClick={(e) => {
            setShowModalChooseTemplate(false);
          }}
        >
          <Template
            key='0'
            content={contentTip[0]}
            icon={<FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>}
          />
        </a>
        {renderTemplate()}
      </div>
    </Fragment>
  );
}

export default ContentNewBlank;
