import uuid from "react-uuid";
import { useEffect, useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
    GrFacebookOption,
    GrInstagram,
    GrGithub,
    GrLinkedin,
    GrYoutube,
} from "react-icons/gr";
import { CgDisplayFlex } from "react-icons/cg";
import clsx from "clsx";
import {
    BsCardText,
    BsFileImage,
    BsBoxSeam,
    BsFillMenuButtonWideFill,
} from "react-icons/bs";
import { TfiImage } from "react-icons/tfi";
import { BsImage } from "react-icons/bs";
import {
    AiOutlineAlignLeft,
    AiOutlineLink,
    AiOutlineAppstore,
    AiTwotoneBuild,
} from "react-icons/ai";
import { CgTemplate } from "react-icons/cg";
import { RxComponent1 } from "react-icons/rx";
import { FaIcons, FaRegEdit } from "react-icons/fa";

import styles from "./BoxMenu.module.scss";
import { Item, TipSuggest } from "~/Components";
import {
    ElementContentPortfolio,
    ContextWrapperContent,
    ContextReducer,
    ContextItemsIngrid,
    ContextShowEditorComponent,
} from "~/Store/Context";
import { setType } from "~/Store/reducer/actions";
import Editor from "./Editor";
import Component from "./Component";

function BoxMenu() {
    const icons = [
        {
            Name: "Facebook",
            Component: <GrFacebookOption />,
        },
        {
            Name: "Instagram",
            Component: <GrInstagram />,
        },
        {
            Name: "Github",
            Component: <GrGithub />,
        },
        {
            Name: "Linkedin",
            Component: <GrLinkedin />,
        },
        {
            Name: "Youtube",
            Component: <GrYoutube />,
        },
    ];
    const wrapperContentPortfolio = useContext(ContextWrapperContent);
    const [widthMenu, setWidthMenu] = useState();
    const [contentPortfolio, setShowTrash, widthContent] = useContext(
        ElementContentPortfolio
    );
    const [showEditorComponent, setEditorComponent] = useContext(
        ContextShowEditorComponent
    );
    const [numberEdit, setNumberEdit] = useState(3);
    const navBars = useRef();

    /// resize set width content
    useEffect(() => {
        if (wrapperContentPortfolio.current) {
            setWidthMenu(
                wrapperContentPortfolio.current.offsetWidth * 0.22 + 14
            );
        }
        const handleResize = () => {
            setWidthMenu(
                wrapperContentPortfolio.current.offsetWidth * 0.22 + 14
            );
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    // úe
    useEffect(() => {
        setNumberEdit(showEditorComponent ? 6 : 3);
    }, [showEditorComponent]);

    const renderIcons = () => {
        return icons.map((Icon) => {
            return (
                <Item
                    key={uuid()}
                    resizable={false}
                    draggable='true'
                    className={clsx(styles.item_text)}
                    icon
                    id={uuid()}
                    type='icon'
                    InfoIcon={Icon}
                    widthMenu={widthMenu}
                    widthContentItem={widthContent}
                    styleDefault={{
                        position: "unset",
                        border: "none",
                        backgroundColor: "rgba(0,0,0,.4)",
                        fontSize: "32px",
                        width: "calc(33.33333333% - 24px)",
                        height: "80px",
                        margin: "12px",
                        float: "left",
                    }}
                >
                    {Icon.Component}
                </Item>
            );
        });
    };

    return (
        <>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.wrapper_menu)}>
                    <ul ref={navBars}>
                        <button
                            onClick={(e) => setNumberEdit(1)}
                            style={{
                                backgroundColor:
                                    numberEdit === 1
                                        ? "#242c38"
                                        : "transparent",
                            }}
                        >
                            <CgTemplate />
                            <li>Templates</li>
                        </button>
                        <button
                            style={{
                                backgroundColor:
                                    numberEdit === 2
                                        ? "#242c38"
                                        : "transparent",
                            }}
                            onClick={(e) => setNumberEdit(2)}
                        >
                            <RxComponent1 />
                            <li>Components</li>
                        </button>
                        <button
                            onClick={(e) => setNumberEdit(3)}
                            style={{
                                backgroundColor:
                                    numberEdit === 3
                                        ? "#242c38"
                                        : "transparent",
                            }}
                        >
                            <AiTwotoneBuild />
                            <li>Items</li>
                        </button>
                        <button
                            onClick={(e) => setNumberEdit(4)}
                            style={{
                                backgroundColor:
                                    numberEdit === 4
                                        ? "#242c38"
                                        : "transparent",
                            }}
                        >
                            <FaIcons />
                            <li>Icons</li>
                        </button>
                        <button
                            onClick={(e) => setNumberEdit(5)}
                            style={{
                                backgroundColor:
                                    numberEdit === 5
                                        ? "#242c38"
                                        : "transparent",
                            }}
                        >
                            <AiOutlineAppstore />
                            <li>Stores</li>
                        </button>
                        <button
                            onClick={(e) => setNumberEdit(6)}
                            style={{
                                backgroundColor:
                                    numberEdit === 6
                                        ? "#242c38"
                                        : "transparent",
                            }}
                        >
                            <FaRegEdit />
                            <li>Editor</li>
                        </button>
                    </ul>
                </div>
                <div className={clsx(styles.wrapper_content)}>
                    {numberEdit === 3 && (
                        <>
                            <TipSuggest content='Text' position={"top"}>
                                <Item
                                    resizable={false}
                                    draggable='true'
                                    type='input'
                                    className={clsx(styles.item_text)}
                                    icon
                                    widthMenu={widthMenu}
                                    widthContentItem={widthContent}
                                    styleDefault={{
                                        position: "unset",
                                        backgroundColor: "rgba(0,0,0,.4)",
                                        width: 200,
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        color: "#fff",
                                        marginBottom: "24px",
                                        fontSize: 24,
                                        height: 60,
                                        margin: "12px auto",
                                    }}
                                >
                                    <BsCardText />
                                    <span
                                        style={{
                                            minWidth: " 50%",
                                        }}
                                    >
                                        Text
                                    </span>
                                </Item>
                            </TipSuggest>
                            <TipSuggest
                                content='Link'
                                position={"top"}
                                styles={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Item
                                    resizable={false}
                                    type='a'
                                    draggable='true'
                                    className={clsx(styles.item_link)}
                                    icon
                                    widthMenu={widthMenu}
                                    widthContentItem={widthContent}
                                    styleDefault={{
                                        position: "unset",
                                        backgroundColor: "rgba(0,0,0,.4)",
                                        height: 60,
                                        width: 200,
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        color: "#fff",
                                        fontSize: 24,
                                        margin: "12px auto",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faLink} />
                                    <span
                                        style={{
                                            minWidth: " 50%",
                                        }}
                                    >
                                        Link
                                    </span>
                                </Item>
                            </TipSuggest>
                            <TipSuggest
                                content='Image'
                                position={"top"}
                                width='30%'
                                styles={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Item
                                    resizable={false}
                                    type='img'
                                    draggable='true'
                                    className={clsx(styles.item_img)}
                                    icon
                                    widthMenu={widthMenu}
                                    widthContentItem={widthContent}
                                    styleDefault={{
                                        position: "unset",
                                        backgroundColor: "rgba(0,0,0,.4)",
                                        height: 60,
                                        width: 200,
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        color: "#fff",
                                        fontSize: 24,
                                        marginBottom: "24px",
                                        margin: "12px auto",
                                    }}
                                >
                                    <BsFileImage />
                                    <span
                                        style={{
                                            minWidth: " 50%",
                                        }}
                                    >
                                        Image
                                    </span>
                                </Item>
                            </TipSuggest>
                            <TipSuggest
                                content='Button'
                                position={"top"}
                                styles={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Item
                                    resizable={false}
                                    type='button'
                                    draggable='true'
                                    className={clsx(styles.item_button)}
                                    icon
                                    widthMenu={widthMenu}
                                    widthContentItem={widthContent}
                                    styleDefault={{
                                        position: "unset",
                                        backgroundColor: "rgba(0,0,0,.4)",
                                        height: 60,
                                        width: 200,
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        color: "#fff",
                                        fontSize: 24,
                                        margin: "12px auto",
                                    }}
                                >
                                    <BsFillMenuButtonWideFill />
                                    <span
                                        style={{
                                            minWidth: " 50%",
                                        }}
                                    >
                                        Button
                                    </span>
                                </Item>
                            </TipSuggest>
                            <TipSuggest content='Box'>
                                <Item
                                    resizable={false}
                                    type='div'
                                    draggable='true'
                                    className={clsx(styles.item_button)}
                                    icon
                                    widthMenu={widthMenu}
                                    widthContentItem={widthContent}
                                    styleDefault={{
                                        position: "unset",
                                        backgroundColor: "rgba(0,0,0,.4)",
                                        height: 60,
                                        width: 200,
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        color: "#fff",
                                        fontSize: 24,
                                        margin: "12px auto",
                                    }}
                                >
                                    <BsBoxSeam />
                                    <span
                                        style={{
                                            minWidth: " 50%",
                                        }}
                                    >
                                        Box
                                    </span>
                                </Item>
                            </TipSuggest>
                        </>
                    )}
                    {numberEdit === 4 && <>{renderIcons()}</>}
                    {numberEdit === 6 && <Editor />}
                    {numberEdit === 2 && (
                        <>
                            <Component></Component>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default BoxMenu;
