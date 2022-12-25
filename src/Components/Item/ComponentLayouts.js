import clsx from "clsx";
import { useState, useEffect, useRef, useContext } from "react";

import styles from "./Item.module.scss";
import { MultiItem, Item } from "~/Components";
import {
  ElementContentPortfolio,
  HeightHeading,
  ContextItemsMultiIngrid,
} from "~/Store/Context";
import uuid from "react-uuid";

function ComponentLayouts({ item, opacity, children }) {
  const [widthDisplayContent, setWidthDisplayContent] = useState();
  const [heightDisplayContent, setHeightDisplayContent] = useState();
  const [contentPortfolio, setShowTrash] = useContext(ElementContentPortfolio);

  //get height and width of wrapper content
  useEffect(() => {
    if (contentPortfolio.current) {
      setWidthDisplayContent(contentPortfolio.current.offsetWidth + 1000);
      setHeightDisplayContent(contentPortfolio.current.offsetHeight * 0.4);
    }
  });

  useEffect(() => {
    const itemWrapperComponent = document.getElementById(item.id);
    if (itemWrapperComponent) {
      setHeightDisplayContent(itemWrapperComponent.offsetHeight);
    }
  });

  const renderItem = () => {
    const arr = [
      {
        idItem1: item.idChild[0],
        idItem2: item.idChild[1],
      },
      {
        idItem1: item.idChild[2],
        idItem2: item.idChild[3],
      },
      {
        idItem1: item.idChild[4],
        idItem2: item.idChild[5],
      },
      {
        idItem1: item.idChild[6],
        idItem2: item.idChild[7],
      },
    ];
    return arr.map((temp, index) => {
      return (
        <div
          key={index}
          id={`${index}_wrapper_item_multi`}
          style={{
            width: "22%",
            position: "unset",
            margin: "0 12px",
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={temp.idItem1}
            id={temp.idItem1}
            position='unset'
            inGrid={true}
            type={item.typeChild[0]}
            width={widthDisplayContent / 4}
            height={heightDisplayContent - 50}
            draggable={false}
            styleDefault={
              item.styleDefaultChild[0] ? item.styleDefaultChild[0] : {}
            }
            stylesItem={{
              position: "unset",
              maxWidth: "100%",
            }}
          ></Item>
          <Item
            key={temp.idItem2}
            id={temp.idItem2}
            position='unset'
            inGrid={true}
            width={widthDisplayContent / 4}
            height={40}
            draggable={false}
            type={item.typeChild[1]}
            styleDefault={
              item.styleDefaultChild[1] ? item.styleDefaultChild[1] : {}
            }
            stylesItem={{
              position: "unset",
              maxWidth: "100%",
            }}
          ></Item>
        </div>
      );
    });
  };

  // load style

  const [heightHeadingText, setHeightHeadingText] = useState(
    heightDisplayContent ? heightDisplayContent * 0.3 + 12 : 50
  );
  const renderComponents = () => {
    if (item.numberComponents === 3) {
      return (
        <MultiItem
          id={item.id}
          isMulti={true}
          inGrid={true}
          top={item.top}
          className={clsx(styles.wrapper_multi_items)}
          key={item.id}
          stylesItem={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
            top: item.top,
            left: item.left,
            right: item.right,
            height: heightDisplayContent,
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={item.idChild[0]}
            id={item.idChild[0]}
            inGrid={true}
            type={item.typeChild[0]}
            width={widthDisplayContent / 2 - 24}
            height={heightDisplayContent - 24}
            draggable={false}
            position='unset'
            styleDefault={
              item.styleDefaultChild ? item.styleDefaultChild[0] : {}
            }
            stylesItem={{
              position: "unset",
              maxWidth: "48%",
            }}
          ></Item>
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "unset",
              marginLeft: 24,
            }}
            id={item.id}
          >
            <Item
              key={item.idChild[1]}
              id={item.idChild[1]}
              inGrid={true}
              width={widthDisplayContent / 2 - 24}
              height={heightHeadingText}
              draggable={false}
              position='unset'
              type={item.typeChild[1]}
              fontSize='24px'
              heading='true'
              styleDefault={
                item.styleDefaultChild ? item.styleDefaultChild[1] : {}
              }
              stylesItem={{
                maxWidth: "100%",
                position: "unset",
              }}
            ></Item>
          </div>
        </MultiItem>
      );
    } else if (item.numberComponents === 4) {
      return (
        <MultiItem
          isMulti={true}
          inGrid={true}
          top={item.top}
          id={item.id}
          className={clsx(styles.wrapper_multi_items)}
          key={item.id}
          stylesItem={{
            display: "flex",
            alignItems: "center",
            top: item.top,
            left: item.left,
            right: item.right,
            height: heightDisplayContent,
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={item.idChild[0]}
            id={item.idChild[0]}
            position='unset'
            inGrid={true}
            type={item.typeChild[0]}
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
            draggable={false}
            styleDefault={
              item.styleDefaultChild ? item.styleDefaultChild[0] : {}
            }
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
          <Item
            key={item.idChild[1]}
            id={item.idChild[1]}
            position='unset'
            inGrid={true}
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
            draggable={false}
            type={item.typeChild[1]}
            styleDefault={
              item.styleDefaultChild ? item.styleDefaultChild[1] : {}
            }
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
          <Item
            key={item.idChild[2]}
            id={item.idChild[2]}
            position='unset'
            inGrid={true}
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
            draggable={false}
            type={item.typeChild[2]}
            styleDefault={
              item.styleDefaultChild ? item.styleDefaultChild[2] : {}
            }
            stylesItem={{
              position: "unset",
              margin: "12px",
              height: 50,
              width: 50,
            }}
          ></Item>
          <Item
            key={item.idChild[3]}
            id={item.idChild[3]}
            position='unset'
            inGrid={true}
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
            draggable={false}
            type={item.typeChild[3]}
            styleDefault={
              item.styleDefaultChild ? item.styleDefaultChild[3] : {}
            }
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
        </MultiItem>
      );
    }
  };
  return (
    <HeightHeading.Provider value={[heightHeadingText, setHeightHeadingText]}>
      {renderComponents()}
    </HeightHeading.Provider>
  );
}

export default ComponentLayouts;
