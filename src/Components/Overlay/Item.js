import { useDrop, useDragDropManager } from "react-dnd";
import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import styles from "./Overlay.module.scss";

import { ShowOverlay } from "~/Store/Context";

function Item({ top, left }) {
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [showOverlay, setShowOverlay] = useContext(ShowOverlay);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item", "MULTI_ITEM"],
    drop(item, monitor) {
      console.log("check");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  //set style when drop
  useEffect(() => {
    setBackgroundColor(
      isActive
        ? "rgba(102, 102, 255, 0.2)"
        : canDrop
        ? "rgba(255, 102, 153, 0.2)"
        : "#fff"
    );
  }, [{ isActive, canDrop }]);

  let isDragging = useDragDropManager().monitor.isDragging();
  useEffect(() => {
    setShowOverlay(isDragging);
  }, [isDragging]);

  return (
    <div
      className={clsx(styles.overlay)}
      style={{
        top: top,
        left: left,
        display: showOverlay ? "block" : "none",
        backgroundColor: backgroundColor,
      }}
    ></div>
  );
}

export default Item;
