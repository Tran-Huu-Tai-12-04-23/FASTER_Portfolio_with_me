import styles from "./BoxMenu.module.scss";
import clsx from "clsx";
import { useState, useEffect, useContext } from "react";
import {
    ContextShowEditorComponent,
    ContextReducer,
    ContextItemsIngrid,
    ContextWrapperContent,
} from "~/Store/Context";

import { IoIosAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";

function Editor() {
    const [state, dispatch] = useContext(ContextReducer);
    const [items, setItems] = useContext(ContextItemsIngrid);
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
    const [showOption, setShowOptions] = useState(true);
    const [showEditorComponent, setEditorComponent] = useContext(
        ContextShowEditorComponent
    );

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
                const leftIt = item.left
                    .toString()
                    .substring(0, item.left.length - 1);
                setLeftItem(Math.round(leftIt));
            } else {
                setLeftItem(item.left);
            }
            if (!item.width.toString().includes("%")) {
                setWidthItem(item.width);
            }

            setUrlItem(
                item.src ===
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU"
                    ? ""
                    : item.src
            );
            setTypeImage(item.src ? "image" : "choose");
            setHrefItem(item.href ? item.href : "");
            if (item.textValue || item.valueItem) {
                setNameLinkItem(
                    item.textValue
                        ? item.textValue
                        : item.valueItem
                        ? item.valueItem
                        : ""
                );
            }
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
    const handleShowInputImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        const itemSelect = findItem(state.id_item_selected);
        reader.onload = () => {
            if (reader.readyState === 2 && itemSelect) {
                itemSelect.linkImage = reader.result;
                // const data = window.URL.createObjectURL(
                //     dataURItoBlob(reader.result)
                // );
                // console.log(data);
            }
        };
        const url2 = URL.createObjectURL(e.target.files[0]);

        if (url2) {
            setLinkImage(url2);
            setUrlItem(url2);
        }

        setShowChooseLinkImage(true);
        setTypeImage("image");
        setShowEditUrl(true);
        setShowOptions(false);
    };
    // load style change
    //height - load height
    useEffect(() => {
        if (heightItem) {
            const item = findItem(state.id_item_selected);
            const itemReal = document.getElementById(state.id_item_selected);
            if (item) {
                item.height = heightItem;
            }
            if (itemReal) {
                itemReal.parentElement.style.height = heightItem + "px";
            }
        }
    }, [heightItem]);
    // width load width
    useEffect(() => {
        if (widthItem) {
            const item = findItem(state.id_item_selected);
            const itemDomReal = document.getElementById(state.id_item_selected);
            if (itemDomReal) {
                itemDomReal.parentElement.style.width = widthItem + "px";
            }
            if (item) {
                if (!item.width.toString().includes("%")) {
                    item.width = parseInt(widthItem);
                }
            }
        }
    }, [widthItem]);
    //top load
    useEffect(() => {
        if (topItem) {
            const item = findItem(state.id_item_selected);
            const itemDomReal = document.getElementById(state.id_item_selected);
            if (item) {
                item.top = parseInt(topItem);
            }
            if (itemDomReal) {
                itemDomReal.parentElement.style.top = topItem + "px";
            }
        }
    }, [topItem]);

    // left load
    useEffect(() => {
        if (leftItem) {
            const item = findItem(state.id_item_selected);
            const itemDomReal = document.getElementById(state.id_item_selected);
            if (item) {
                if (item.left.toString().includes("%")) {
                    item.left = `${leftItem}%`;
                } else {
                    item.left = parseInt(leftItem);
                }
            }
            if (itemDomReal) {
                itemDomReal.parentElement.style.left = leftItem + "%";
            }
        }
    }, [leftItem]);

    const handleChangeUrlItem = (e) => {
        const item = findItem(state.id_item_selected);
        const itemReal = document.getElementById(state.id_item_selected);
        if (item) {
            item.src = urlItem;
            if (!urlItem.toString().includes("blob")) {
                item.linkImage = urlItem;
            }
        }
        if (itemReal) {
            itemReal.src = urlItem;
            // itemReal.replaceTag("img");
        }
        setShowEditUrl(false);
        setTypeImage("image");
    };
    const handleSaveLinkImage = (e) => {
        const item = findItem(state.id_item_selected);
        const itemReal = document.getElementById(state.id_item_selected);
        if (item) {
            item.src = linkImage;
        }
        if (itemReal) {
            itemReal.src = linkImage;
        }
        setShowChooseLinkImage(false);
        setTypeImage("image");
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

    return (
        <div
            className={clsx(styles.wrapper_edit)}
            style={{
                display: showEditorComponent ? "flex" : "none",
            }}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className={clsx(styles.wrapper_control_edit)}>
                <h5>Height:</h5>
                <div className={clsx(styles.control_input)}>
                    <AiOutlineMinus
                        onClick={(e) => {
                            setHeightItem((prev) => {
                                if (prev >= 0) {
                                    return parseInt(prev) - 1;
                                } else {
                                    return parseInt(prev);
                                }
                            });
                        }}
                    />
                    <input
                        type='number'
                        placeholder='Height..'
                        value={heightItem}
                        onChange={(e) => {
                            if (e.target.value > -1) {
                                setHeightItem(e.target.value);
                            } else {
                                setHeightItem(e.target.value);
                            }
                        }}
                    ></input>
                    <IoIosAdd
                        onClick={(e) => {
                            setHeightItem((prev) => {
                                return parseInt(prev) + 1;
                            });
                        }}
                    />
                </div>
            </div>
            <div
                className={clsx(styles.wrapper_control_edit)}
                style={{
                    display:
                        typeItemSelected === "background" ||
                        typeItemSelected === "backgroundImage"
                            ? "none"
                            : "flex",
                }}
            >
                <h5>Width:</h5>
                <div className={clsx(styles.control_input)}>
                    <AiOutlineMinus
                        onClick={(e) => {
                            setWidthItem((prev) => {
                                if (prev >= 0) {
                                    return parseInt(prev) - 1;
                                } else {
                                    return parseInt(prev);
                                }
                            });
                        }}
                    />
                    <input
                        value={widthItem}
                        onChange={(e) => {
                            if (e.target.value > -1) {
                                setWidthItem(e.target.value);
                            } else {
                                setWidthItem(0);
                            }
                        }}
                        type='number'
                        placeholder='Width..'
                    ></input>
                    <IoIosAdd
                        onClick={(e) => {
                            setWidthItem((prev) => {
                                return parseInt(prev) + 1;
                            });
                        }}
                    />
                </div>
            </div>
            <div className={clsx(styles.wrapper_control_edit)}>
                <h5>Top:</h5>
                <div className={clsx(styles.control_input)}>
                    <AiOutlineMinus
                        onClick={(e) => {
                            setTopItem((prev) => {
                                if (prev >= 0) {
                                    return parseInt(prev) - 1;
                                } else {
                                    return parseInt(prev);
                                }
                            });
                        }}
                    />
                    <input
                        value={topItem}
                        onChange={(e) => {
                            if (e.target.value > -1) {
                                setTopItem(e.target.value);
                            } else {
                                setTopItem(0);
                            }
                        }}
                        type='number'
                        placeholder='Top..'
                    ></input>
                    <IoIosAdd
                        onClick={(e) => {
                            setTopItem((prev) => {
                                return parseInt(prev) + 1;
                            });
                        }}
                    />
                </div>
            </div>
            <div className={clsx(styles.wrapper_control_edit)}>
                <h5>Left:</h5>
                <div className={clsx(styles.control_input)}>
                    <AiOutlineMinus
                        onClick={(e) => {
                            setLeftItem((prev) => {
                                if (prev >= 0) {
                                    return parseInt(prev) - 1;
                                } else {
                                    return parseInt(prev);
                                }
                            });
                        }}
                    />
                    <input
                        value={leftItem}
                        onChange={(e) => {
                            if (e.target.value > -1) {
                                setLeftItem(e.target.value);
                            } else {
                                setLeftItem(0);
                            }
                        }}
                        type='number'
                        placeholder='Left..'
                    ></input>
                    <IoIosAdd
                        onClick={(e) => {
                            setLeftItem((prev) => {
                                return parseInt(prev) + 1;
                            });
                        }}
                    />
                </div>
            </div>

            <div
                className={clsx(styles.wrapper_control_edit)}
                style={{
                    display: typeItemSelected === "img" ? "flex" : "none",
                }}
            >
                <h5>Select:</h5>
                <select
                    className={clsx(styles.control_select)}
                    onChange={(e) => {
                        setTypeImage(e.target.value);
                    }}
                    value={typeImage}
                >
                    <option value={"choose"}>Choose file</option>
                    <option value={"image"}>Link Image</option>
                </select>
            </div>
            <div
                className={clsx(styles.wrapper_control_edit)}
                style={{
                    display:
                        typeItemSelected === "img" && typeImage === "image"
                            ? "flex"
                            : "none",
                }}
            >
                <h5>Url:</h5>
                <input
                    type='url'
                    style={{
                        textAlign: "center",
                        height: "30px",
                        outline: "none",
                        borderRadius: "4px",
                        width: "50%",
                    }}
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
                        width: "100%",
                        height: "30px",
                        borderRadius: "4px",
                    }}
                >
                    Save
                </button>
            </div>
            <div
                className={clsx(styles.wrapper_control_edit)}
                style={{
                    display:
                        (typeItemSelected === "backgroundImage" &&
                            typeImage === "choose") ||
                        (typeItemSelected === "img" && typeImage === "choose")
                            ? "flex"
                            : "none",
                }}
            >
                <input
                    className={clsx(styles.input_file)}
                    type='file'
                    style={{}}
                    onInput={handleShowInputImg}
                    onClick={(e) => {
                        e.target.value = null;
                    }}
                    accept={"image/*"}
                ></input>
                <button
                    className={clsx(styles.button)}
                    onClick={handleSaveLinkImage}
                    style={{
                        display: showChooseLinkImage ? "block" : "none",
                        maxWidth: "50%",
                        height: "30px",
                        borderRadius: "4px",
                    }}
                >
                    Save
                </button>
            </div>
            <div
                className={clsx(styles.wrapper_control_edit)}
                style={{
                    display: typeItemSelected === "a" ? "flex" : "none",
                }}
            >
                <h5>Name Link:</h5>
                <input
                    type='text'
                    style={{
                        width: "50%",
                        height: "30px",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "0 12px",
                    }}
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
                        width: "100%",
                        height: "30px",
                        borderRadius: "4px",
                    }}
                >
                    Save
                </button>
            </div>
            <div
                className={clsx(styles.wrapper_control_edit)}
                style={{
                    display:
                        typeItemSelected === "a" || typeItemSelected === "icon"
                            ? "flex"
                            : "none",
                }}
            >
                <h5 style={{}}>Href:</h5>
                <input
                    type='url'
                    style={{
                        width: "50%",
                        height: "30px",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "0 12px",
                    }}
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
                        width: "100%",
                        height: "30px",
                        borderRadius: "4px",
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
export default Editor;
