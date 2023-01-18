import clsx from "clsx";
import { useDrag, useDragDropManager } from "react-dnd";
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
import { IoResizeOutline } from "react-icons/io5";

import "./resizeable.css";
import styles from "./Item.module.scss";
import { TipSuggest } from "~/Components";
import {
    ContextReducer,
    ContextItemsIngrid,
    HeightHeading,
    ContextShowEditorComponent,
    ElementContentPortfolio,
    GridWidth,
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
    itemsDrag,
    numberFooter,
    typeMulti,
}) {
    const [items, setItems] = useContext(ContextItemsIngrid);
    const [value, setValue] = useState(
        valueItem ? valueItem : "Enter text !!!"
    );
    const [linkItemTypeA, setLinkItemTypeA] = useState(href ? href : "");

    const [nameItemLink, setNameItemLink] = useState(
        textValue ? textValue : ""
    );

    const [Type, setType] = useState("div");
    const [linkImg, setLinkImg] = useState(
        src
            ? src
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU"
    );
    const [state, dispatch] = useContext(ContextReducer);
    const [showModal, setShowModal] = useState(href ? false : true);
    //use context get state show and hidden editor component
    const [showEditorComponent, setEditorComponent] = useContext(
        ContextShowEditorComponent
    );
    const elementContentPortfolio = useContext(ElementContentPortfolio);
    const [widthContents, setWidthContents] = useState(width);
    const [heightWrapperReSizeable, setHeightWrapperReSizeable] =
        useState(height);
    const [scrollHeight, setScrollHeight] = useState(0);
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
            [styles.input_file]: type === "img" || type === "backgroundImage",
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
                itemsDrag,
                InfoIcon,
                icon,
                styleDefault,
                src,
                href,
                stylesItem,
                numberFooter,
                typeMulti,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, inGrid, isMulti]
    );

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
                    itemDomReal.style.fontFamily
                        ? itemDomReal.style.fontFamily
                        : ""
                )
            );
            dispatch(
                setBorderRadius(
                    itemDomReal.style.borderRadius
                        ? itemDomReal.style.borderRadius
                        : 0
                )
            );
            dispatch(
                setBorderStyle(
                    itemDomReal.style.borderStyle
                        ? itemDomReal.style.borderStyle
                        : ""
                )
            );
            dispatch(
                setBorderColor(
                    itemDomReal.style.borderColor
                        ? itemDomReal.style.borderColor
                        : ""
                )
            );
            dispatch(
                setFontWeight(
                    itemDomReal.style.fontWeight === "bold" ? true : false
                )
            );
            dispatch(
                setTextAlign(
                    itemDomReal.style.textAlign === "center" ? true : false
                )
            );
            dispatch(
                setBorderSize(
                    itemDomReal.style.borderWidth
                        ? itemDomReal.style.borderWidth
                        : 0
                )
            );
            dispatch(
                setTextTransform(
                    itemDomReal.style.textTransform === "uppercase"
                        ? true
                        : false
                )
            );
            dispatch(
                setLineHeight(
                    itemDomReal.style.lineHeight
                        ? itemDomReal.style.lineHeight
                        : ""
                )
            );
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
        e.preventDefault();
        e.stopPropagation();
        var id;
        if (type === "icon") {
            if (e.target.id) {
                id = e.target.id;
            } else if (e.target.parentElement.id) {
                id = e.target.parentElement.id;
            } else if (e.target.parentElement.parentElement.id) {
                id = e.target.parentElement.parentElement.id;
            }
        } else if (e.target.id) {
            id = e.target.id;
        }
        if (findItem(id)) {
            loadStyleComponentInInitState(findItem(id));
        }
        dispatch(setIdItemSelected(id));
        setEditorComponent(true);
    };

    const propsTypeLink = {
        href: null,
        target: null,
        onClick: null,
        type: "text",
    };

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
        if (type === "img" || type === "backgroundImage") {
            setType(linkImg ? "img" : "input");
            propsTypeLink.type = "file";
        }

        if (icon) {
            setType("div");
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
        if (type === "icon" || type === "background") {
            setType("div");
        }
    }, [linkImg]);
    //change type when have src

    let contentPortfolio, setShowTrash, widthContent;
    //get width wrapper content
    useEffect(() => {
        if (elementContentPortfolio) {
            [contentPortfolio, setShowTrash, widthContent] =
                elementContentPortfolio;
            setScrollHeight(contentPortfolio.current.scrollTop);
        }
    }, [elementContentPortfolio]);
    useLayoutEffect(() => {
        if (elementContentPortfolio && width === "100%") {
            [contentPortfolio, setShowTrash, widthContent] =
                elementContentPortfolio;
            setWidthContents(widthContent ? widthContent : width);
        } else if (elementContentPortfolio) {
            [contentPortfolio, setShowTrash, widthContent] =
                elementContentPortfolio;
            if (width.toString().includes("%")) {
                const widthNumber = parseInt(
                    width.toString().substring(0, width.toString().length - 1)
                );
                if (widthNumber) {
                    setWidthContents(
                        parseInt((widthNumber / 100) * parseInt(widthContent))
                    );
                }
            }
        }
    });
    useEffect(() => {
        // work next
        if (items) {
            items.map((item) => {
                const itemDomReal = document.getElementById(item.id);
                if (itemDomReal) {
                    // item.textValue = itemDomReal.textContent
                    // ? itemDomReal.textContent
                    // : item.value;
                    // item.valueItem = itemDomReal.value
                    //     ? itemDomReal.value
                    //     : itemDomReal.textContent;
                    item.src = itemDomReal.src ? itemDomReal.src : item.src;
                    item.href = itemDomReal.href ? itemDomReal.href : item.href;

                    item.styleDefault.backgroundColor =
                        itemDomReal.style.backgroundColor;
                    item.styleDefault.color = itemDomReal.style.color;
                    item.styleDefault.fontSize = itemDomReal.style.fontSize;
                    item.styleDefault.fontFamily = itemDomReal.style.fontFamily;
                    item.styleDefault.borderRadius =
                        itemDomReal.style.borderRadius;
                    item.styleDefault.borderStyle =
                        itemDomReal.style.borderStyle;
                    item.styleDefault.borderColor =
                        itemDomReal.style.borderColor;
                    item.styleDefault.fontWeight = itemDomReal.style.fontWeight;
                    item.styleDefault.textAlign = itemDomReal.style.textAlign;
                    item.styleDefault.borderWidth =
                        itemDomReal.style.borderWidth;
                    item.styleDefault.textTransform =
                        itemDomReal.style.textTransform;
                    item.styleDefault.lineHeight = itemDomReal.style.lineHeight;
                }
            });
        }
    }, [items]);
    // render item
    const renderItem = () => {
        if (resizable && type !== "icon" && type !== "a" && !isMulti) {
            return (
                <ReactResizableBox
                    width={
                        widthContents
                            ? parseInt(widthContents)
                            : parseInt(width)
                    }
                    height={
                        heightWrapperReSizeable
                            ? parseInt(heightWrapperReSizeable)
                            : parseInt(height)
                    }
                    onClick={handleSelectItemToEdit}
                    style={{
                        ...stylesItem,
                        transform: center ? "translateX(-50%)" : "none",
                        maxWidth: "102%",
                        zIndex:
                            type === "background" || type === "backgroundImage"
                                ? 0
                                : 1,
                    }}
                    onMouseDown={
                        type !== "background" && type !== "backgroundImage"
                            ? handleMouseDown
                            : null
                    }
                    onMouseUp={
                        type !== "background" && type !== "backgroundImage"
                            ? handleMouseUp
                            : null
                    }
                >
                    <Type
                        id={id}
                        ref={drag}
                        onClick={(e) => {
                            if (type !== "input" && type !== "img") {
                                e.preventDefault();
                            }
                            handleSelectItemToEdit(e);
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseOver={handleMouseUp}
                        className={classNamesItem}
                        src={linkImg}
                        value={value}
                        onChange={(e) => {
                            const item = findItem(id);
                            item.valueItem = e.target.value;
                            setValue(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                setValue("Enter text!!");
                            }
                        }}
                        href={linkItemTypeA ? linkItemTypeA : href}
                        target={linkItemTypeA ? "_blank" : null}
                        style={{
                            position: position,
                            ...styleDefault,
                        }}
                        type={
                            (type === "img" || type === "backgroundImage") &&
                            !src
                                ? "file"
                                : "text"
                        }
                        accept={type !== "img" ? null : "image/*"}
                    ></Type>
                </ReactResizableBox>
            );
        } else if (resizable && type !== "icon" && !isMulti) {
            return (
                <ReactResizableBox
                    width={
                        widthContents
                            ? parseInt(widthContents)
                            : parseInt(width)
                    }
                    height={
                        heightWrapperReSizeable
                            ? parseInt(heightWrapperReSizeable)
                            : parseInt(height)
                    }
                    onClick={handleSelectItemToEdit}
                    style={{
                        ...stylesItem,
                        transform: center ? "translateX(-50%)" : "none",
                        maxWidth: "102%",
                        zIndex:
                            type === "background" || type === "backgroundImage"
                                ? 0
                                : 1,
                    }}
                    onMouseDown={
                        type !== "background" && type !== "backgroundImage"
                            ? handleMouseDown
                            : null
                    }
                    onMouseUp={
                        type !== "background" && type !== "backgroundImage"
                            ? handleMouseUp
                            : null
                    }
                >
                    <Type
                        id={id}
                        ref={drag}
                        onClick={(e) => {
                            if (type !== "input" && type !== "img") {
                                e.preventDefault();
                            }
                            handleSelectItemToEdit(e);
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseOver={handleMouseUp}
                        className={classNamesItem}
                        src={linkImg}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        onBlur={(e) => {
                            if (e.target.value === "") {
                                setValue("Enter text!!");
                            }
                        }}
                        href={linkItemTypeA ? linkItemTypeA : href}
                        target={linkItemTypeA ? "_blank" : null}
                        style={{
                            position: position,
                            ...styleDefault,
                        }}
                        type={
                            (type === "img" || type === "backgroundImage") &&
                            !src
                                ? "file"
                                : "text"
                        }
                        accept={type !== "img" ? null : "image/*"}
                    >
                        {nameItemLink ? nameItemLink : null}
                    </Type>
                </ReactResizableBox>
            );
        } else if (
            (icon && isChild === false && !isMulti) ||
            (inGrid === "false" && isChild === false && !isMulti)
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
                >
                    {children}
                </Type>
            );
        } else if (type === "icon" && inGrid && isChild === false && !isMulti) {
            return (
                <ReactResizableBox
                    width={
                        widthContents
                            ? parseInt(widthContents)
                            : parseInt(width)
                    }
                    height={
                        heightWrapperReSizeable
                            ? parseInt(heightWrapperReSizeable)
                            : parseInt(height)
                    }
                    style={{
                        ...stylesItem,
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <a
                        id={id}
                        ref={draggable ? drag : null}
                        onClick={(e) => {
                            handleSelectItemToEdit(e);
                        }}
                        className={classNamesItem}
                        href={linkIcon}
                        style={{
                            ...styleDefault,
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseOver={handleMouseUp}
                    >
                        {InfoIcon ? icons[InfoIcon] : null}
                    </a>
                </ReactResizableBox>
            );
        } else if (isMulti) {
            return (
                <Type
                    ref={drag}
                    src={src}
                    style={{
                        width: "100%",
                        padding: 12,
                        height: 100,
                    }}
                ></Type>
            );
        }
    };
    return <>{renderItem()}</>;
}

export default Item;
