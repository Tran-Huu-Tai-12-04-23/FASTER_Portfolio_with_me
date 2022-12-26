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
import { IoAddOutline } from "react-icons/io5";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent, Trash, TipSuggest } from "~/Components";
import {
  ContextShowEditorComponent,
  ContextItemsIngrid,
  ElementContentPortfolio,
  wrapperContent,
  ContextReducer,
  NumberPages,
} from "~/Store/Context";
import Footer from "../Footer";
import Preview from "../Preview";
import Tag from "./Tag";
import { getData } from "~/Store/util";

function CreatePortfolio({ DefaultComponent, heightDefault, id, children }) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useState(DefaultComponent ? DefaultComponent : []);
  const [itemMulti, setItemMulti] = useState([]);
  const [transactionContent, setTransactionContent] = useState("0");
  const [widthMenu, setWidthMenu] = useState("22%");
  const [showEditorComponent, setEditorComponent] = useState(false);
  const [heightContent, setHeightContent] = useState(
    heightDefault ? heightDefault : 1000
  );
  const [showTrash, setShowTrash] = useState(false);
  const [widthContent, setWidthContent] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const contentPortfolio = useRef();
  const wrapperTemplateContent = useRef();
  const inputAddHeight = useRef();
  const [contentTag, setContentTag] = useState("Header");
  const [showTag, setShowTag] = useState(false);
  const wrapperContentPortfolio = useRef();
  const [numberPages, setNumberPages] = useState(1);

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
    itemMulti.map((item) => {
      if (item.id === state.id_item_selected) {
        setStyle(item);
      }
    });
    localStorage.setItem(`items-${id}`, JSON.stringify(items));
  };

  // save data in localStorage
  useEffect(() => {
    const handleSaveDataInStorage = (e) => {
      e.preventDefault();
      e.returnValue = "";
      loadInStyleDefault();
    };
    window.addEventListener("beforeunload", handleSaveDataInStorage);
  });

  useEffect(() => {
    const data = getData(id);
    data
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => err);
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
    }
  }, []);
  //set size when window resize
  useLayoutEffect(() => {
    const handleResizeWindow = () => {
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

  // transaction page when hidden menu
  useEffect(() => {
    setTransactionContent(widthMenu === "0" ? "-11%" : "0");
  }, [widthMenu]);

  const renderManagerPages = () => {
    const arrPages = Array.from(Array(numberPages).keys());
    return arrPages.map((page, index) => {
      return (
        <TipSuggest key={index} content={`page-${index + 1}`}>
          <div id={`grid_${index + 1}`}></div>;
        </TipSuggest>
      );
    });
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
              <NumberPages.Provider value={[numberPages, setNumberPages]}>
                <div
                  className={clsx(styles.wrapper)}
                  style={{
                    display: showPreview ? "none" : "block",
                  }}
                >
                  {showEditorComponent === false ? (
                    <Header setShowPreview={setShowPreview} />
                  ) : (
                    ""
                  )}

                  <div
                    className={clsx(styles.content)}
                    ref={wrapperContentPortfolio}
                  >
                    <MenuUntil
                      state={setWidthMenu}
                      valueState={widthMenu}
                    ></MenuUntil>
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
                    >
                      <div
                        ref={wrapperTemplateContent}
                        className={clsx(styles.wrapper_template_content)}
                        id='wrapper_template_content'
                      >
                        {children}
                      </div>
                    </div>
                    {/* add page  */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        position: "absolute",
                        bottom: "20px",
                        left: "calc(22%)",
                        width: "74%",
                        height: 20,
                      }}
                    >
                      <div
                        className={clsx(styles.pages_add)}
                        style={{
                          display: widthMenu === "0" ? "none" : "flex",
                        }}
                      >
                        <IoAddOutline></IoAddOutline>
                        <span>Add page</span>
                      </div>
                      <div className={clsx(styles.manager_pages)}>
                        {renderManagerPages()}
                      </div>
                    </div>

                    <EditorComponent
                      style={{
                        display: showEditorComponent ? "flex" : "none",
                      }}
                    ></EditorComponent>

                    <Trash
                      display={showTrash ? "flex" : "none"}
                      id={"trash"}
                    ></Trash>
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
              </NumberPages.Provider>
            </ElementContentPortfolio.Provider>
          </ContextShowEditorComponent.Provider>
        </ContextItemsIngrid.Provider>
      </wrapperContent.Provider>
    </>
  );
}

export default CreatePortfolio;
