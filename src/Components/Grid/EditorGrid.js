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

function EditorGrid({ idPage, pages, setPages, style }) {
    const [showSetting, setShowSetting] = useState(false);
    const [items, setItems] = useContext(ContextItemsIngrid);
    const [showEditBackgroundColor, setShowEditBackgroundColor] =
        useState(false);
    const [showEditBackgroundImage, setShowEditBackgroundImage] =
        useState(false);
    const [showChooseOptionsColor, setShowChooseOptionsColor] = useState(false);
    const [offsetModal, setOffsetModal] = useState({ x: 0, y: 0 });
    const [showSelectColor, setShowSelectColor] = useState(false);
    const [showSelectLinearGradient, setShowSelectLinearGradient] =
        useState(false);
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

    useEffect(() => {
        const handleHidden = () => {
            setShowChooseOptionsColor(false);
            setShowSelectColor(false);
            setShowSelectLinearGradient(false);
        };
        window.addEventListener("click", handleHidden);
        return () => {
            window.removeEventListener("click", handleHidden);
        };
    });

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
                newPages.push(page);
                newPages.push({
                    id: id,
                    style: page.style,
                });
            } else {
                newPages.push(page);
            }
        });
        setPages(newPages);
    };
    const handleSetBackgroundColor = () => {
        setShowSelectColor(!showSelectColor);
        var page = findPage();
        page.style.background = valueColor;
        var itemPage = document.getElementById(idPage);
        if (itemPage) {
            itemPage.style.background = valueColor;
        }
    };
    const handleSaveBackgroundGradient = (e) => {
        e.stopPropagation();
        setShowChooseOptionsColor(!showChooseOptionsColor);
        setShowSelectLinearGradient(!showSelectLinearGradient);
        var page = findPage();
        page.style.background =
            backgroundLinearGradient[numberTypeLinearGradient];
        var itemPage = document.getElementById(idPage);
        if (itemPage) {
            itemPage.style.background =
                backgroundLinearGradient[numberTypeLinearGradient];
        }
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
                    onClick={(e) => setNumberTypeLinearGradient(index)}
                ></li>
            );
        });
    };
    const renderModal = () => {
        if (
            showChooseOptionsColor &&
            !showSelectColor &&
            !showSelectLinearGradient
        ) {
            return (
                <div className={clsx(styles.wrapper_options)}>
                    <h5>Choose type</h5>
                    <ul>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowChooseOptionsColor(false);
                                setShowSelectColor(true);
                            }}
                        >
                            Color
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowSelectLinearGradient(
                                    !showSelectLinearGradient
                                );
                            }}
                        >
                            Linear gradient
                        </button>
                    </ul>
                </div>
            );
        } else if (showSelectColor && !showSelectLinearGradient) {
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
                        onChange={(e) => setValueColor(e.target.value)}
                        type='color'
                    ></input>
                    <button
                        className={clsx(styles.button)}
                        onClick={handleSetBackgroundColor}
                    >
                        Save
                    </button>
                </div>
            );
        } else if (showSelectLinearGradient) {
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
                            onChange={(e) =>
                                setValueColorGradient({
                                    color1: e.target.value,
                                    color2: valueColorGradient.color2,
                                })
                            }
                        ></input>
                    </div>
                    <div>
                        <h5>Color 2</h5>
                        <input
                            type='color'
                            value={valueColorGradient.color2}
                            onChange={(e) =>
                                setValueColorGradient({
                                    color1: valueColorGradient.color1,
                                    color2: e.target.value,
                                })
                            }
                        ></input>
                    </div>
                    <button
                        className={clsx(styles.button)}
                        onClick={handleSaveBackgroundGradient}
                    >
                        Save
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
            {/* <div className={clsx(styles.modal_edit_background_color)}>
                <input type='checkbox' />
                <input type='checkbox' />
                <input type='checkbox' />
                <input type='checkbox' />
            </div> */}
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
                        setShowChooseOptionsColor(!showChooseOptionsColor);
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
                <div>
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
                        <TipSuggest content='Set background color'>
                            <FiTrash2 />
                        </TipSuggest>
                    </div>
                )}
            </div>
        </>
    );
}
export default EditorGrid;
