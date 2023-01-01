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
  ContextShowEditorComponent,
  GridWidth,
} from "~/Store/Context";
import {
  setUndo,
  setRedo,
  undo,
  redo,
  setIdItemSelected,
  setColor,
  setFontSize,
  setFontFamily,
  setBorderRadius,
  setBorderStyle,
  setBorderColor,
  setFontWeight,
  setTextAlign,
  setBorderSize,
  setLineHeight,
  setTextTransform,
  setBackgroundColor,
} from "~/Store/reducer/actions";
import { TfiHandOpen } from "react-icons/tfi";
// import { AiOutlineConsoleSql } from "react-icons/ai";

function Grid(props) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColorGrid] = useState("#fff");
  const [contentPortfolio, setShowTrash, widthContent] = useContext(
    ElementContentPortfolio
  );
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
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
          // left = item.left + delta.x;
          let leftIt;
          if (item.left.toString().includes("%")) {
            leftIt = item.left.toString().substring(0, item.left.length - 1);
            // console.log(leftIt);
            left = `${
              (((leftIt / 100) * grid.current.offsetWidth + delta.x) /
                grid.current.offsetWidth) *
              100
            }%`;
          }
        } else {
          left = `${(delta.x / grid.current.offsetWidth) * 100}%`;
          // left = Math.round(item.left + delta.x);
        }
        if (item.top) {
          top = item.top.toString().includes("%")
            ? `calc(${item.top} + ${delta.y}px)`
            : Math.round(item.top + delta.y);
        } else {
          top = Math.round(item.top + delta.y);
        }
        // state.stackUndo.push(structuredClone(item.itemsDrag));
        // console.log(left);
        // console.log(top);
        if (item.type === "background" || item.type === "backgroundImage") {
          left = 0;
          if (top < 0 && top) {
            top = 0;
          }
        }
        moveItem(item.id, left, top, item.inGrid, item.itemsDrag);
      } else if (item.inGrid === false && item.isMulti === false) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        const data = monitor.getDifferenceFromInitialOffset();
        let left = item.widthMenu ? delta.x - item.widthMenu : delta.x - 400;
        let top = delta.y - 100;
        if (left < 0) {
          left = 0;
        }
        if (top < 0 && top) {
          top = 0;
        }

        if (item.type === "background" || item.type === "backgroundImage") {
          top -= 50;
          if (top < 0) {
            top = 0;
          }
        }
        state.stackUndo.push(structuredClone(item.itemsDrag));
        left = `${(left / grid.current.offsetWidth) * 100}%`;
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
    setEditorComponent(!showEditorComponent);
    dispatch(setIdItemSelected(id));
    const loadStyleComponentInInitState = (styles) => {
      dispatch(
        setBackgroundColor(styles.backgroundColor ? styles.backgroundColor : "")
      );
      dispatch(setColor(styles.color ? styles.color : ""));
      dispatch(setFontSize(styles.fontSize ? styles.fontSize : ""));
      dispatch(setFontFamily(styles.fontFamily ? styles.fontFamily : ""));
      dispatch(setBorderRadius(styles.borderRadius ? styles.borderRadius : ""));
      dispatch(setBorderStyle(styles.borderStyle ? styles.borderStyle : ""));
      dispatch(setBorderColor(styles.borderColor ? styles.borderColor : ""));
      dispatch(setFontWeight(styles.fontWeight === "bold" ? true : false));
      dispatch(setTextAlign(styles.textAlign === "center" ? true : false));
      dispatch(setBorderSize(styles.borderWidth ? styles.borderWidth : ""));
      dispatch(
        setTextTransform(styles.textTransform === "uppercase" ? true : false)
      );
      dispatch(setLineHeight(styles.lineHeight ? styles.lineHeight : ""));
    };
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
        borderRadius: "4px",
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
        color: "#757575",
        borderRadius: "4px",
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
      if (InfoIcon.trim() === "Facebook") {
        styles = {
          ...styles,
          color: "blue",
          backgroundColor: "rgba(255, 255, 255)",
        };
      }
      if (InfoIcon.trim() === "Github") {
        styles = {
          ...styles,
          color: "#000",
          backgroundColor: "rgba(255, 255, 255)",
        };
      }
      if (InfoIcon.trim() === "Linkedin") {
        styles = { ...styles, color: "#00FFFF" };
      }
      if (InfoIcon.trim() === "Youtube" || InfoIcon.trim() === "Instagram") {
        styles = { ...styles, color: "red" };
      }

      console.log(styles);
      height = 60;
      width = 60;
    }
    if (type === "background") {
      styles = {
        border: "none",
        backgroundColor: "#ccc",
        width: "100%",
      };
      height = 400;
      width = "100%";
      left = "0%";
    }
    if (type === "backgroundImage") {
      styles = {
        border: "none",
        width: "100%",
      };
      height = 400;
      width = "100%";
      left = "0%";
    }
    loadStyleComponentInInitState(styles);
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
  const moveItem = (id, left, top, inGrid, itemsItem) => {
    setEditorComponent(true);
    const loadStyleComponentInInitState = (styles) => {
      dispatch(
        setBackgroundColor(styles.backgroundColor ? styles.backgroundColor : "")
      );
      dispatch(setColor(styles.color ? styles.color : ""));
      dispatch(setFontSize(styles.fontSize ? styles.fontSize : ""));
      dispatch(setFontFamily(styles.fontFamily ? styles.fontFamily : ""));
      dispatch(setBorderRadius(styles.borderRadius ? styles.borderRadius : ""));
      dispatch(setBorderStyle(styles.borderStyle ? styles.borderStyle : ""));
      dispatch(setBorderColor(styles.borderColor ? styles.borderColor : ""));
      dispatch(setFontWeight(styles.fontWeight === "bold" ? true : false));
      dispatch(setTextAlign(styles.textAlign === "center" ? true : false));
      dispatch(setBorderSize(styles.borderWidth ? styles.borderWidth : ""));
      dispatch(
        setTextTransform(styles.textTransform === "uppercase" ? true : false)
      );
      dispatch(setLineHeight(styles.lineHeight ? styles.lineHeight : ""));
    };
    itemsItem.map((item) => {
      if (item.id === id) {
        // console.log(`left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} `);
        item.left = left;
        item.top = top;
        if (item) {
          loadStyleComponentInInitState(item.styleDefault);
          dispatch(setIdItemSelected(id));
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

  useLayoutEffect(() => {
    // if (isDragging && !canDrop) {
    //   setEditorComponent(isOver && canDrop);
    // }
    // if( isDragging ) {
    // }
  }, [{ isOver, isDragging }]);

  // useEffect(() => {
  //   console.log("check");
  //   items.map((item) => {
  //     console.log(item.left);
  //     console.log((item.left / grid.current.offsetWidth) * 100);
  //   });
  //   console.log("check end");
  // }, []);
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
            itemsDrag={items}
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
      <GridWidth.Provider value={grid}>
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
      </GridWidth.Provider>
    </ShowOverlay.Provider>
  );
}

export default Grid;
