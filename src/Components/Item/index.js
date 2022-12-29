import clsx from "clsx";
import { useDrag } from "react-dnd";
import {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";

import { ResizableBox as ReactResizableBox } from "react-resizable";
import { RiContactsBookLine, RiEdit2Fill } from "react-icons/ri";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";

import "./resizeable.css";
import styles from "./Item.module.scss";
import { TipSuggest } from "~/Components";
import {
  ContextReducer,
  ContextItemsIngrid,
  HeightHeading,
  ContextShowEditorComponent,
  ElementContentPortfolio,
} from "~/Store/Context";
import {
  setBackgroundColor,
  setBorderColor,
  setColor,
  setIdItemSelected,
  setFontSize,
  setBorderRadius,
  setFontFamily,
  setBorderStyle,
  setTextAlign,
  setBorderSize,
  setTextTransform,
  setLineHeight,
  setFontWeight,
} from "~/Store/reducer/actions";
// import { TbRipple } from "react-icons/tb";

function Item({
  type,
  id,
  inGrid = false,
  isMulti = false,
  stylesItem,
  fontSize = "14px",
  heading = false,
  icon = false,
  width = 250,
  height = 250,
  resizable = true,
  draggable = true,
  position = "absolute",
  styleDefault = {},
  src = "",
  href = "",
  valueItem = "",
  textValue = "",
  center = false,
  isChild = false,
  children,
  InfoIcon,
  widthMenu,
  widthContentItem,
}) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [value, setValue] = useState(valueItem ? valueItem : "Enter text !!!");
  const [linkItemTypeA, setLinkItemTypeA] = useState(href ? href : "");
  const [nameItemLink, setNameItemLink] = useState(
    textValue ? textValue : href ? href.name : ""
  );
  const [Type, setType] = useState("div");
  const [linkImg, setLinkImg] = useState(src ? src : "");
  const [state, dispatch] = useContext(ContextReducer);
  const [showModal, setShowModal] = useState(href ? false : true);
  const [showEditLinkIcon, setShowEditLinkIcon] = useState(false);
  //use context get state show and hidden editor component
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );
  const data = useContext(HeightHeading);
  const elementContentPortfolio = useContext(ElementContentPortfolio);
  const [widthContents, setWidthContents] = useState(width);
  const [heightWrapperReSizeable, setHeightWrapperReSizeable] =
    useState(height);
  const [scrollHeight, setScrollHeight] = useState(0);
  const inputEditLinkIcon = useRef();
  const [linkIcon, setLinkIcon] = useState(href ? href : "");
  const icons = {
    Facebook: <GrFacebookOption />,
    Instagram: <GrInstagram />,
    Github: <GrGithub />,
    Linkedin: <GrLinkedin />,
    Youtube: <GrYoutube />,
  };
  const classNamesItem = clsx(
    styles.wrapper,
    styles.text,
    {
      [styles.link]: type === "a",
    },
    {
      [styles.heading]: type === "h1",
    },
    {
      [styles.input_file]: type === "img",
    },
    {
      [styles.box]: type === "div",
    },
    {
      [styles.icon]: icon,
    },
    {
      [styles.item_not_grid]: inGrid === false,
    },
    {
      [styles.icon_ingrid]: type === "icon" && inGrid,
    },
    {
      [styles.button]: type === "button" && inGrid,
    }
  );
  var left = stylesItem ? stylesItem.left : 0;
  var top = stylesItem ? stylesItem.top : 0;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: inGrid ? "ITEM_IN_GRID" : "Item",
      item: {
        id,
        left,
        top,
        inGrid,
        type,
        isMulti,
        widthMenu,
        widthContentItem,
        items,
        InfoIcon,
        icon,
        styleDefault,
        src,
        href,
        valueItem,
        stylesItem,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        // opacity: monitor.isDragging() ? 0.6 : 1,
      }),
    }),
    [id, left, top, inGrid, isMulti]
  );
  let heightHeadingText, setHeightHeadingText;
  const handleChangeValue = (e) => {
    setValue(e.target.value);
    // const item = findItem(e.target.id);
    // if (item) {
    //   item.valueItem = e.target.value;
    // }
    // if (data) {
    //   [heightHeadingText, setHeightHeadingText] = data;
    //   setHeightHeadingText(e.target.scrollHeight);
    //   const itemResize = e.target.parentElement.children[0];
    //   setWidthContents(itemResize.offsetWidth);
    // }
  };

  const handleBlurInput = (e) => {
    if (e.target.value === "") {
      setValue("Enter text !!!");
    }
  };

  const handleShowInputImg = (e) => {
    var item = findItem(e.target.id);

    const reader = new FileReader();
    var url;
    reader.onload = () => {
      if (reader.readyState === 2) {
        url = reader.result;
        setLinkImg(url);
        if (item) {
          item.src = url;
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const loadStyleComponentInInitState = (item) => {
    const itemDomReal = document.getElementById(item.id);
    if (itemDomReal) {
      dispatch(
        setColor(itemDomReal.style.color ? itemDomReal.style.color : "")
      );
      dispatch(
        setBackgroundColor(
          itemDomReal.style.backgroundColor
            ? itemDomReal.style.backgroundColor
            : ""
        )
      );
      dispatch(
        setFontSize(
          itemDomReal.style.fontSize ? itemDomReal.style.fontSize : ""
        )
      );
      dispatch(
        setFontFamily(
          itemDomReal.style.fontFamily ? itemDomReal.style.fontFamily : ""
        )
      );
      dispatch(
        setBorderRadius(
          itemDomReal.style.borderRadius ? itemDomReal.style.borderRadius : ""
        )
      );
      dispatch(
        setBorderStyle(
          itemDomReal.style.borderStyle ? itemDomReal.style.borderStyle : ""
        )
      );
      dispatch(
        setBorderColor(
          itemDomReal.style.borderColor ? itemDomReal.style.borderColor : ""
        )
      );
      dispatch(
        setFontWeight(itemDomReal.style.fontWeight === "bold" ? true : false)
      );
      dispatch(
        setTextAlign(itemDomReal.style.textAlign === "center" ? true : false)
      );
      dispatch(
        setBorderSize(
          itemDomReal.style.borderWidth ? itemDomReal.style.borderWidth : ""
        )
      );
      dispatch(
        setTextTransform(
          itemDomReal.style.textTransform === "uppercase" ? true : false
        )
      );
      dispatch(
        setLineHeight(
          itemDomReal.style.lineHeight ? itemDomReal.style.lineHeight : ""
        )
      );
    }
  };

  //get id if component multi layer
  const getId = (e) => {
    let item = e.target;
    while (item.parentNode) {
      if (item.id) {
        return item.id;
      }
      item = item.parentElement;
    }
  };
  //find item from items
  const findItem = (id) => {
    var item;
    items.forEach((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    return item;
  };

  const handleSelectItemToEdit = (e) => {
    e.stopPropagation();
    if (findItem(getId(e))) {
      loadStyleComponentInInitState(findItem(getId(e)));
    }
    dispatch(setIdItemSelected(getId(e)));
    setEditorComponent(true);
  };

  // edit link
  const handleEditLink = (e) => {
    e.stopPropagation();
    setEditorComponent(true);
    setShowModal(!showModal);
    dispatch(
      setIdItemSelected(
        e.target.id ? e.target.id : e.target.parentElement.parentElement.id
      )
    );
  };

  const propsTypeLink = {
    href: null,
    target: null,
    onClick: null,
    type: "text",
  };

  // handle when mouse up
  const handleMouseDown = (e) => {
    const itemResize = e.target.parentElement.children[0];
    setWidthContents(itemResize.offsetWidth);
    setHeightWrapperReSizeable(itemResize.offsetHeight);
  };
  const handleMouseUp = (e) => {
    const itemResize = e.target.parentElement.children[0];
    const item = findItem(itemResize.id);
    if (item) {
      item.height = itemResize.offsetHeight;
      item.width = itemResize.offsetWidth;
    }
  };

  useEffect(() => {
    setType(icon ? "div" : type);
    setType(type === "button" ? "input" : type);
    if (type === "img") {
      setType(src ? "img" : "input");
      propsTypeLink.type = "file";
    }

    if (icon) {
      setType("div");
    }
    if (linkImg) {
      setType("img");
    }
    if (type === "input" && !icon) {
      setType("textarea");
    }
    if (href && type === "a") {
      propsTypeLink.href = href;
      propsTypeLink.target = "_blank";
    }
    if (heading) {
      setValue("Enter title");
    }
    if (type === "icon") {
      setType("div");
    }
  }, [linkImg]);

  let contentPortfolio, setShowTrash, widthContent;
  //get width wrapper content
  useEffect(() => {
    if (elementContentPortfolio) {
      [contentPortfolio, setShowTrash, widthContent] = elementContentPortfolio;
      setScrollHeight(contentPortfolio.current.scrollTop);
    }
  }, [elementContentPortfolio]);
  useLayoutEffect(() => {
    if (elementContentPortfolio && width === "100%") {
      [contentPortfolio, setShowTrash, widthContent] = elementContentPortfolio;
      setWidthContents(widthContent ? widthContent : width);
    }
  });
  useEffect(() => {
    // work next
    items.map((item) => {
      const itemDomReal = document.getElementById(item.id);
      if (itemDomReal) {
        item.textValue = itemDomReal.textContent
          ? itemDomReal.textContent
          : item.value;
        item.valueItem = itemDomReal.value
          ? itemDomReal.value
          : itemDomReal.textContent;
        item.src = itemDomReal.src ? itemDomReal.src : item.src;
        item.href = itemDomReal.href ? itemDomReal.href : item.href;

        item.styleDefault.backgroundColor = itemDomReal.style.backgroundColor;
        item.styleDefault.color = itemDomReal.style.color;
        item.styleDefault.fontSize = itemDomReal.style.fontSize;
        item.styleDefault.fontFamily = itemDomReal.style.fontFamily;
        item.styleDefault.borderRadius = itemDomReal.style.borderRadius;
        item.styleDefault.borderStyle = itemDomReal.style.borderStyle;
        item.styleDefault.borderColor = itemDomReal.style.borderColor;
        item.styleDefault.fontWeight = itemDomReal.style.fontWeight;
        item.styleDefault.textAlign = itemDomReal.style.textAlign;
        item.styleDefault.borderWidth = itemDomReal.style.borderWidth;
        item.styleDefault.textTransform = itemDomReal.style.textTransform;
        item.styleDefault.lineHeight = itemDomReal.style.lineHeight;
      }
    });
  }, [items]);
  // render item

  const renderItem = () => {
    if (resizable && type !== "icon") {
      return (
        <ReactResizableBox
          width={widthContents ? parseInt(widthContents) : width}
          height={
            heightWrapperReSizeable ? parseInt(heightWrapperReSizeable) : height
          }
          // onClick={handleSelectItemToEdit}

          style={{
            ...stylesItem,
            transform: center ? "translateX(-50%)" : "none",
            maxWidth: "102%",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <>
            <Type
              id={id}
              ref={draggable ? drag : null}
              onClick={(e) => {
                if (type !== "input" && type !== "img") {
                  e.preventDefault();
                }
                handleSelectItemToEdit(e);
              }}
              className={classNamesItem}
              src={type === "img" && linkImg ? linkImg : null}
              value={type !== "img" ? value : undefined}
              onChange={type === "img" ? handleShowInputImg : handleChangeValue}
              href={linkItemTypeA ? linkItemTypeA : href}
              target={linkItemTypeA ? "_blank" : null}
              onBlur={handleBlurInput}
              style={{
                position: position,
                ...styleDefault,
              }}
              type={type === "img" ? "file" : "text"}
              accept={type !== "img" ? null : "image/*"}
            >
              {nameItemLink ? nameItemLink : null}
            </Type>

            {type === "a" ? (
              <div
                id={id}
                className={clsx(styles.item_edit)}
                onClick={handleEditLink}
              >
                <TipSuggest content='Edit link '>
                  <RiEdit2Fill onClick={handleEditLink}></RiEdit2Fill>
                </TipSuggest>
              </div>
            ) : undefined}
          </>
        </ReactResizableBox>
      );
    } else if (
      (icon && isChild === false) ||
      (inGrid === "false" && isChild === false)
    ) {
      return (
        <Type
          onClick={resizable ? handleSelectItemToEdit : null}
          id={id}
          ref={drag}
          className={classNamesItem}
          style={{
            ...styleDefault,
          }}
          value={value}
          onChange={handleChangeValue}
          onBlur={handleBlurInput}
        >
          {children}
        </Type>
      );
    } else if (type === "icon" && inGrid && isChild === false) {
      return (
        <ReactResizableBox
          width={widthContents ? parseInt(widthContents) : width}
          height={
            heightWrapperReSizeable ? parseInt(heightWrapperReSizeable) : height
          }
          style={{
            ...stylesItem,
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <>
            <a
              id={id}
              ref={draggable ? drag : null}
              onClick={(e) => {
                e.preventDefault();
                handleSelectItemToEdit(e);
              }}
              className={classNamesItem}
              target='_blank'
              href={linkIcon}
              style={
                {
                  // ...styleDefault,
                }
              }
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              {InfoIcon ? icons[InfoIcon] : null}
            </a>

            <div
              className={clsx(styles.item_edit)}
              onClick={(e) => {
                e.stopPropagation();
                inputEditLinkIcon.current.focus();
                setShowEditLinkIcon(true);
                if (inputEditLinkIcon) {
                  setEditorComponent(
                    inputEditLinkIcon.current.value ? false : true
                  );
                }
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
              }}
            >
              <TipSuggest content='Add link '>
                <RiEdit2Fill id={id}></RiEdit2Fill>
              </TipSuggest>
            </div>
            <div
              className={clsx(styles.enter_link_icon)}
              style={{
                display: showEditLinkIcon ? "flex" : "none",
              }}
            >
              <input
                placeholder='Link'
                ref={inputEditLinkIcon}
                onChange={(e) => {
                  e.stopPropagation();
                  setLinkIcon(e.target.value);
                }}
                value={linkIcon}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    e.stopPropagation();
                    setShowEditLinkIcon(false);
                    setLinkIcon(e.target.value);
                  }
                }}
                onBlur={(e) => {
                  e.stopPropagation();
                  setShowEditLinkIcon(false);
                  setLinkIcon(e.target.value);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                }}
              ></input>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditLinkIcon(false);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                }}
              >
                Enter
              </button>
            </div>
          </>
        </ReactResizableBox>
      );
    }
  };
  return (
    <>
      {renderItem()}

      {type === "a" && inGrid && showModal ? (
        <div
          className={clsx(styles.modal)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={clsx(styles.modal_enter_link)}
            style={{
              top: `${200 + scrollHeight}px`,
            }}
          >
            <h5>Add link</h5>
            <span>Name</span>
            <input
              type='link'
              placeholder='Name'
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={nameItemLink}
              onChange={(e) => {
                e.stopPropagation();
                setEditorComponent(true);
                setNameItemLink(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  e.stopPropagation();
                  setShowModal(!showModal);
                }
              }}
            ></input>
            <span>Link</span>
            <input
              type='link'
              placeholder='Link .'
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={linkItemTypeA}
              onChange={(e) => {
                e.stopPropagation();
                setEditorComponent(true);
                setLinkItemTypeA(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  e.stopPropagation();
                  setShowModal(!showModal);
                }
              }}
            ></input>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(!showModal);
              }}
            >
              Enter
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Item;
