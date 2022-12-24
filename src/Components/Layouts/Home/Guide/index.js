import clsx from "clsx";
import { useState } from "react";

import styles from "./Guide.module.scss";
import guide1 from "~/assets/image_guide/guide1.png";
import guide2 from "~/assets/image_guide/guide2.png";
import guide3 from "~/assets/image_guide/guide3.png";
import guide4 from "~/assets/image_guide/guide4.png";

function Guide() {
  const [showGuide1, setShowGuide1] = useState(false);
  const [showIconGuide2, setShowIconGuide2] = useState(false);
  const [showGuide2, setShowGuide2] = useState(false);
  const [showIconGuide3, setShowIconGuide3] = useState(false);
  const [showGuide3, setShowGuide3] = useState(false);
  const [showIconGuide4, setShowIconGuide4] = useState(false);
  const [showGuide4, setShowGuide4] = useState(false);

  // console.log(showIconGuide2);
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
            setShowIconGuide3(!showIconGuide3);
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
            display: showIconGuide3 && showGuide2 ? "block" : "none",
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
      <div className={clsx(styles.box_step)}>
        <div
          className={clsx(styles.icon_step)}
          onClick={(e) => {
            setShowGuide3(!showGuide3);
            setShowIconGuide4(!showIconGuide4);
          }}
          style={{
            display: "none",
            display: showIconGuide3 ? "flex" : "none",
          }}
        >
          <h4>3</h4>
        </div>
        <div
          className={clsx(styles.content_guide_step)}
          style={{
            display: "none",
            display: showIconGuide3 && showGuide3 ? "block" : "none",
          }}
        >
          <img
            className={clsx(styles.img)}
            src={guide3}
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
            setShowGuide4(!showGuide4);
          }}
          style={{
            display: "none",
            display: showIconGuide4 ? "flex" : "none",
          }}
        >
          <h4>4</h4>
        </div>
        <div
          className={clsx(styles.content_guide_step)}
          style={{
            display: "none",
            display: showIconGuide4 && showGuide4 ? "block" : "none",
          }}
        >
          <img
            className={clsx(styles.img)}
            src={guide4}
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
