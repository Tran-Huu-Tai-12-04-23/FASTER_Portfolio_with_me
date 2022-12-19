import { useEffect, useState, useRef, useLayoutEffect } from "react";
import clsx from "clsx";
import styles from "./CreatePortfolio.module.scss";
import { MdKeyboardArrowUp } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import { FiEdit2 } from "react-icons/fi";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent, Trash, TipSuggest } from "~/Components";
import {
  ContextShowEditorComponent,
  ContextItemsIngrid,
  ContextItemsMultiIngrid,
  ElementContentPortfolio,
  wrapperContent,
} from "~/Store/Context";
import Footer from "../Footer";
import Preview from "../Preview";
import Tag from "./Tag";

function CreatePortfolio({ DefaultComponent, heightDefault, children }) {
  const [items, setItems] = useState(DefaultComponent ? DefaultComponent : []);
  const [itemMulti, setItemMulti] = useState([]);
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
  const [showPreview, setShowPreview] = useState(false);
  const contentPortfolio = useRef();
  const wrapperTemplateContent = useRef();
  const inputAddHeight = useRef();
  const [contentTag, setContentTag] = useState("Header");
  const [showTag, setShowTag] = useState(false);
  const wrapperContentPortfolio = useRef();

  // save data in localStorage
  useEffect(() => {
    // localStorage.clear();
    // localStorage.setItem("items", JSON.stringify(items));
    // const data = localStorage.getItem("items");
    // console.log(data);
  }, [items]);
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
      // console.log(wrapperTemplateContent.current.offsetWidth);
    }
  }, []);
  //set size when window resize
  useLayoutEffect(() => {
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
    <wrapperContent.Provider value={wrapperContentPortfolio}>
      <ContextItemsIngrid.Provider value={[items, setItems]}>
        <ContextShowEditorComponent.Provider
          value={[showEditorComponent, setEditorComponent]}
        >
          <ContextItemsMultiIngrid.Provider value={[itemMulti, setItemMulti]}>
            <div className={clsx(styles.wrapper)}>
              {showEditorComponent === false ? (
                <Header setShowPreview={setShowPreview} />
              ) : (
                ""
              )}

              <div
                className={clsx(styles.content)}
                ref={wrapperContentPortfolio}
              >
                <MenuUntil state={setWidthMenu} valueState={widthMenu}>
                  <div className={clsx(styles.wrapper_icon_add_height_content)}>
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
                    <ElementContentPortfolio.Provider
                      value={[contentPortfolio, setShowTrash, widthContent]}
                    >
                      {children}
                    </ElementContentPortfolio.Provider>
                    {/* <Grid space={2} gap='12px' backgroundColor='#ccc'></Grid> */}
                  </div>
                </div>

                <EditorComponent
                  style={{
                    display: showEditorComponent ? "flex" : "none",
                    // transform: widthMenu === "0" ? "translateX(-11%)" : "",
                  }}
                ></EditorComponent>

                <Trash
                  display={showTrash ? "flex" : "none"}
                  id={"trash"}
                ></Trash>

                <div
                  className={clsx(styles.go_to_top)}
                  style={{
                    display: goToTop ? "block" : "none",
                    transform: widthMenu === "0" ? "translateX(-100px)" : "",
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
            <Footer backgroundColor='#fff'></Footer>
          </ContextItemsMultiIngrid.Provider>
        </ContextShowEditorComponent.Provider>
      </ContextItemsIngrid.Provider>
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
        ></Preview>
      </div>
    </wrapperContent.Provider>
  );
}

export default CreatePortfolio;
