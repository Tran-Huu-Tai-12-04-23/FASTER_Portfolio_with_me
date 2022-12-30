import {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useContext,
} from "react";
import clsx from "clsx";
import styles from "./CreatePortfolio.module.scss";
import { MdKeyboardArrowUp } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent, Trash, TipSuggest } from "~/Components";
import {
  ContextShowEditorComponent,
  ContextItemsIngrid,
  ElementContentPortfolio,
  wrapperContent,
  ContextReducer,
  ColorRange,
} from "~/Store/Context";
import Footer from "../Footer";
import Preview from "../Preview";
import Tag from "./Tag";
import { getData, getColors } from "~/Store/util";

function CreatePortfolio({
  DefaultComponent = [],
  heightDefault,
  id,
  children,
}) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useState(DefaultComponent);
  const [dataItems, setDataItems] = useState(structuredClone(DefaultComponent));

  const [transactionContent, setTransactionContent] = useState("0");
  const [widthMenu, setWidthMenu] = useState("22%");
  const [goToTop, setGoToTop] = useState(false);
  const [showEditorComponent, setEditorComponent] = useState(false);
  const [showAddHeight, setShowAddHeight] = useState(false);
  const [heightContent, setHeightContent] = useState(
    heightDefault ? heightDefault : 1000
  );
  const [heightContentChange, setHeightContentChange] = useState("");
  const [showTrash, setShowTrash] = useState(false);
  const [widthContent, setWidthContent] = useState();
  const [widthContentBefore, setWidthContentBefore] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const contentPortfolio = useRef();
  const wrapperTemplateContent = useRef();
  const inputAddHeight = useRef();
  const [contentTag, setContentTag] = useState("Header");
  const [showTag, setShowTag] = useState(false);
  const wrapperContentPortfolio = useRef();
  const [heightOnScroll, setHeightOnScroll] = useState();
  const [showRecovery, setShowRecovery] = useState(false);
  const [dataRecovery, setDataRecovery] = useState({});
  const [colorRange, setColorRange] = useState([
    "rgba(0,0,0,0)",
    "#000",
    "#fff",
    "#00FFFF",
    "#FF0000",
    "#757575",
    "#000080",
    "#000033",
  ]);

  const isObjectEquals = (a, b) => {
    if (a && b) {
      if (a.length !== b.length) return false;
      if (JSON.stringify(a) !== JSON.stringify(b)) return false;
    }
    return true;
  };

  const loadInStyleDefault = () => {
    // console.log("render");
    const setStyle = (item) => {
      const itemDomReal = document.getElementById(item.id);
      if (itemDomReal) {
        item.href = itemDomReal.href;
        item.textValue = itemDomReal.text;
        item.src = itemDomReal.src;
      }
      item.styleDefault.color = state.color;
      item.styleDefault.backgroundColor = state.background_color;
      item.styleDefault.fontSize = state.font_size;
      item.styleDefault.fontFamily = state.font_family;
      item.styleDefault.borderRadius = state.border_radius;
      item.styleDefault.borderStyle = state.border_style;
      item.styleDefault.borderColor = state.border_color;
      item.styleDefault.fontWeight = state.font_weight ? "bold" : "";
      item.styleDefault.textAlign = state.text_align ? "center" : "";
      item.styleDefault.borderSize = state.border_size;
      item.styleDefault.textTransform = state.text_transform ? "uppercase" : "";
      item.styleDefault.lineHeight = state.line_height;
    };
    // console.log(state);

    items.map((item) => {
      if (item.id === state.id_item_selected) {
        setStyle(item);
      }
    });
    // console.log(findItem(state.id_item_selected));
    if (!isObjectEquals(dataItems, items)) {
      localStorage.setItem(`items-${id}`, JSON.stringify(items));
    }

    localStorage.setItem(`colors-${id}`, JSON.stringify(colorRange));
  };
  // save data in localStorage
  useEffect(() => {
    const handleSaveDataInStorage = (e) => {
      e.preventDefault();
      e.returnValue = "";
      loadInStyleDefault();
    };

    window.addEventListener("beforeunload", handleSaveDataInStorage);
    // return () => {
    //   window.removeEventListener("beforeunload", handleSaveDataInStorage);
    // };
  });

  useEffect(() => {
    const data = getData(id);
    const colors = getColors(id);
    data
      .then((data) => {
        if (data && data.length > 0) {
          setDataRecovery(data);
          setShowRecovery(true);
        }
      })
      .catch((err) => err);
    colors
      .then((colors) => {
        if (colors && colors.length > 0) {
          setColorRange(colors);
        }
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }, []);

  //auto focus for users
  useEffect(() => {
    if (inputAddHeight && inputAddHeight.current) {
      inputAddHeight.current.focus();
    }
  });

  //get width content portfolio
  useEffect(() => {
    if (wrapperTemplateContent.current) {
      setWidthContent(wrapperTemplateContent.current.offsetWidth);
      setWidthContentBefore(wrapperTemplateContent.current.offsetWidth);
      // console.log(wrapperTemplateContent.current.offsetWidth);
    }
  }, []);
  //set size when window resize
  useEffect(() => {
    const handleResizeWindow = () => {
      // console.log(wrapperTemplateContent.current.offsetWidth);
      setWidthContent(wrapperTemplateContent.current.offsetWidth);
    };
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  });

  //hidden edit component when none item in grid
  useEffect(() => {
    if (items) {
      if (items.length <= 0) {
        setEditorComponent(false);
      }
    }
  }, [items]);

  //set height for page
  useEffect(() => {
    if (wrapperTemplateContent.current) {
      wrapperTemplateContent.current.style.height = `${heightContent}px`;
    }
  }, [heightContent]);

  // transaction page when hidden menu
  useEffect(() => {
    setTransactionContent(widthMenu === "0" ? "-11%" : "0");
  }, [widthMenu]);

  //go to top page
  const handleShowScroll = (e) => {
    setShowTag(true);
    if (e.currentTarget.scrollTop <= 0) {
      setShowTag(false);
    }
    if (e.currentTarget.scrollTop < 200) {
      setContentTag("Header");
    }
    if (e.currentTarget.scrollTop > 200) {
      setContentTag("Content");
    }
    if (e.currentTarget.scrollTop > 2000) {
      setContentTag("Footer");
    }
    setGoToTop(e.currentTarget.scrollTop > 200 ? true : false);
  };

  const handleGoToTop = (e) => {
    if (contentPortfolio.current) {
      contentPortfolio.current.scrollTop = 0;
    }
  };

  //handle set height
  const handleSetHeightPage = (e) => {
    setHeightContent((prev) => {
      const newHeight = prev + parseInt(heightContentChange);
      if (newHeight > 1000) {
        return newHeight;
      } else {
        return 1000;
      }
    });
    setHeightContentChange("");
    setShowAddHeight(!showAddHeight);
  };

  return (
    <>
      <wrapperContent.Provider value={wrapperContentPortfolio}>
        <ContextItemsIngrid.Provider value={[items, setItems]}>
          <ContextShowEditorComponent.Provider
            value={[showEditorComponent, setEditorComponent]}
          >
            <ElementContentPortfolio.Provider
              value={[contentPortfolio, setShowTrash, widthContent]}
            >
              <ColorRange.Provider value={[colorRange, setColorRange]}>
                <div
                  className={clsx(styles.wrapper)}
                  style={{
                    display: showPreview ? "none" : "block",
                  }}
                >
                  <div
                    className={clsx(styles.wrapper_nofication)}
                    style={{
                      display:
                        showEditorComponent || !showRecovery ? "none" : "flex",
                    }}
                  >
                    <h1>Web data recovery</h1>
                    <button
                      onClick={(e) => {
                        setShowRecovery(false);
                        localStorage.clear();
                      }}
                    >
                      No
                    </button>
                    <button
                      onClick={(e) => {
                        setItems(dataRecovery);
                        setShowRecovery(false);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                  {showEditorComponent === false && !showRecovery ? (
                    <Header
                      widthContent={widthContent}
                      setShowPreview={setShowPreview}
                      heightDefault={heightDefault}
                    />
                  ) : (
                    ""
                  )}

                  <div
                    className={clsx(styles.content)}
                    ref={wrapperContentPortfolio}
                  >
                    <MenuUntil state={setWidthMenu} valueState={widthMenu}>
                      <div
                        className={clsx(styles.wrapper_icon_add_height_content)}
                      >
                        <TipSuggest
                          content='Add height page, click'
                          position={"top"}
                          styles={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <VscAdd
                            className={clsx(styles.icon_add_height_content)}
                            onClick={(e) => {
                              setShowAddHeight(!showAddHeight);
                            }}
                          ></VscAdd>
                        </TipSuggest>
                        <div
                          className={clsx(styles.form_enter_height)}
                          style={{
                            display: showAddHeight ? "block" : "none",
                          }}
                        >
                          <input
                            ref={inputAddHeight}
                            type='number'
                            onChange={(e) => {
                              setHeightContentChange(e.target.value);
                            }}
                            onKeyPress={(e) => {
                              if (e.which === 13) {
                                handleSetHeightPage();
                              }
                            }}
                            value={heightContentChange}
                            placeholder='Please enter number !!'
                          />
                          <button onClick={handleSetHeightPage}>Enter</button>
                        </div>
                      </div>

                      <Trash
                        display={showTrash ? "flex" : "none"}
                        id={"trash"}
                      ></Trash>
                    </MenuUntil>
                    {showTag && widthMenu !== "0" ? (
                      <Tag content={contentTag}></Tag>
                    ) : null}

                    <div
                      ref={contentPortfolio}
                      id={"content_portfolio"}
                      className={clsx(styles.wrapper_template)}
                      style={{
                        minWidth: "76%",
                        transform: `translateX(${transactionContent})`,
                      }}
                      onScroll={handleShowScroll}
                    >
                      <div
                        ref={wrapperTemplateContent}
                        className={clsx(styles.wrapper_template_content)}
                        id='wrapper_template_content'
                      >
                        {children}

                        {/* <Grid space={2} gap='12px' backgroundColor='#ccc'></Grid> */}
                      </div>
                    </div>

                    <EditorComponent
                      style={{
                        display: showEditorComponent ? "flex" : "none",
                        // transform: widthMenu === "0" ? "translateX(-11%)" : "",
                      }}
                    ></EditorComponent>

                    <div
                      className={clsx(styles.go_to_top)}
                      style={{
                        display: goToTop ? "block" : "none",
                        transform:
                          widthMenu === "0" ? "translateX(-100px)" : "",
                      }}
                    >
                      <TipSuggest content='Go to top'>
                        <MdKeyboardArrowUp
                          onClick={handleGoToTop}
                        ></MdKeyboardArrowUp>
                      </TipSuggest>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "none",
                    display: showPreview ? "block" : "none",
                  }}
                >
                  <Preview
                    setShowPreview={setShowPreview}
                    showPreview={showPreview}
                    items={items}
                    heightTemplate={heightContent}
                  ></Preview>
                </div>
                <div></div>
                <Footer
                  backgroundColor='#fff'
                  showPreview={showPreview}
                ></Footer>
              </ColorRange.Provider>
            </ElementContentPortfolio.Provider>
          </ContextShowEditorComponent.Provider>
        </ContextItemsIngrid.Provider>
      </wrapperContent.Provider>
    </>
  );
}

export default CreatePortfolio;
