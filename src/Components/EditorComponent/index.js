import { useContext, useState, useEffect, useLayoutEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BsBorderWidth } from "react-icons/bs";
import { TbBorderRadius } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { GoTextSize } from "react-icons/go";
import { BiFontFamily, BiColorFill } from "react-icons/bi";
import {
  AiOutlineBorder,
  AiOutlineFontColors,
  AiOutlineMinus,
} from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";
import { RxBorderStyle, RxLineHeight } from "react-icons/rx";
import { FaBold } from "react-icons/fa";
import { FiAlignCenter } from "react-icons/fi";
import { TbLetterCaseUpper } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";

import styles from "./EditorComponent.module.scss";
import { fontFamilys, borderStyles } from "./datas";
import {
  ContextReducer,
  ContextItemsIngrid,
  ColorRange,
} from "~/Store/Context";
import {
  setBackgroundColor,
  setColor,
  setFontFamily,
  setFontSize,
  setBorderRadius,
  setBorderStyle,
  setBorderColor,
  setFontWeight,
  setTextAlign,
  setBorderSize,
  setTextTransform,
  setLineHeight,
  setUndo,
} from "~/Store/reducer/actions";
import { TipSuggest } from "~/Components";
import { ContextShowEditorComponent } from "~/Store/Context";

