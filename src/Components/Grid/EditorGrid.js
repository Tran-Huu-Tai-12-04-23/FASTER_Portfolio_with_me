import clsx from "clsx";
import uuid from "react-uuid";
import { useState, useContext, useEffect } from "react";
import styles from "./Grid.module.scss";
import { FiTrash2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { TipSuggest } from "~/Components";
import { AiOutlineBgColors, AiTwotoneSetting } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ContextItemsIngrid } from "~/Store/Context";
import { setType } from "~/Store/reducer/actions";

function EditorGrid({ idPage, pages, setPages, style }) {
    const [showSetting, setShowSetting] = useState(false);
    const [items, setItems] = useContext(ContextItemsIngrid);
    const [showChooseOptionsColor, setShowChooseOptionsColor] = useState(false);
    const [offsetModal, setOffsetModal] = useState({ x: 0, y: 0 });
    const [valueColor, setValueColor] = useState(
        style && style.backgroundColor ? style.backgroundColor : "#ffffff"
    );
    const [numberTypeLinearGradient, setNumberTypeLinearGradient] = useState(0);
    const [valueColorGradient, setValueColorGradient] = useState({
        color1: "#43756f",
        color2: "#4f398e",
    });
    const backgroundLinearGradient = [
        `radial-gradient(circle, ${valueColorGradient.color1} 0%, ${valueColorGradient.color2}  100%)`,
        `linear-gradient(90deg, ${valueColorGradient.color1} 12%, ${valueColorGradient.color1} 22%, ${valueColorGradient.color2} 100%)`,
        `linear-gradient(18deg, ${valueColorGradient.color1} 38%, ${valueColorGradient.color1} 44%, ${valueColorGradient.color2} 100%)`,
        `linear-gradient(0deg, ${valueColorGradient.color1}  44%, ${valueColorGradient.color2} 84%)`,
        `radial-gradient(circle, ${valueColorGradient.color1} 0%, ${valueColorGradient.color1} 18%, ${valueColorGradient.color2} 69%)`,
    ];
    const [linkBackgroundImage, setLinkBackgroundImage] = useState("");
    const [typeEdit, setTypeEdit] = useState("");

    useEffect(() => {
        const handleHidden = () => {
            setTypeEdit("");
        };
        window.addEventListener("click", handleHidden);
        return () => {
            window.removeEventListener("click", handleHidden);
        };
    });

    useEffect(() => {
        if (linkBackgroundImage) {
            handleSaveLinkBackground();
        }
    }, [linkBackgroundImage]);

    const findPage = () => {
        var page;
        pages.map((p) => {
            if (p.id === idPage) {
                page = p;
            }
        });
        return page;
    };
    const handleRemove = () => {
        setItems(
            items.filter((item) => {
                return item.idGrid != idPage;
            })
        );
        setPages(pages.filter((page) => page.id != idPage));
    };
    const handleAddPages = () => {
        setPages((prev) => {
            return [
                ...prev,
                {
                    id: uuid(),
                    style: {},
                },
            ];
        });
    };
    const handleCopy = () => {
        var id = uuid();
        items.map((item) => {
            if (item.idGrid === idPage) {
                var newIt = structuredClone(item);
                newIt.idGrid = id;
                newIt.id = uuid();
                items.push(newIt);
            }
        });
        var index = 0;
        var page = findPage();
        var newPages = [];
        pages.map((page, index) => {
            if (page.id === idPage) {
                newPages.push(structuredClone(page));
                newPages.push({
                    id: id,
                    style: page.style,
                });
            } else {
                newPages.push(structuredClone(page));
            }
        });
        setPages(newPages);
    };
    const handleSetBackgroundColor = (color) => {
        setValueColor(color);
        var page = findPage();
        page.style.background = color;
        var itemPage = document.getElementById(idPage);
        if (itemPage) {
            itemPage.style.background = color;
        }
    };
    const handleSaveBackgroundGradient = (color1, color2, e) => {
        e.stopPropagation();
        setValueColorGradient({
            color1: color1,
            color2: color2,
        });
        setShowChooseOptionsColor(!showChooseOptionsColor);
        var page = findPage();
        page.style.background =
            backgroundLinearGradient[numberTypeLinearGradient];
        var itemPage = document.getElementById(idPage);
        if (itemPage) {
            itemPage.style.background =
                backgroundLinearGradient[numberTypeLinearGradient];
        }
    };
    const handleSaveLinkBackground = () => {
        var page = findPage();
        page.style.background = `url("${linkBackgroundImage}") no-repeat`;
        page.style.backgroundSize = `cover`;
        var itemPage = document.getElementById(idPage);
        if (itemPage) {
            itemPage.style.background = `url("${linkBackgroundImage}") no-repeat`;
            itemPage.style.backgroundSize = `cover`;
        }
    };
    const handleShowInputImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (reader.readyState === 2) {
                if (reader.result) {
                    setLinkBackgroundImage(reader.result);
                }
            }
        };
        setTypeEdit("");
    };

    const renderOptionBackgroundLinearGradient = () => {
        return backgroundLinearGradient.map((background, index) => {
            return (
                <li
                    key={uuid()}
                    style={{
                        width: 30,
                        height: 30,
                        background: background,
                        border:
                            numberTypeLinearGradient === index
                                ? "2px solid #ccc"
                                : "none",
                    }}
                    onClick={(e) => {
                        setNumberTypeLinearGradient(index);
                        var page = findPage();
                        page.style.background = backgroundLinearGradient[index];
                        var itemPage = document.getElementById(idPage);
                        if (itemPage) {
                            itemPage.style.background =
                                backgroundLinearGradient[index];
                            setLinkBackgroundImage("");
                        }
                    }}
                ></li>
            );
        });
    };
    const renderModal = () => {
        if (typeEdit === "showChooseOptionsColor") {
            return (
                <div className={clsx(styles.wrapper_options)}>
                    <h5>Choose type</h5>
                    <button
                        className={clsx(styles.button_options)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setTypeEdit("showSelectColor");
                        }}
                    >
                        Color
                    </button>
                    <button
                        className={clsx(styles.button_options)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setTypeEdit("showSelectLinearGradient");
                        }}
                    >
                        Linear gradient
                    </button>
                </div>
            );
        } else if (typeEdit === "showSelectColor") {
            return (
                <div
                    className={clsx(styles.select_color)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <h5>Select</h5>
                    <input
                        value={valueColor}
                        onChange={(e) => {
                            handleSetBackgroundColor(e.target.value);
                        }}
                        type='color'
                    ></input>
                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            setTypeEdit("");
                            setLinkBackgroundImage("");
                        }}
                    >
                        Save
                    </button>
                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            handleSetBackgroundColor("#ffffff");
                            setTypeEdit("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
            );
        } else if (typeEdit === "showSelectLinearGradient") {
            return (
                <div
                    className={clsx(styles.wrapper_color_gradient)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h5>Choose style</h5>
                    <ul>{renderOptionBackgroundLinearGradient()}</ul>
                    <div>
                        <h5>Color 1</h5>
                        <input
                            type='color'
                            value={valueColorGradient.color1}
                            onChange={(e) => {
                                handleSaveBackgroundGradient(
                                    e.target.value,
                                    valueColorGradient.color2,
                                    e
                                );
                            }}
                        ></input>
                    </div>
                    <div>
                        <h5>Color 2</h5>
                        <input
                            type='color'
                            value={valueColorGradient.color2}
                            onChange={(e) => {
                                handleSaveBackgroundGradient(
                                    valueColorGradient.color1,
                                    e.target.value,
                                    e
                                );
                            }}
                        ></input>
                    </div>
                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            setTypeEdit("");
                            setLinkBackgroundImage("");
                        }}
                    >
                        Save
                    </button>
                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            var page = findPage();
                            page.style.background = "#ffffff";
                            var itemPage = document.getElementById(idPage);
                            if (itemPage) {
                                itemPage.style.background = "#ffffff";
                            }
                            setTypeEdit("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
            );
        } else if (typeEdit === "showSelectBackgroundImage") {
            return (
                <div
                    className={clsx(styles.wrapper_options)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h5>Choose Options</h5>
                    <button
                        className={clsx(styles.button_options)}
                        onClick={(e) => setTypeEdit("showSelectFile")}
                    >
                        Select file
                    </button>
                    <button
                        className={clsx(styles.button_options)}
                        onClick={(e) => setTypeEdit("showSelectUrl")}
                    >
                        Url
                    </button>
                </div>
            );
        } else if (typeEdit === "showSelectFile") {
            return (
                <div
                    className={clsx(styles.wrapper_select_file)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <input
                        className={clsx(styles.input_file)}
                        type='file'
                        onChange={(e) => {
                            handleShowInputImg(e);
                        }}
                        onClick={(e) => {
                            e.target.value = null;
                        }}
                        accept={"image/*"}
                    ></input>
                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            setTypeEdit("");
                        }}
                        style={{
                            // display: showChooseLinkImage ? "block" : "none",
                            maxWidth: "50%",
                            height: "40px",
                            borderRadius: "4px",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            );
        } else if (typeEdit === "showSelectUrl") {
            return (
                <div
                    className={clsx(styles.wrapper_select_file)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <input
                        value={linkBackgroundImage}
                        type='url'
                        placeholder='Url...'
                        onChange={(e) => setLinkBackgroundImage(e.target.value)}
                        style={{
                            padding: "12px",
                        }}
                    ></input>

                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            setTypeEdit("");
                        }}
                        style={{
                            // display: showChooseLinkImage ? "block" : "none",
                            maxWidth: "50%",
                            height: "40px",
                            borderRadius: "4px",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className={clsx(styles.button)}
                        onClick={(e) => {
                            handleSaveLinkBackground();
                            setTypeEdit("");
                        }}
                        style={{
                            // display: showChooseLinkImage ? "block" : "none",
                            maxWidth: "50%",
                            height: "40px",
                            borderRadius: "4px",
                        }}
                    >
                        save
                    </button>
                </div>
            );
        }
    };

    return (
        <>
            <div
                className={clsx(styles.modal)}
                style={{
                    top: offsetModal.y,
                    right: offsetModal.x,
                }}
            >
                {renderModal()}
            </div>

            <div className={clsx(styles.modal_edit_background_image)}></div>
            <div
                className={clsx(styles.icon_setting)}
                style={{
                    display: !showSetting ? "flex" : "none",
                }}
            >
                <div onClick={(e) => setShowSetting(!showSetting)}>
                    <TipSuggest content='Setting'>
                        <AiTwotoneSetting />
                    </TipSuggest>
                </div>
            </div>
            <div
                className={clsx(styles.editor)}
                style={{
                    display: showSetting ? "flex" : "none",
                }}
            >
                <div onClick={(e) => setShowSetting(!showSetting)}>
                    <TipSuggest content='Close'>
                        <MdKeyboardArrowRight
                            style={{
                                margin: "0",
                            }}
                        />
                    </TipSuggest>
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setTypeEdit("showChooseOptionsColor");
                        setOffsetModal({
                            x: "20%",
                            y: "40px",
                        });
                    }}
                >
                    <TipSuggest content='Set background color'>
                        <AiOutlineBgColors />
                    </TipSuggest>
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        e.stopPropagation();
                        setOffsetModal({
                            x: "10%",
                            y: "40px",
                        });
                        setTypeEdit("showSelectBackgroundImage");
                    }}
                >
                    <TipSuggest content='Set Image'>
                        <BiImageAdd />
                    </TipSuggest>
                </div>
                <div onClick={handleCopy}>
                    <TipSuggest content='Copy page'>
                        <FiCopy />
                    </TipSuggest>
                </div>
                <div onClick={handleAddPages}>
                    <TipSuggest content='Add page'>
                        <BiAddToQueue />
                    </TipSuggest>
                </div>
                {pages.length > 1 && (
                    <div onClick={handleRemove}>
                        <TipSuggest content='Delete page'>
                            <FiTrash2 />
                        </TipSuggest>
                    </div>
                )}
            </div>
        </>
    );
}
export default EditorGrid;
