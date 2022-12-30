import { useEffect, useState, useLayoutEffect } from "react";
import clsx from "clsx";
import styles from "./UserWeb.module.scss";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";

function UserWeb({
  items = [],
  heightTemplate = 1000,
  widthContent,
  width = "100%",
  height = "100%",
  setShowPreview,
  showPreview,
  children,
}) {
  const [data, setData] = useState(structuredClone(items));
  const icons = {
    Facebook: <GrFacebookOption />,
    Instagram: <GrInstagram />,
    Github: <GrGithub />,
    Linkedin: <GrLinkedin />,
    Youtube: <GrYoutube />,
  };
  useLayoutEffect(() => {
    data.map((item) => {
      if (!item.width.toString().includes("%")) {
        item.width = `${(item.width / widthContent) * 100 + 6}%`;
      }
      if (!item.height.toString().includes("%")) {
        item.height = `${(item.height / heightTemplate) * 100}%`;
      }
      if (!item.top.toString().includes("%")) {
        item.top = `${(item.top / heightTemplate) * 100}%`;
      }
    });
  }, []);
  const renderItem = () => {
    if (data) {
      return data.map((item, index) => {
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
                ...item.styleDefault,
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
                  border: "none",
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
        height: heightTemplate ? heightTemplate + 500 : 1000,
      }}
    >
      {items && renderItem()}
    </div>
  );
}
export default UserWeb;