import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import styles from "./Preview.module.scss";
import { Item } from "~/Components";

function Preview({
  items,
  heightTemplate = 1000,
  width = "76%",
  setShowPreview,
  showPreview,
  children,
}) {
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
        } else if (item.type === "input") {
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
              style={{
                position: "absolute",
                top: item.top,
                left: item.left,
                height: item.height,
                width: item.width,
                ...item.styleDefault,
                zIndex: 2,
              }}
            >
              {item.textValue}
            </a>
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
