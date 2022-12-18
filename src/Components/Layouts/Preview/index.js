import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import styles from "./Preview.module.scss";
import Grid from "~/Components/Grid";
import render from "./render";

function Preview({
  items,
  heightTemplate = 1000,
  width = "80%",
  setShowPreview,
  showPreview,
  children,
}) {
  //render
  useEffect(() => {
    if (showPreview) {
      render();
    }
  }, [showPreview]);

  return (
    <div className={clsx(styles.wrapper)}>
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
        }}
        id='preview'
      ></div>
    </div>
  );
}
export default Preview;
