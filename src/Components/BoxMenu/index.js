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
import { setType } from "~/Store/reducer/actions";

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
  const [typeImage, setTypeImage] = useState("choose");
  const [typeItemSelected, setTypeItemSelected] = useState("input");
  const [heightItem, setHeightItem] = useState(0);
  const [topItem, setTopItem] = useState(0);
  const [leftItem, setLeftItem] = useState(0);
  const [widthItem, setWidthItem] = useState(0);
  const [urlItem, setUrlItem] = useState("");
  const [hrefItem, setHrefItem] = useState("");
  const [nameLinkItem, setNameLinkItem] = useState("");
  const [linkImage, setLinkImage] = useState("");
  const [showEditHref, setShowEditHref] = useState(true);
  const [showEditUrl, setShowEditUrl] = useState(true);
  const [showEditNameLink, setShowNameLinkItem] = useState(true);
  const [showChooseLinkImage, setShowChooseLinkImage] = useState(true);
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
  const handleShowInputImg = (e) => {
    const reader = new FileReader();
    var url;
    reader.onload = () => {
      if (reader.readyState === 2) {
        url = reader.result;
        setLinkImage(url);
        setUrlItem(url);
        setTypeImage("image");
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setShowChooseLinkImage(true);
    setShowEditUrl(true);
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

      if (item.left.toString().includes("%")) {
        const leftIt = item.left.toString().substring(0, item.left.length - 1);
        setLeftItem(Math.round(leftIt));
      } else {
        setLeftItem(item.left);
      }
      if (!item.width.toString().includes("%")) {
        setWidthItem(item.width);
      }

      setUrlItem(item.src ? item.src : "");
      setTypeImage(item.src ? "image" : "choose");
      setHrefItem(item.href ? item.href : "");
      if (item.textValue || item.valueItem) {
        setNameLinkItem(
          item.textValue ? item.textValue : item.valueItem ? item.valueItem : ""
        );
      }
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
  const handleUpdateLeftItem = (e) => {
    setLeftItem(e.target.value);
    const item = findItem(state.id_item_selected);
    const itemDomReal = document.getElementById(state.id_item_selected);
    if (item) {
      if (item.left.toString().includes("%")) {
        item.left = `${e.target.value}%`;
      } else {
        item.left = parseInt(e.target.value);
      }
    }
    if (itemDomReal) {
      itemDomReal.parentElement.style.left = e.target.value + "%";
    }
  };

  const handleUpdateWidthItem = (e) => {
    setWidthItem(e.target.value);
    const item = findItem(state.id_item_selected);
    const itemDomReal = document.getElementById(state.id_item_selected);
    if (itemDomReal) {
      itemDomReal.parentElement.style.width = e.target.value + "px";
    }
    if (item) {
      if (!item.width.toString().includes("%")) {
        item.width = parseInt(e.target.value);
      }
    }
  };

  const handleChangeUrlItem = (e) => {
    const item = findItem(state.id_item_selected);
    const itemReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.src = urlItem;
    }
    if (itemReal) {
      itemReal.src = urlItem;
      // itemReal.replaceTag("img");
    }
    setShowEditUrl(false);
  };
  const handleSaveLinkImage = (e) => {
    const item = findItem(state.id_item_selected);
    const itemReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.src = linkImage;
    }
    if (itemReal) {
      itemReal.src = linkImage;
      // itemReal.replaceTag("img");
    }
    setUrlItem(linkImage);
    setShowChooseLinkImage(false);
  };
  const handleChangeHrefItem = (e) => {
    const item = findItem(state.id_item_selected);
    const itemReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.href = hrefItem;
    }
    if (itemReal) {
      // console.log(itemReal);
      itemReal.href = hrefItem;
    }
    setShowEditHref(false);
  };
  const handleChangeNameLinkItem = (e) => {
    const item = findItem(state.id_item_selected);
    const itemReal = document.getElementById(state.id_item_selected);
    if (item) {
      item.valueItem = nameLinkItem;
      item.textValue = nameLinkItem;
    }
    if (itemReal) {
      itemReal.textContent = nameLinkItem;
    }
    setShowNameLinkItem(false);
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
        <div
          style={{
            display:
              typeItemSelected === "background" ||
              typeItemSelected === "backgroundImage"
                ? "none"
                : "block",
          }}
        >
          <span>Width:</span>
          <input
            value={widthItem}
            onChange={handleUpdateWidthItem}
            type='number'
            placeholder='Width..'
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

        <div
          style={{
            display:
              typeItemSelected === "background" ||
              typeItemSelected === "backgroundImage"
                ? "none"
                : "block",
          }}
        >
          <span>left:</span>
          <input
            value={leftItem}
            onChange={handleUpdateLeftItem}
            type='number'
            placeholder='Left..'
          ></input>
        </div>
        <select
          style={{
            width: "100%",
            padding: 12,
            margin: "24px 0 12px 0",
            display:
              typeItemSelected === "backgroundImage" ||
              typeItemSelected === "img"
                ? "block"
                : "none",
          }}
          onChange={(e) => {
            setTypeImage(e.target.value);
          }}
          value={typeImage}
        >
          <option value={"choose"}>Choose file</option>
          <option value={"image"}>Image</option>
        </select>
        <div
          style={{
            display:
              (typeItemSelected === "backgroundImage" ||
                typeItemSelected === "img") &&
              typeImage !== "choose"
                ? "flex"
                : "none",
            justifyContent: "center",
          }}
        >
          <span style={{ textAlign: "center", width: "80%" }}>Url:</span>
          <input
            type='url'
            style={{ textAlign: "center", width: "80%" }}
            placeholder='url..'
            value={urlItem}
            onChange={(e) => {
              setUrlItem(e.target.value);
              setShowEditUrl(true);
            }}
          ></input>
          <button
            className={clsx(styles.button)}
            onClick={handleChangeUrlItem}
            style={{
              display: showEditUrl ? "block" : "none",
            }}
          >
            Save
          </button>
        </div>
        <div
          style={{
            display:
              (typeItemSelected === "backgroundImage" ||
                typeItemSelected === "img") &&
              typeImage === "choose"
                ? "flex"
                : "none",
            justifyContent: "center",
          }}
        >
          <input
            className={clsx(styles.input_file)}
            type='file'
            style={{ textAlign: "center", width: "80%" }}
            onChange={handleShowInputImg}
            accept={"image/*"}
          ></input>
          <button
            className={clsx(styles.button)}
            onClick={handleSaveLinkImage}
            style={{
              display: showChooseLinkImage ? "block" : "none",
            }}
          >
            Save
          </button>
        </div>
        <div
          style={{
            display: typeItemSelected === "a" ? "flex" : "none",
            justifyContent: "center",
          }}
        >
          <span style={{ textAlign: "center", width: "80%" }}>Name Link:</span>
          <input
            type='text'
            style={{ textAlign: "center", width: "80%" }}
            placeholder='Name link..'
            value={nameLinkItem}
            onChange={(e) => {
              setNameLinkItem(e.target.value);
              setShowNameLinkItem(true);
            }}
          ></input>
          <button
            className={clsx(styles.button)}
            onClick={handleChangeNameLinkItem}
            style={{
              display: showEditNameLink ? "block" : "none",
            }}
          >
            Save
          </button>
        </div>
        <div
          style={{
            display:
              typeItemSelected === "a" || typeItemSelected === "icon"
                ? "flex"
                : "none",
            justifyContent: "center",
          }}
        >
          <span style={{ textAlign: "center", width: "80%" }}>Href:</span>
          <input
            type='url'
            style={{ textAlign: "center", width: "80%" }}
            placeholder='Href..'
            value={hrefItem}
            onChange={(e) => {
              setHrefItem(e.target.value);
              setShowEditHref(true);
            }}
          ></input>
          <button
            className={clsx(styles.button)}
            onClick={handleChangeHrefItem}
            style={{
              display: showEditHref ? "block" : "none",
            }}
          >
            Save
          </button>
        </div>
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