function EditorComponent({ style }) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );
  const [showSetBackground, setShowSetBackground] = useState(false);
  const [showEditColor, setShowEditColor] = useState(false);
  const [showEditBorderColor, setShowEditBorderColor] = useState(false);
  const [showEditBorderSize, setShowEditBorderSize] = useState(false);
  const [showEditBorderStyle, setShowEditBorderStyle] = useState(false);
  const [showEditFontStyle, setShowEditFontStyle] = useState(false);
  const [typeItemSelected, setTypeItemSelected] = useState("input");

  const [valueBorderRadius, setValueBorderRadius] = useState(
    state.border_radius ? state.border_radius : 0
  );
  const [fontSize, setFontSizeItem] = useState(
    state.font_size ? parseInt(state.font_size) : 0
  );
  const [lineHeight, setLineHeightItem] = useState(
    state.line_height ? parseInt(state.line_height) : 0
  );
  const [backgroundColorItem, setBackgroundColorItem] = useState(
    state.background_color ? state.background_color : "#873636"
  );
  const [colorItem, setColorItem] = useState(
    state.color ? state.color : "#873636"
  );
  const [borderColorItem, setBorderColorItem] = useState(
    state.border_color ? state.border_color : "#873636"
  );
  const [colorRange, setColorRange] = useContext(ColorRange);

  useLayoutEffect(() => {
    setBackgroundColor(state.background_color);
    setColor(state.color);
    setBorderColor(state.border_color);
  }, [state]);

  useEffect(() => {
    if (state.border_radius) {
      setValueBorderRadius(parseInt(state.border_radius));
    }
    if (state.font_size) {
      setFontSizeItem(parseInt(state.font_size));
    }
    if (state.line_height) {
      setLineHeightItem(parseInt(state.line_height));
    }
  }, [state]);
  //set style component
  useEffect(() => {
    if (valueBorderRadius) {
      dispatch(setBorderRadius(`${valueBorderRadius}px`));
    }
  }, [valueBorderRadius]);
  useEffect(() => {
    if (fontSize) {
      dispatch(setFontSize(`${fontSize}px`));
    }
  }, [fontSize]);
  useEffect(() => {
    if (lineHeight) {
      dispatch(setLineHeight(`${lineHeight}px`));
    }
  }, [lineHeight]);
  //hidden editor each attribute
  useEffect(() => {
    const handleHiddenEditor = () => {
      setShowSetBackground(false);
      setShowEditColor(false);
      setShowEditBorderColor(false);
      setShowEditBorderSize(false);
      setShowEditBorderStyle(false);
      setShowEditFontStyle(false);
      setEditorComponent(false);
    };
    window.addEventListener("click", handleHiddenEditor);
    return () => {
      window.removeEventListener("click", handleHiddenEditor);
    };
  }, []);

  useEffect(() => {
    const item = findItem(state.id_item_selected);
    if (item) {
      setTypeItemSelected(item.type);
    }
  }, [state]);
  const findItem = (id) => {
    var item;
    items.forEach((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    return item;
  };

  const renderOptionColors = () => {
    return colorRange.map((color, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            state.stackUndo.push(structuredClone(items));
            dispatch(setColor(color));
          }}
          data-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };
  const renderFontFamily = () => {
    return fontFamilys.map((fontFamily, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            state.stackUndo.push(structuredClone(items));
            dispatch(setFontFamily(fontFamily));
          }}
          data-font-family={fontFamily + ", sans-serif"}
        >
          {fontFamily}
        </li>
      );
    });
  };

  const renderOptionBorderColors = () => {
    return colorRange.map((color, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            state.stackUndo.push(structuredClone(items));
            dispatch(setBorderColor(color));
          }}
          data-border-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderOptionBackGroundColor = () => {
    return colorRange.map((color, index) => {
      return (
        <li
          onClick={(e) => {
            e.stopPropagation();
            state.stackUndo.push(structuredClone(items));
            dispatch(setBackgroundColor(color));
          }}
          key={index}
          data-background-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderOptionBorderSize = () => {
    const numberBorderSize = Array.from(Array(6).keys());
    return numberBorderSize.map((size, index) => {
      return (
        <div
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            state.stackUndo.push(structuredClone(items));
            dispatch(setBorderSize(`${size}px`));
          }}
          style={{
            border: "1px solid #6699FF",
            borderRadius: "12px",
            marginBottom: "4px",
          }}
        >
          <li
            data-border-size={size}
            style={{
              height: `${size}px`,
            }}
          ></li>
        </div>
      );
    });
  };

  const renderBorderStyle = () => {
    return borderStyles.map((style, index) => {
      return (
        <li
          onClick={(e) => {
            e.stopPropagation();
            state.stackUndo.push(structuredClone(items));
            dispatch(setBorderStyle(style));
          }}
          key={index}
          data-border-style={style}
          style={{
            border: `2px ${style} #000`,
          }}
        ></li>
      );
    });
  };
  const removeItemsIngrid = (e) => {
    e.stopPropagation();
    //remove dom real
    const item = document.getElementById(state.id_item_selected);
    // item.remove();
    // remove dom virtual
    console.log(state.id_item_selected);
    setItems(() => {
      return items.filter((item) => {
        return item.id !== state.id_item_selected;
      });
    });
  };

  //handle hidden and show edit component when i click display
  const handleHiddenEditor = () => {
    setShowEditBorderStyle(false);
    setShowEditBorderColor(false);
    setShowEditColor(false);
    setShowSetBackground(false);
    setShowEditFontStyle(false);
    setShowEditBorderSize(false);
  };

  return (
    <div
      className={clsx(styles.wrapper)}
      style={{
        ...style,
        // display: "flex",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={clsx(styles.wrapper_icon_close)}
        onClick={() => {
          setEditorComponent(!showEditorComponent);
        }}
      >
        <TipSuggest content='Close editor' position='left'>
          <TfiClose className={clsx(styles.icon_close)}></TfiClose>
        </TipSuggest>
      </div>

      <div
        className={clsx(styles.icon, styles.icon_background_color)}
        onClick={(e) => {
          e.stopPropagation();
          setShowSetBackground(!showSetBackground);
          setShowEditBorderStyle(false);
          setShowEditFontStyle(false);
          setShowEditBorderColor(false);
          setShowEditColor(false);
          setShowEditBorderSize(false);
        }}
      >
        <TipSuggest content='Edit background color' position='bottom'>
          <BiColorFill></BiColorFill>
        </TipSuggest>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.background_color_options)}
          id='background_color_options'
          style={{
            display: showSetBackground ? "flex" : "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {renderOptionBackGroundColor()}
          <div className={clsx(styles.wrapper_input_color)}>
            <input
              className={clsx(styles.color_range)}
              type='color'
              value={backgroundColorItem}
              onChange={(e) => {
                setBackgroundColorItem(e.target.value);
                dispatch(setBackgroundColor(e.target.value));
              }}
            ></input>
            <TipSuggest content='Add your color'>
              <IoIosAdd
                className={clsx(styles.icon_add_color)}
                onClick={(e) => {
                  setColorRange((prev) => {
                    if (!prev.includes(backgroundColorItem)) {
                      return [...prev, backgroundColorItem];
                    }
                    alert("color is already");
                    return [...prev];
                  });
                }}
              ></IoIosAdd>
            </TipSuggest>
          </div>
        </ul>
      </div>
      {typeItemSelected !== "img" && typeItemSelected !== "div" && (
        <div
          className={clsx(styles.icon, styles.icon_color)}
          onClick={(e) => {
            e.stopPropagation();
            setShowEditColor(!showEditColor);
            setShowSetBackground(false);
            setShowEditBorderStyle(false);
            setShowEditFontStyle(false);
            setShowEditBorderColor(false);
            setShowEditBorderSize(false);
          }}
        >
          <TipSuggest content='Edit color' position='bottom'>
            <AiOutlineFontColors></AiOutlineFontColors>
          </TipSuggest>
          <FontAwesomeIcon
            className={clsx(styles.icon__arrow_down)}
            icon={faChevronDown}
          ></FontAwesomeIcon>
          <ul
            className={clsx(styles.color_options)}
            id='color_options'
            style={{
              display: showEditColor ? "flex" : "none",
            }}
            onClick={(e) => {
              // e.preventDefault();
              e.stopPropagation();
            }}
          >
            {renderOptionColors()}
            <div className={clsx(styles.wrapper_input_color)}>
              <input
                style={{
                  border: "none",
                  outline: "none",
                  borderRadius: "12px",
                  width: "100%",
                }}
                type='color'
                value={colorItem}
                onChange={(e) => {
                  setColorItem(e.target.value);
                  dispatch(setColor(e.target.value));
                }}
              ></input>
              <TipSuggest content='Add your color'>
                <IoIosAdd
                  className={clsx(styles.icon_add_color)}
                  onClick={(e) => {
                    setColorRange((prev) => {
                      if (!prev.includes(colorItem)) {
                        return [...prev, colorItem];
                      }
                      alert("color is already");

                      return [...prev];
                    });
                  }}
                ></IoIosAdd>
              </TipSuggest>
            </div>
          </ul>
        </div>
      )}

      <div
        className={clsx(styles.icon, styles.icon_border_color)}
        onClick={(e) => {
          e.stopPropagation();
          setShowEditBorderColor(!showEditBorderColor);
          setShowEditColor(false);
          setShowSetBackground(false);
          setShowEditBorderStyle(false);
          setShowEditFontStyle(false);
          setShowEditBorderSize(false);
        }}
      >
        <TipSuggest content='Edit border color' position='bottom'>
          <AiOutlineBorder></AiOutlineBorder>
        </TipSuggest>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_color_options)}
          id='border_color_options'
          style={{
            display: showEditBorderColor ? "flex" : "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {renderOptionBorderColors()}
          <div className={clsx(styles.wrapper_input_color)}>
            <input
              style={{
                border: "none",
                outline: "none",
                borderRadius: "12px",
                width: "100%",
              }}
              type='color'
              value={borderColorItem}
              onChange={(e) => {
                setBorderColorItem(e.target.value);
                dispatch(setBorderColor(e.target.value));
              }}
            ></input>
            <TipSuggest content='Add your color'>
              <IoIosAdd
                className={clsx(styles.icon_add_color)}
                onClick={(e) => {
                  setColorRange((prev) => {
                    if (!prev.includes(borderColorItem)) {
                      return [...prev, borderColorItem];
                    }
                    alert("color is already");
                    return [...prev];
                  });
                }}
              ></IoIosAdd>
            </TipSuggest>
          </div>
        </ul>
      </div>
      {typeItemSelected !== "img" &&
        typeItemSelected !== "div" &&
        typeItemSelected !== "icon" && (
          <div
            className={clsx(styles.icon, styles.font_size_options)}
            onClick={handleHiddenEditor}
          >
            <TipSuggest content='Edit fontsize'>
              <GoTextSize
                style={{
                  border: "none",
                }}
              ></GoTextSize>
            </TipSuggest>
            <AiOutlineMinus
              onClick={(e) => {
                state.stackUndo.push(structuredClone(items));
                setFontSizeItem((prev) => {
                  return parseInt(prev) - 1;
                });
              }}
            />
            <input
              type='number'
              style={{
                color: "#000",
              }}
              onChange={(e) => {
                state.stackUndo.push(structuredClone(items));
                setFontSizeItem(e.target.value);
              }}
              value={fontSize}
            ></input>
            <IoIosAdd
              style={{
                borderRight: "none",
              }}
              onClick={(e) => {
                state.stackUndo.push(structuredClone(items));
                setFontSizeItem((prev) => {
                  return parseInt(prev) + 1;
                });
              }}
            />
          </div>
        )}
      {typeItemSelected !== "img" &&
        typeItemSelected !== "div" &&
        typeItemSelected !== "icon" && (
          <div
            className={clsx(styles.icon, styles.line_height_options)}
            onClick={handleHiddenEditor}
          >
            <TipSuggest content='Edit line height'>
              <RxLineHeight
                style={{
                  border: "none",
                }}
              ></RxLineHeight>
            </TipSuggest>
            <AiOutlineMinus
              onClick={(e) => {
                state.stackUndo.push(structuredClone(items));
                setLineHeightItem((prev) => {
                  return parseInt(prev) - 1;
                });
              }}
            />
            <input
              type='number'
              style={{
                color: "#000",
              }}
              onChange={(e) => {
                state.stackUndo.push(structuredClone(items));
                setLineHeightItem(e.target.value);
              }}
              value={lineHeight}
            ></input>
            <IoIosAdd
              style={{
                borderRight: "none",
              }}
              onClick={(e) => {
                state.stackUndo.push(structuredClone(items));
                setLineHeightItem((prev) => {
                  return parseInt(prev) + 1;
                });
              }}
            />
          </div>
        )}

      <div
        className={clsx(styles.icon, styles.border_radius_options)}
        onClick={(e) => {
          handleHiddenEditor();
        }}
      >
        <TipSuggest content='Edit border radius' position='bottom'>
          <TbBorderRadius
            style={{
              border: "none",
            }}
          ></TbBorderRadius>
        </TipSuggest>
        <AiOutlineMinus
          onClick={(e) => {
            state.stackUndo.push(structuredClone(items));
            setValueBorderRadius((prev) => {
              return parseInt(prev) - 1;
            });
          }}
        />
        <input
          type='number'
          style={{
            color: "#000",
          }}
          onChange={(e) => {
            state.stackUndo.push(structuredClone(items));
            setValueBorderRadius(e.target.value);
          }}
          value={valueBorderRadius}
        ></input>
        <IoIosAdd
          style={{
            borderRight: "none",
          }}
          onClick={(e) => {
            state.stackUndo.push(structuredClone(items));
            setValueBorderRadius((prev) => {
              return parseInt(prev) + 1;
            });
          }}
        />
      </div>

      <div
        className={clsx(styles.icon, styles.icon_border_size)}
        onClick={(e) => {
          e.stopPropagation();
          setShowEditBorderSize(!showEditBorderSize);
          setShowEditBorderColor(false);
          setShowEditColor(false);
          setShowSetBackground(false);
          setShowEditBorderStyle(false);
          setShowEditFontStyle(false);
        }}
      >
        <TipSuggest content='Edit border size'>
          <BsBorderWidth></BsBorderWidth>
        </TipSuggest>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_size_options)}
          id='border_size_options'
          style={{
            display: showEditBorderSize ? "block" : "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {renderOptionBorderSize()}
        </ul>
      </div>
      <div
        className={clsx(styles.icon, styles.icon_border_style)}
        onClick={(e) => {
          e.stopPropagation();
          setShowEditBorderStyle(!showEditBorderStyle);
          setShowEditBorderColor(false);
          setShowEditColor(false);
          setShowSetBackground(false);
          setShowEditFontStyle(false);
          setShowEditBorderSize(false);
        }}
      >
        <TipSuggest content='Edit border style'>
          <RxBorderStyle
            style={{
              marginTop: "8px",
            }}
          ></RxBorderStyle>
        </TipSuggest>

        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_style_options)}
          id='border_style_options'
          style={{
            display: showEditBorderStyle ? "block" : "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {renderBorderStyle()}
        </ul>
      </div>
      {typeItemSelected !== "img" &&
        typeItemSelected !== "div" &&
        typeItemSelected !== "icon" && (
          <>
            <div
              className={clsx(styles.icon, styles.icon_font_weight)}
              onClick={(e) => {
                e.stopPropagation();
                state.stackUndo.push(structuredClone(items));
                dispatch(setFontWeight(!state.font_weight));
                handleHiddenEditor();
              }}
            >
              <FaBold></FaBold>
            </div>
            <div
              className={clsx(styles.icon, styles.icon_align_center)}
              onClick={(e) => {
                e.stopPropagation();
                state.stackUndo.push(structuredClone(items));
                handleHiddenEditor();
                dispatch(setTextAlign(!state.text_align));
              }}
            >
              <TipSuggest content='Text center'>
                <FiAlignCenter
                  style={{
                    marginTop: "8px",
                  }}
                ></FiAlignCenter>
              </TipSuggest>
            </div>
            <div
              className={clsx(styles.icon, styles.icon_upper_letter)}
              style={{
                marginRight: 12,
              }}
              onClick={(e) => {
                e.stopPropagation();
                state.stackUndo.push(structuredClone(items));
                handleHiddenEditor();
                dispatch(setTextTransform(!state.text_transform));
              }}
            >
              <TipSuggest content='Letter uppercase'>
                <TbLetterCaseUpper
                  style={{
                    marginTop: 8,
                  }}
                ></TbLetterCaseUpper>
              </TipSuggest>
            </div>
            <div
              className={clsx(styles.icon, styles.icon_font_style)}
              onClick={(e) => {
                setShowEditFontStyle(!showEditFontStyle);
                setShowEditBorderColor(false);
                setShowEditColor(false);
                setShowSetBackground(false);
                setShowEditBorderStyle(false);
                setShowEditBorderSize(false);
              }}
            >
              <TipSuggest content='Edit font styles'>
                <BiFontFamily
                  style={{
                    marginTop: 8,
                  }}
                ></BiFontFamily>
              </TipSuggest>
              <FontAwesomeIcon
                className={clsx(styles.icon__arrow_down)}
                icon={faChevronDown}
              ></FontAwesomeIcon>
              <ul
                className={clsx(styles.font_style_options)}
                id='font_style_options'
                style={{
                  display: showEditFontStyle ? "block" : "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {renderFontFamily()}
              </ul>
            </div>
          </>
        )}

      <FcFullTrash
        onClick={removeItemsIngrid}
        className={clsx(styles.icon_trash)}
        style={{
          transform:
            typeItemSelected === "img" ||
            typeItemSelected === "div" ||
            typeItemSelected === "icon"
              ? "translateX(30px)"
              : "translateX(0)",
        }}
      ></FcFullTrash>
    </div>
  );
}

export default EditorComponent;
