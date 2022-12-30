import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import styles from "./Preview.module.scss";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";

function Preview({
  items,
  heightTemplate = 1000,
  width = "76%",
  setShowPreview,
  showPreview,
  children,
}) {
  const icons = {
    Facebook: <GrFacebookOption />,
    Instagram: <GrInstagram />,
    Github: <GrGithub />,
    Linkedin: <GrLinkedin />,
    Youtube: <GrYoutube />,
  };
  const renderItem = () => {
    if (items) {
      return items.map((item, index) => {
        if (item.type === "img") {
          return (
            <img
              key={index}
              src={item.src}
              style={{
                width: item.width,
                height: item.height,
                position: "absolute",
                top: item.top,
                left: item.left,
                ...item.styleDefault,
                zIndex: 1,
                transform: item.center ? "translateX(-50%)" : "",
              }}
            ></img>
          );
        } else if (item.type === "input" || item.type === "button") {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                height: item.height,
                width: item.width,
                ...item.styleDefault,
                zIndex: 2,
                transform: item.center ? "translateX(-50%)" : "",
              }}
            >
              {item.valueItem}
            </div>
          );
        } else if (item.type === "div") {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                height: item.height,
                width: item.width,
                transform: item.center ? "translateX(-50%)" : "",
                ...item.styleDefault,
                zIndex: 1,
              }}
            ></div>
          );
        } else if (item.type === "a") {
          return (
            <a
              key={index}
              href={item.href}
              target={"_blank"}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                height: item.height,
                width: item.width,
                ...item.styleDefault,
                zIndex: 2,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.textValue}
            </a>
          );
        } else if (item.type === "icon") {
          // console.log(item);
          return (
            <div
              className={clsx(styles.icon)}
              key={index}
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                height: item.height,
                width: item.width,
                // ...item.styleDefault,
                padding: "0",
                border: "none",
                zIndex: 2,
              }}
            >
              <a
                href={item.href}
                target={"_blank"}
                style={{
                  width: "100%",
                  height: "100%",
                  ...item.styleDefault,
                }}
              >
                {item.InfoIcon ? icons[item.InfoIcon] : null}
              </a>
            </div>
          );
        }
      });
    }
  };
  return (
    <div
      className={clsx(styles.wrapper)}
      style={{
        height: heightTemplate + 400,
      }}
    >
      <AiOutlineClose
        className={clsx(styles.icon_close)}
        onClick={(e) => {
          setShowPreview(false);
        }}
      ></AiOutlineClose>
      <div
        className={clsx(styles.wrapper_template)}
        style={{
          width: width,
          height: heightTemplate,
          width: "76%",
        }}
        id='preview'
      >
        {items && renderItem()}
      </div>
    </div>
  );
}
export default Preview;
