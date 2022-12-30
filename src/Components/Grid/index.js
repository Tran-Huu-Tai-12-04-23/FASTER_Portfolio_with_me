import clsx from "clsx";
import {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import uuid from "react-uuid";

import styles from "./Grid.module.scss";
import { Item, Overlay, TipSuggest } from "~/Components";
import {
  ContextItemsIngrid,
  ElementContentPortfolio,
  ShowOverlay,
  ContextReducer,
} from "~/Store/Context";
import { setUndo, setRedo, undo, redo } from "~/Store/reducer/actions";
// import { AiOutlineConsoleSql } from "react-icons/ai";

function Grid(props) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [contentPortfolio, setShowTrash, widthContent] = useContext(
    ElementContentPortfolio
  );
  const grid = useRef();
  // console.log(widthContent);
  const [showOverlay, setShowOverlay] = useState(false);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item", "MULTI_ITEM"],
    drop(item, monitor) {
      if (item.inGrid) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left, top;
        if (item.left) {
          let leftItem;
          if (item.left.toString().includes("%")) {
            leftItem = item.left.substring(0, item.left.length - 1);
          } else {
            leftItem = item.left;
          }
          const widthContentItem = grid.current.offsetWidth;
          const leftIt =
            (widthContentItem / 100) * parseInt(leftItem) + delta.x;
          left = `${(parseInt(leftIt) / widthContentItem) * 100}%`;
          const check = leftIt + delta.x;
          if (check < 0) {
            left = "0%";
          }
        } else {
          const widthContentItem = grid.current.offsetWidth;
          left = `${
            (Math.round(item.left + delta.x) / widthContentItem) * 100
          }%`;
          const check =
            (Math.round(item.left + delta.x) / widthContentItem) * 100;
          if (check < 0) {
            left = "0%";
          }
        }
        if (item.top) {
          top = item.top.toString().includes("%")
            ? `calc(${item.top} + ${delta.y}px)`
            : Math.round(item.top + delta.y);
          const check = top + delta.y;
          if (top < 0) {
            top = 0;
          }
        } else {
          top = Math.round(item.top + delta.y);
          if (top < 0) {
            top = 0;
          }
        }
        state.stackUndo.push(structuredClone(item.items));
        moveItem(item.id, left, top, item.inGrid, item.items, item.stylesItem);
      } else if (item.inGrid === false && item.isMulti === false) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        const data = monitor.getDifferenceFromInitialOffset();
        let left = item.widthMenu ? delta.x - item.widthMenu : delta.x - 400;
        let top = delta.y - 100;
        if (left < 0) {
          left = 0;
        }
        if (top < 0) {
          top = 0;
        }
        const widthContentItem = grid.current.offsetWidth;
        left = `${(left / widthContentItem) * 100}%`;

        state.stackUndo.push(structuredClone(item.items));

        addItem(
          uuid(),
          item.type,
          left,
          top + valueScrollTop,
          item.InfoIcon ? item.InfoIcon.Name : "",
          item.styleDefault,
          item.src,
          item.href,
          item.valueItem
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const addItem = (
    id,
    type,
    left = "200px",
    top = "100px",
    InfoIcon,
    styleDefault,
    src,
    href,
    valueItem,
    width = 200,
    height = type === "a" ? 30 : 100
  ) => {
    var styles = {};
    var textValues = "";
    var height;
    var width;

    if (type === "input") {
      styles = {
        backgroundColor: "transparent",
        color: "#ccc",
        borderWidth: "1px",
        borderStyle: "outset",
        borderColor: "var(--primary)",
        padding: "12px",
      };
      textValues = "Enter text";
      height = 60;
      width = 200;
    }
    if (type === "button") {
      styles = {
        backgroundColor: "transparent",
        color: "#ccc",
        borderWidth: "1px",
        borderStyle: "outset",
        borderColor: "blue",
        padding: "12px",
        textAlign: "center",
        textTransform: "uppercase",
      };
      textValues = "Enter name button";
      height = 50;
      width = 200;
    }
    if (type === "div") {
      styles = {
        border: " 1px solid #ccc",
        backgroundColor: "rgb(175, 67, 67)",
      };
    }
    if (type === "a") {
      styles = {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#757575",
        padding: "12px",
      };
    }
    if (type === "icon") {
      styles = {
        border: "none",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#FFCCFF",
        padding: "12px",
      };
      height = 60;
      width = 60;
    }
    setItems((prev) => {
      return [
        ...prev,
        {
          type,
          left,
          top,
          id,
          width: width,
          height: height,
          inGrid: true,
          isMulti: false,
          InfoIcon,
          styleDefault: styles,
          src,
          href,
          valueItem: textValues,
        },
      ];
    });
  };
  const moveItem = (id, left, top, inGrid, itemsItem, stylesItem) => {
    itemsItem.map((item) => {
      if (item.id === id) {
        console.log(`left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} `);
        if (
          stylesItem.width > 600 &&
          stylesItem.height > 300 &&
          top === 0 &&
          left === "0%"
        ) {
          item.width = "100%";
        }
        item.top = top;
        if (left) {
          item.left = left;
        }
      }
    });
  };
  //show, hidden trash
  let isDragging = useDragDropManager().monitor.isDragging();
  useEffect(() => {
    setShowTrash(isDragging ? true : false);
  }, [isDragging]);

  //load styles
  useLayoutEffect(() => {
    const itemDomReal = document.getElementById(state.id_item_selected);
    if (itemDomReal) {
      itemDomReal.style.fontSize = state.font_size;
      itemDomReal.style.fontFamily = state.font_family;
      itemDomReal.style.borderRadius = state.border_radius;
      itemDomReal.style.borderStyle = state.border_style;
      itemDomReal.style.borderColor = state.border_color;
      itemDomReal.style.fontWeight = state.font_weight ? "bold" : "normal";
      itemDomReal.style.textAlign = state.text_align ? "center" : "";
      itemDomReal.style.borderWidth = state.border_size;
      itemDomReal.style.textTransform = state.text_transform ? "uppercase" : "";
      itemDomReal.style.lineHeight = state.line_height;
      itemDomReal.style.color = state.color;
      itemDomReal.style.backgroundColor = state.background_color;
    }
  }, [state]);

  const renderItem = () => {
    if (items) {
      return items.map((item, index) => {
        return (
          <Item
            key={item.id}
            id={item.id}
            inGrid={true}
            type={item.type}
            width={item.width}
            height={item.height}
            valueItem={item.valueItem}
            center={item.center}
            href={item.href}
            icon={false}
            styleDefault={item.styleDefault}
            InfoIcon={item.InfoIcon}
            textValue={item.textValue}
            widthContentItem={item.widthContentItem}
            stylesItem={{
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
            }}
            src={item.src}
          ></Item>
        );
      });
    }
  };

  return (
    <ShowOverlay.Provider value={[showOverlay, setShowOverlay]}>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={grid}
      >
        <div
          ref={drop}
          style={{
            backgroundColor,
          }}
          className={clsx(styles.wrapper)}
          id={props.id}
        >
          {items && renderItem()}
          {props.children}
        </div>
      </div>
    </ShowOverlay.Provider>
  );
}

export default Grid;
