import uuid from "react-uuid";
import { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";
import { CgDisplayFlex } from "react-icons/cg";
import clsx from "clsx";
import {
  BsCardText,
  BsFileImage,
  BsBoxSeam,
  BsFillMenuButtonWideFill,
} from "react-icons/bs";
import { TfiImage } from "react-icons/tfi";
import { BsImage } from "react-icons/bs";
import { AiOutlineAlignLeft, AiOutlineLink } from "react-icons/ai";

import styles from "./BoxMenu.module.scss";
import { Item, TipSuggest } from "~/Components";
import {
  wrapperContent,
  ElementContentPortfolio,
  ContextShowEditorComponent,
  ContextReducer,
  ContextItemsIngrid,
} from "~/Store/Context";

function BoxMenu() {
  const icons = [
    {
      Name: "Facebook",
      Component: <GrFacebookOption />,
    },
    {
      Name: "Instagram",
      Component: <GrInstagram />,
    },
    {
      Name: "Github",
      Component: <GrGithub />,
    },
    {
      Name: "Linkedin",
      Component: <GrLinkedin />,
    },
    {
      Name: "Youtube",
      Component: <GrYoutube />,
    },
  ];
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const wrapperContentPortfolio = useContext(wrapperContent);
  const [widthMenu, setWidthMenu] = useState();
  const [contentPortfolio, setShowTrash, widthContent] = useContext(
    ElementContentPortfolio
  );
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );
  const [typeBackground, setTypeBackground] = useState("image");
  const [typeItemSelected, setTypeItemSelected] = useState("input");
  const [heightItem, setHeightItem] = useState(0);
  const [topItem, setTopItem] = useState(0);
  const [color, setColor] = useState("#fff");

  const findItem = (id) => {
    var item;
    items.forEach((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    return item;
  };
  /// resize set width content
  useEffect(() => {
    if (wrapperContentPortfolio.current) {
      setWidthMenu(wrapperContentPortfolio.current.offsetWidth * 0.22 + 14);
    }
    const handleResize = () => {
      setWidthMenu(wrapperContentPortfolio.current.offsetWidth * 0.22 + 14);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  // set type when selected
  useEffect(() => {
    const item = findItem(state.id_item_selected);
    if (item) {
      setTypeItemSelected(item.type);
    }
  }, [state]);
  // load state to style item
  useEffect(() => {
    const item = findItem(state.id_item_selected);
    if (item) {
      setHeightItem(item.height);
      setTopItem(item.top);
    }
  }, [state]);
  // load style change
  const handleUpdateHeightItem = (e) => {
    setHeightItem(e.target.value);
    const item = findItem(state.id_item_selected);
    const itemReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.height = parseInt(e.target.value);
    }
    if (itemReal) {
      itemReal.parentElement.style.height = e.target.value + "px";
    }
  };

  const handleUpdateTopItem = (e) => {
    setTopItem(e.target.value);
    const item = findItem(state.id_item_selected);
    const itemDomReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.top = parseInt(e.target.value);
    }
    if (itemDomReal) {
      itemDomReal.parentElement.style.top = e.target.value + "px";
    }
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
    const item = findItem(state.id_item_selected);
    const itemDomReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.styleDefault.backgroundColor = e.target.value;
      itemDomReal.style.backgroundColor = e.target.value;
    }
  };

  const renderIcons = () => {
    return icons.map((Icon) => {
      return (
        <TipSuggest
          key={uuid()}
          content={`Icon ${Icon.Name}`}
          position={"top"}
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            draggable='true'
            className={clsx(styles.item_text)}
            icon
            id={uuid()}
            type='icon'
            InfoIcon={Icon}
            widthMenu={widthMenu}
            widthContentItem={widthContent}
            styleDefault={{
              position: "unset",
              border: "none",
              backgroundColor: "var(--primary_color_component)",
            }}
          >
            {Icon.Component}
          </Item>
        </TipSuggest>
      );
    });
  };

  return (
    <>
      <div
        id='menu_1'
        className={clsx(styles.wrapper)}
        style={{
          display: !showEditorComponent ? "block" : "none",
        }}
      >
        <div className={clsx(styles.wrapper_single_component)}>
          <span
            style={{
              width: "100%",
              textAlign: "center",
              color: "#FF6600",
              fontWeight: "600",
            }}
          >
            Single items
          </span>
          <TipSuggest
            content='Text'
            position={"top"}
            styles={{
              width: "100%",
              height: "100%",
            }}
          >
            <Item
              resizable={false}
              draggable='true'
              type='input'
              className={clsx(styles.item_text)}
              icon
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <BsCardText />
            </Item>
          </TipSuggest>
          <TipSuggest
            content='Link'
            position={"top"}
            styles={{
              width: "100%",
              height: "100%",
            }}
          >
            <Item
              resizable={false}
              type='a'
              draggable='true'
              className={clsx(styles.item_link)}
              icon
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <FontAwesomeIcon icon={faLink} />
            </Item>
          </TipSuggest>
          <TipSuggest
            content='Image'
            position={"top"}
            width='30%'
            styles={{
              width: "100%",
              height: "100%",
            }}
          >
            <Item
              resizable={false}
              type='img'
              draggable='true'
              className={clsx(styles.item_img)}
              icon
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <BsFileImage />
            </Item>
          </TipSuggest>
          <TipSuggest
            content='Button'
            position={"top"}
            styles={{
              width: "100%",
              height: "100%",
            }}
          >
            <Item
              resizable={false}
              type='button'
              draggable='true'
              className={clsx(styles.item_button)}
              icon
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <BsFillMenuButtonWideFill />
            </Item>
          </TipSuggest>
          <TipSuggest content='Box'>
            <Item
              resizable={false}
              type='div'
              draggable='true'
              className={clsx(styles.item_button)}
              icon
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <BsBoxSeam />
            </Item>
          </TipSuggest>
        </div>
        <span
          style={{
            width: "100%",
            textAlign: "center",
            color: "#FF6600",
            fontWeight: "600",
          }}
        >
          Background
        </span>
        <div
          style={{
            marginTop: 6,
            width: "100%",
          }}
        >
          <TipSuggest content='background'>
            <Item
              resizable={false}
              type='background'
              draggable='true'
              className={clsx(styles.item_button)}
              icon
              height={40}
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                width: "400",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <CgDisplayFlex />
            </Item>
          </TipSuggest>
        </div>
        <div
          style={{
            marginTop: 6,
            width: "100%",
          }}
        >
          <TipSuggest content='background image'>
            <Item
              resizable={false}
              type='backgroundImage'
              draggable='true'
              className={clsx(styles.item_button)}
              icon
              height={40}
              widthMenu={widthMenu}
              widthContentItem={widthContent}
              styleDefault={{
                position: "unset",
                width: "400",
                backgroundColor: "var(primary_color_component)",
              }}
            >
              <BsImage />
            </Item>
          </TipSuggest>
        </div>
        <div className={clsx(styles.menu_icon)}>
          <span
            style={{
              width: "100%",
              textAlign: "center",
              color: "#FF6600",
              fontWeight: "600",
            }}
          >
            Icons
          </span>
          {renderIcons()}
        </div>
      </div>
      <div
        className={clsx(styles.wrapper_edit_background)}
        style={{
          display: showEditorComponent ? "block" : "none",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <span>Height:</span>
          <input
            type='number'
            placeholder='Height..'
            value={heightItem}
            onChange={handleUpdateHeightItem}
          ></input>
        </div>
        <div>
          <span>Top:</span>
          <input
            value={topItem}
            onChange={handleUpdateTopItem}
            type='number'
            placeholder='Top..'
          ></input>
        </div>

        {/* <div
          style={{
            display: typeItemSelected === "backgroundImage" ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          <span style={{ textAlign: "center", width: "80%" }}>Url:</span>
          <input
            type='url'
            style={{ textAlign: "center", width: "80%" }}
            placeholder='url..'
          ></input>
        </div> */}
        <div
          style={{
            display: typeItemSelected === "background" ? "flex" : "none",
          }}
        >
          <span>Color:</span>
          <input
            type={"color"}
            onChange={handleChangeColor}
            value={color}
          ></input>
        </div>
      </div>
    </>
  );
}

export default BoxMenu;
