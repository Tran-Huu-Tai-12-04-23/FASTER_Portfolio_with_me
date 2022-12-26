import clsx from "clsx";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import uuid from "react-uuid";

import styles from "./Grid.module.scss";
import { Item, Overlay, TipSuggest } from "~/Components";
import {
  ContextItemsIngrid,
  ElementContentPortfolio,
  ShowOverlay,
  ContextReducer,
  ContextItemsMultiIngrid,
  wrapperContent,
} from "~/Store/Context";
// import { AiOutlineConsoleSql } from "react-icons/ai";

function Grid(props) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [contentPortfolio, setShowTrash, widthContent] = useContext(
    ElementContentPortfolio
  );
  // console.log(widthContent);
  const [showOverlay, setShowOverlay] = useState(false);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item", "MULTI_ITEM"],
    drop(item, monitor) {
      if (item.inGrid) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left, top;
        if (item.left) {
          left = item.left.toString().includes("%")
            ? `calc(${item.left} + ${delta.x}px)`
            : Math.round(item.left + delta.x);
        } else {
          left = Math.round(item.left + delta.x);
        }
        if (item.top) {
          top = item.top.toString().includes("%")
            ? `calc(${item.top} + ${delta.y}px)`
            : Math.round(item.top + delta.y);
        } else {
          top = Math.round(item.top + delta.y);
        }
        console.log(`check left: ${left} top: ${top} `);
        moveItem(item.id, left, top, item.inGrid, item.items);
      } else if (item.inGrid === false && item.isMulti === false) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        const data = monitor.getDifferenceFromInitialOffset();
        console.log(data);
        console.log(delta);
        console.log(item);
        let left = item.widthMenu ? delta.x - item.widthMenu : delta.x - 400;
        let top = delta.y - 100;

        addItem(
          item.type,
          left,
          top + valueScrollTop,
          uuid(),
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
    type,
    left = "200px",
    top = "100px",
    id,
    InfoIcon,
    styleDefault,
    src,
    href,
    valueItem,
    width = 200,
    height = type === "a" ? 30 : 100
  ) => {
    // setStyleDefault(styleDefault);

    setItems((prev) => {
      return [
        ...prev,
        {
          type,
          left,
          top,
          id,
          width,
          height,
          inGrid: true,
          isMulti: false,
          InfoIcon,
          styleDefault: {},
          src,
          href,
          valueItem,
        },
      ];
    });
  };

  const moveItem = (id, left, top, inGrid, items) => {
    items.map((item) => {
      if (item.id === id) {
        console.log(`left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} `);
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
        ref={drop}
        style={{
          backgroundColor,
        }}
        className={clsx(styles.wrapper)}
        id={props.id}
      >
        {/* <Overlay></Overlay> */}

        {items && renderItem()}
        {props.children}
      </div>
    </ShowOverlay.Provider>
  );
}

export default Grid;
