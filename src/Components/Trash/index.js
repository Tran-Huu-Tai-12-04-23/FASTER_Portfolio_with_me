import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import clsx from "clsx";
import { FcEmptyTrash } from "react-icons/fc";

import styles from "./Trash.module.scss";
import {
  ContextItemsIngrid,
  ContextShowEditorComponent,
} from "~/Store/Context";

function Trash({ id, display }) {
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [idRemoved, setIdRemoved] = useState();
  //item in grid
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "MULTI_ITEM"],
    drop(item, monitor) {
      if (item.inGrid) {
        setIdRemoved(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    const newItems = items.filter((item) => {
      return item.id !== idRemoved;
    });
    setItems(newItems);
    setEditorComponent(false);
  }, [idRemoved]);
  return (
    <div
      id={id}
      ref={drop}
      style={{
        backgroundColor: isOver ? "red" : "#3366cc",
        display: display,
      }}
      className={clsx(styles.wrapper)}
    >
      <FcEmptyTrash
        style={{
          transition: "all 0.3s ease-in-out",
          fontSize: "80px",
          transform: isOver ? "scale(1.2)" : "",
          transform: isOver ? "translateY(20px)" : "",
        }}
      ></FcEmptyTrash>
    </div>
  );
}

export default Trash;
