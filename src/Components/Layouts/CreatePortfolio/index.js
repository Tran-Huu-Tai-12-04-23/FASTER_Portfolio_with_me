import {
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
    useContext,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";
import styles from "./CreatePortfolio.module.scss";
import { MdKeyboardArrowUp } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";
import { IoAddSharp } from "react-icons/io5";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent, Trash, TipSuggest } from "~/Components";
import {
    ContextShowEditorComponent,
    ContextItemsIngrid,
    ElementContentPortfolio,
    ContextWrapperContent,
    ContextReducer,
    ColorRange,
} from "~/Store/Context";
import Preview from "../Preview";
import { getData, getColors } from "~/Store/util";
import EditorGrid from "./EditorGrid";

function CreatePortfolio({
    DefaultComponent = [],
    heightDefault,
    id,
    children,
}) {
    const [state, dispatch] = useContext(ContextReducer);
    const [items, setItems] = useState(DefaultComponent);
    const [dataItems, setDataItems] = useState(
        structuredClone(DefaultComponent)
    );

    const [transactionContent, setTransactionContent] = useState("0");
    const [widthMenu, setWidthMenu] = useState("22%");
    const [showEditorComponent, setEditorComponent] = useState(true);
    const [showTrash, setShowTrash] = useState(false);
    const [widthContent, setWidthContent] = useState();

    const [showPreview, setShowPreview] = useState(false);
    const contentPortfolio = useRef();
    const wrapperTemplateContent = useRef();
    const inputAddHeight = useRef();

    const wrapperContentPortfolio = useRef();

    const [showRecovery, setShowRecovery] = useState(false);
    const [dataRecovery, setDataRecovery] = useState([]);
    const [heightRecovery, setHeightRecovery] = useState();
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
            item.styleDefault.textTransform = state.text_transform
                ? "uppercase"
                : "";
            item.styleDefault.lineHeight = state.line_height;
        };
        // console.log(state);
        localStorage.clear();
        items.map((item) => {
            if (item.id === state.id_item_selected) {
                setStyle(item);
            }
        });

        // console.log(findItem(state.id_item_selected));
        if (!isObjectEquals(dataItems, items)) {
            const data = {
                items: items,
                // height: heightContent,
            };
            // if (count === items.length) {
            localStorage.setItem(`items-${id}`, JSON.stringify(data));
            localStorage.setItem(`colors-${id}`, JSON.stringify(colorRange));
            // }
        }
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
        data.then((data) => {
            if (data) {
                setDataRecovery(data.items);
                setHeightRecovery(data.height);
                setShowRecovery(true);
            }
        }).catch((err) => err);
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
    useEffect(() => {
        const dataURItoBlob = (dataURI) => {
            var mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
            var binary = atob(dataURI.split(",")[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: mime });
        };
        if (dataRecovery) {
            dataRecovery.map((item) => {
                if (item.linkImage && item.src.toString().includes("blob")) {
                    item.src = URL.createObjectURL(
                        dataURItoBlob(item.linkImage)
                    );
                }
            });
        }
    }, [dataRecovery]);

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

    return (
        <>
            <ContextWrapperContent.Provider value={wrapperContentPortfolio}>
                <ContextItemsIngrid.Provider value={[items, setItems]}>
                    <ContextShowEditorComponent.Provider
                        value={[showEditorComponent, setEditorComponent]}
                    >
                        <ElementContentPortfolio.Provider
                            value={[
                                contentPortfolio,
                                setShowTrash,
                                widthContent,
                            ]}
                        >
                            <ColorRange.Provider
                                value={[colorRange, setColorRange]}
                            >
                                <div
                                    className={clsx(styles.wrapper)}
                                    style={{
                                        display: showPreview ? "none" : "block",
                                    }}
                                >
                                    <div
                                        className={clsx(styles.content)}
                                        ref={wrapperContentPortfolio}
                                    >
                                        {/* <div
                                            className={clsx(
                                                styles.wrapper_nofication
                                            )}
                                            style={{
                                                display:
                                                    showEditorComponent ||
                                                    !showRecovery
                                                        ? "none"
                                                        : "flex",
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
                                                    e.stopPropagation();
                                                    setItems(dataRecovery);
                                                    setHeightContent(
                                                        heightRecovery
                                                    );
                                                    setShowRecovery(false);
                                                }}
                                            >
                                                Yes
                                            </button>
                                        </div> */}
                                        {/* {showEditorComponent === false &&
                                        !showRecovery ? (
                                           
                                        ) : (
                                            ""
                                        )} */}
                                        <Header
                                            widthContent={widthContent}
                                            setShowPreview={setShowPreview}
                                            // heightDefault={heightContent}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            <MenuUntil
                                                state={setWidthMenu}
                                                valueState={widthMenu}
                                            ></MenuUntil>

                                            <div
                                                ref={contentPortfolio}
                                                id={"content_portfolio"}
                                                className={clsx(
                                                    styles.wrapper_template
                                                )}
                                                style={{
                                                    minWidth: "78%",
                                                    transform: `translateX(${transactionContent})`,
                                                    display: "flex",
                                                    // justifyContent: "center",
                                                    backgroundColor: "#ccc",
                                                    position: "relative",
                                                }}
                                            >
                                                <div
                                                    ref={wrapperTemplateContent}
                                                    className={clsx(
                                                        styles.wrapper_template_content
                                                    )}
                                                    id='wrapper_template_content'
                                                >
                                                    {children}
                                                    {!showEditorComponent && (
                                                        <EditorGrid />
                                                    )}
                                                </div>
                                                <EditorComponent
                                                    style={{
                                                        display:
                                                            showEditorComponent
                                                                ? "flex"
                                                                : "none",
                                                        // transform: widthMenu === "0" ? "translateX(-11%)" : "",
                                                    }}
                                                ></EditorComponent>
                                                <div
                                                    className={clsx(
                                                        styles.add_pages
                                                    )}
                                                >
                                                    <IoAddSharp />
                                                    <span>Add page</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Trash
                                        display={showTrash ? "flex" : "none"}
                                        id={"trash"}
                                    ></Trash>
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
                                        // heightTemplate={heightContent}
                                    ></Preview>
                                </div>
                            </ColorRange.Provider>
                        </ElementContentPortfolio.Provider>
                    </ContextShowEditorComponent.Provider>
                </ContextItemsIngrid.Provider>
            </ContextWrapperContent.Provider>
        </>
    );
}

export default CreatePortfolio;
