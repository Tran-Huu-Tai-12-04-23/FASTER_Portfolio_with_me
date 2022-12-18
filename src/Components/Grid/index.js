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
} from "~/Store/Context";
import ComponentLayouts from "../Item/ComponentLayouts";

function Grid(props) {
  const [state, dispatch] = useContext(ContextReducer);
  const [itemMulti, setItemMulti] = useContext(ContextItemsMultiIngrid);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [contentPortfolio, setShowTrash, widthContent] = useContext(
    ElementContentPortfolio
  );
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
        let left = delta.x - 400;
        let top = delta.y - 100;
        console.log(item);
        addItem(
          item.type,
          left,
          top + valueScrollTop,
          uuid(),
          item.InfoIcon,
          item.styleDefault,
          item.src,
          item.href,
          item.valueItem
        );
      } else if (item.inGrid === false && item.isMulti) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        let top = delta.y - 116;
        const idChild = [
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
        ];
        const typeChild = [item.type1, item.type2, item.type3, item.type4];
        addItemMulti(
          top + valueScrollTop,
          uuid(),
          idChild,
          typeChild,
          item.numberComponents,
          item.styleDefault,
          item.styleDefaultChild
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  //set default styles for components
  // const setStyleDefault = (item) => {
  //   if (item.styleDefault) {
  //     item.styleDefault.color = item.styleDefault.color
  //       ? item.styleDefault.color
  //       : "";
  //     item.styleDefault.backgroundColor = item.styleDefault.backgroundColor
  //       ? item.styleDefault.backgroundColor
  //       : "";
  //     item.styleDefault.fontSize = item.styleDefault.fontSize
  //       ? item.styleDefault.fontSize
  //       : "";
  //     item.styleDefault.fontFamily = item.styleDefault.fontFamily
  //       ? item.styleDefault.fontFamily
  //       : "";
  //     item.styleDefault.borderRadius = item.styleDefault.borderRadius
  //       ? item.styleDefault.borderRadius
  //       : "";
  //     item.styleDefault.borderStyle = item.styleDefault.borderStyle
  //       ? item.styleDefault.borderStyle
  //       : "";
  //     item.styleDefault.borderColor = item.styleDefault.borderColor
  //       ? item.styleDefault.borderColor
  //       : "";
  //     item.styleDefault.fontWeight = item.styleDefault.fontWeight
  //       ? item.styleDefault.fontWeight
  //       : "";
  //     item.styleDefault.textAlign = item.styleDefault.textAlign
  //       ? item.styleDefault.textAlign
  //       : "";
  //     item.styleDefault.borderWidth = item.styleDefault.borderWidth
  //       ? item.styleDefault.borderWidth
  //       : "";
  //     item.styleDefault.textTransform = item.styleDefault.textTransform
  //       ? item.styleDefault.textTransform
  //       : "";
  //     item.styleDefault.lineHeight = item.styleDefault.lineHeight
  //       ? item.styleDefault.lineHeight
  //       : "";
  //   }
  // };
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
    height = 100
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

  const addItemMulti = (
    top,
    id,
    idChild,
    typeChild,
    numberComponents,
    styleDefault,
    styleDefaultChild
  ) => {
    const listItems = Array.from(Array(numberComponents).keys());
    listItems.forEach((it) => {
      setItemMulti((prev) => {
        return [
          ...prev,
          {
            id: idChild[it],
            idParent: id,
            type: typeChild[it],
            isChild: true,
            inGrid: true,
            styleDefault: styleDefaultChild[it] ? styleDefaultChild[it] : {},
          },
        ];
      });
    });
    setItems((prev) => {
      return [
        ...prev,
        {
          idChild,
          typeChild,
          numberComponents,
          styleDefault,
          styleDefaultChild,
          right: 0,
          left: 0,
          top,
          width: "100%",
          id,
          inGrid: true,
          isMulti: true,
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

  // find item in grid
  const findItem = (id) => {
    var item;
    items.forEach((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    itemMulti.map((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    return item;
  };

  const isActive = canDrop && isOver;
  //set style when drop
  // useEffect(() => {
  //   // setBackgroundColor(
  //   //   isActive ? "rgba(0,0,0,0.2)" : canDrop ? "rgba(238 ,44, 44, 1)" : "#fff"
  //   // );
  // }, [{ isActive, canDrop }]);
  //load style default cho items
  useEffect(() => {
    items.map((item) => {
      // setStyleDefault(item);
    });
  }, [items]);
  // load style default
  useEffect(() => {
    // console.log(state);
    // console.log("render");
    const setStyle = (item) => {
      item.styleDefault.color = state.color;
      item.styleDefault.backgroundColor = state.background_color;
      item.styleDefault.fontSize = state.font_size;
      item.styleDefault.fontFamily = state.font_family;
      item.styleDefault.borderRadius = state.border_radius;
      item.styleDefault.borderStyle = state.border_style;
      item.styleDefault.borderColor = state.border_color;
      item.styleDefault.fontWeight = state.font_weight;
      item.styleDefault.textAlign = state.text_align;
      item.styleDefault.borderSize = state.border_size;
      item.styleDefault.textTransform = state.text_transform;
      item.styleDefault.lineHeight = state.line_height;
    };
    items.map((item) => {
      if (item.id === state.id_item_selected) {
        setStyle(item);
      }
    });
    itemMulti.map((item) => {
      if (item.id === state.id_item_selected) {
        setStyle(item);
      }
    });
  }, [state]);

  //load styles
  useLayoutEffect(() => {
    const item = findItem(state.id_item_selected);
    const itemDomReal = document.getElementById(state.id_item_selected);
    if (item) {
      // item.styleDefault.color = state.color;
      // item.styleDefault.backgroundColor = state.background_color;
      // item.styleDefault.fontSize = state.font_size;
      // item.styleDefault.fontFamily = state.font_family;
      // item.styleDefault.borderRadius = state.border_radius;
      // item.styleDefault.borderStyle = state.border_style;
      // item.styleDefault.borderColor = state.border_color;
      // item.styleDefault.fontWeight = state.font_weight ? "bold" : "normal";
      // item.styleDefault.textAlign = state.text_align ? "center" : "";
      // item.styleDefault.borderWidth = state.border_size;
      // item.styleDefault.textTransform = state.text_transform ? "uppercase" : "";
      // item.styleDefault.lineHeight = state.line_height;
      //
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
  });

  const renderItem = () => {
    if (items) {
      return items.map((item, index) => {
        if (item.isMulti) {
          return (
            <ComponentLayouts
              key={item.id}
              item={item}
              id={"multi_items"}
              // opacity={isDragging ? true : false}
              styleDefault={item.styleDefault}
              styleDefaultChild={item.styleDefaultChild}
              src={item.src}
            ></ComponentLayouts>
          );
        } else {
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
              stylesItem={{
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height,
              }}
              src={item.src}
              opacity={isDragging ? true : false}
            ></Item>
          );
        }
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

        {renderItem()}
        {props.children}
      </div>
    </ShowOverlay.Provider>
  );
}

export default Grid;
