import clsx from "clsx";
import { useState } from "react";

import styles from "./Guide.module.scss";
import guide1 from "~/assets/image_guide/guide1.png";
import guide2 from "~/assets/image_guide/guide2.png";

function Guide() {
  const [showGuide1, setShowGuide1] = useState(false);
  const [showIconGuide2, setShowIconGuide2] = useState(false);
  const [showGuide2, setShowGuide2] = useState(false);

  console.log(showIconGuide2);
  return (
    <div className={clsx(styles.wrapper)} id='guide'>
      <h1 className={clsx(styles.title)}>Quick creation guide</h1>

      <div className={clsx(styles.box_step)}>
        <div
          className={clsx(styles.icon_step)}
          onClick={(e) => {
            setShowGuide1(!showGuide1);
            setShowIconGuide2(!showIconGuide2);
          }}
        >
          <h4>1</h4>
        </div>
        <div
          className={clsx(styles.content_guide_step)}
          style={{
            display: showGuide1 ? "block" : "none",
          }}
        >
          <img
            className={clsx(styles.img)}
            src={guide1}
            style={{
              width: "90%",
              height: 400,
              borderRadius: "24px",
              boxShadow: "5px 5px 15px 5px #000000",
              marginBottom: "40px",
            }}
          ></img>
        </div>
      </div>
      <div className={clsx(styles.box_step)}>
        <div
          className={clsx(styles.icon_step)}
          onClick={(e) => {
            setShowGuide2(!showGuide2);
          }}
          style={{
            display: "none",
            display: showIconGuide2 ? "flex" : "none",
          }}
        >
          <h4>2</h4>
        </div>
        <div
          className={clsx(styles.content_guide_step)}
          style={{
            display: "none",
            display: showIconGuide2 && showGuide2 ? "block" : "none",
          }}
        >
          <img
            className={clsx(styles.img)}
            src={guide2}
            style={{
              width: "90%",
              height: 400,
              borderRadius: "24px",
              boxShadow: "5px 5px 15px 5px #000000",
              marginBottom: "40px",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Guide;
