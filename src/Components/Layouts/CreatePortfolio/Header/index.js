import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import { faComputer, faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineClose, AiOutlineBulb } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { BiUndo, BiRedo } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { getDataUserWeb } from "~/Store/util/index";
import { FiDownloadCloud } from "react-icons/fi";
import {
    GrFacebookOption,
    GrInstagram,
    GrGithub,
    GrLinkedin,
    GrYoutube,
} from "react-icons/gr";

import styles from "./Header.module.scss";
import { Button, TipSuggest } from "~/Components";
import { undo, redo, setUndo, setRedo } from "~/Store/reducer/actions";
import {
    ContextReducer,
    ContextItemsIngrid,
    ItemsLocalStore,
} from "~/Store/Context";
import ModalPublic from "./ModalPublic";
import { UserWeb } from "~/Components";

function Header({
    setShowPreview,
    heightDefault,
    widthContent,
    setShowGuide,
    pagesContent,
    dataRecovery,
    showEditorComponent,
    showRecovery,
    setShowRecovery,
    setPagesContent,
}) {
    const [title, setTitle] = useState("Enter title");
    const [state, dispatch] = useContext(ContextReducer);
    const [items, setItems] = useContext(ContextItemsIngrid);
    const [showModalPublic, setShowModalPublic] = useState(false);
    const [showLinkYourWebsite, setShowLinkYourWebsite] = useState(false);
    const dataUserWeb = useContext(ItemsLocalStore);

    const handleDataTitle = (e) => {
        document.title = e.target.value;
        setTitle(e.target.value);
    };

    const handleDataTitleEmpty = (e) => {
        if (e.target.value === "") {
            setTitle("Title is empty");
        }
    };

    const handleDownload = (e) => {
        // document.getElementById("menu_web").style.display = "none";
        // document.getElementById("loading").style.display = "none";
        e.preventDefault();
        // var pageHTML =
        // "<!DOCTYPE html>" + window.document.documentElement.outerHTML;
        const download = document.getElementById("download").innerHTML;
        const head = document.querySelector("head").innerHTML;
        var pageHTML = `<!DOCTYPE html> <html><head>${head}</head><body>${download}</body></html>`;

        const vitri = pageHTML.search("/static/css/main.");
        let newPageHtml;
        if (vitri !== -1 && vitri) {
            newPageHtml = pageHTML.substring(0, vitri);
            const resthtml = pageHTML.substring(
                vitri + "/static/css/main.".length,
                pageHTML.length - vitri
            );

            newPageHtml +=
                `https://${document.location.host.toString()}/static/css/main.` +
                resthtml;
        }
        pageHTML = newPageHtml ? newPageHtml : pageHTML;
        let data = new Blob([pageHTML], { type: "data:attachment/text," });
        let csvURL = URL.createObjectURL(data);
        let tempLink = document.createElement("a");
        tempLink.href = csvURL;
        // tempLink.href = data;
        tempLink.setAttribute("download", `${title}.html`);
        tempLink.click();
    };

    useEffect(() => {
        const handleClick = (e) => {
            setShowRecovery(false);
            localStorage.clear();
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    });
    const handleUndo = () => {
        if (state.stackUndo.length > 0) {
            state.stackRedo.push(structuredClone(items));
            setItems(structuredClone(state.stackUndo.pop()));
        }
    };
    const handleRedo = () => {
        if (state.stackRedo.length > 0) {
            state.stackUndo.push(structuredClone(items));
            setItems(structuredClone(state.stackRedo.pop()));
        }
    };
    const icons = {
        Facebook: <GrFacebookOption />,
        Instagram: <GrInstagram />,
        Github: <GrGithub />,
        Linkedin: <GrLinkedin />,
        Youtube: <GrYoutube />,
    };

    const renderYourLink = (e) => {
        if (dataUserWeb) {
            if (Array.isArray(dataUserWeb)) {
                return dataUserWeb.map((item, index) => {
                    return (
                        <a key={index} href={item.path} target='_blank'>
                            <li>/{item.path}</li>
                        </a>
                    );
                });
            } else {
                return (
                    <a href={dataUserWeb.path} target='_blank'>
                        <li>/{dataUserWeb.path}</li>
                    </a>
                );
            }
        } else {
            return (
                <li
                    style={{
                        textAlign: "center",
                    }}
                >
                    You haven't public your website
                </li>
            );
        }
    };

    return (
        <>
            <div className={clsx(styles.wrapper)} id='header_create'>
                {!showRecovery ? (
                    <>
                        <div className={clsx(styles.wrapper_input)}>
                            <TipSuggest content='Return Home'>
                                <Link to='/'>
                                    <FontAwesomeIcon
                                        className={clsx(styles.icon_home)}
                                        icon={faHomeLg}
                                    ></FontAwesomeIcon>
                                </Link>
                            </TipSuggest>

                            <TipSuggest
                                classNames={clsx(styles.input)}
                                content='Edit'
                            >
                                <input
                                    style={{
                                        color: "#fff",
                                        border: "1px solid #ccc",
                                    }}
                                    value={title}
                                    onChange={handleDataTitle}
                                    onBlur={handleDataTitleEmpty}
                                ></input>
                            </TipSuggest>
                        </div>

                        <div className={clsx(styles.until_options)}>
                            <TipSuggest content='Guide'>
                                <AiOutlineBulb
                                    onClick={(e) => {
                                        setShowGuide(true);
                                    }}
                                    style={{
                                        display: showLinkYourWebsite
                                            ? "none"
                                            : "block",
                                        color: "#fff",
                                        fontSize: 32,
                                    }}
                                ></AiOutlineBulb>
                            </TipSuggest>
                            <div
                                className={clsx(styles.your_website)}
                                onClick={(e) => {
                                    setShowLinkYourWebsite(true);
                                }}
                            >
                                <TipSuggest content='Link your website'>
                                    <CgWebsite
                                        style={{
                                            display: showLinkYourWebsite
                                                ? "none"
                                                : "block",
                                            color: "#fff",
                                        }}
                                    ></CgWebsite>
                                </TipSuggest>

                                <AiOutlineClose
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowLinkYourWebsite(false);
                                    }}
                                    style={{
                                        color: "#fff",
                                        display: showLinkYourWebsite
                                            ? "block"
                                            : "none",
                                    }}
                                ></AiOutlineClose>

                                <div
                                    className={clsx(
                                        styles.wrapper_manager_link
                                    )}
                                    style={{
                                        display: showLinkYourWebsite
                                            ? "block"
                                            : "none",
                                    }}
                                >
                                    {renderYourLink()}
                                </div>
                            </div>
                            {/* <div>
            <TipSuggest content='Undo'>
              <BiUndo
                style={{
                  fontSize: "36px",
                  opacity: state.stackUndo.length > 0 ? 1 : 0.4,
                }}
                onClick={handleUndo}
              ></BiUndo>
            </TipSuggest>

            <TipSuggest content='Redo'>
              <BiRedo
                style={{
                  fontSize: "36px",
                  opacity: state.stackRedo.length > 0 ? 1 : 0.4,
                }}
                onClick={handleRedo}
              ></BiRedo>
            </TipSuggest>
          </div> */}
                            <TipSuggest content='Show preview'>
                                <FontAwesomeIcon
                                    onClick={(e) => {
                                        setShowPreview(true);
                                    }}
                                    style={{
                                        color: "#fff",
                                    }}
                                    icon={faComputer}
                                ></FontAwesomeIcon>
                            </TipSuggest>
                            <TipSuggest content='Download portfolio'>
                                <FiDownloadCloud
                                    style={{
                                        fontSize: "32px",
                                        color: "#fff",
                                    }}
                                    onClick={handleDownload}
                                ></FiDownloadCloud>
                            </TipSuggest>

                            <TipSuggest content='Public'>
                                <Button
                                    primary
                                    className={clsx(styles.button)}
                                    onClick={(e) => {
                                        setShowModalPublic(true);
                                    }}
                                >
                                    Public
                                </Button>
                            </TipSuggest>
                        </div>
                    </>
                ) : (
                    ""
                    // <div
                    //     className={clsx(styles.wrapper_nofication)}
                    //     style={{
                    //         display:
                    //             showEditorComponent || !showRecovery
                    //                 ? "none"
                    //                 : "flex",
                    //         alignItems: "center",
                    //     }}
                    //     onClick={(e) => e.stopPropagation()}
                    // >
                    //     <h1
                    //         style={{
                    //             color: "white",
                    //             fontSize: "32px",
                    //         }}
                    //     >
                    //         Web data recovery
                    //     </h1>
                    //     <button
                    //         className={clsx(styles.button_nofication)}
                    //         onClick={(e) => {
                    //             setShowRecovery(false);
                    //             localStorage.clear();
                    //             localStorage.setItem("showGuided", true);
                    //         }}
                    //     >
                    //         No
                    //     </button>
                    //     <button
                    //         className={clsx(styles.button_nofication)}
                    //         onClick={(e) => {
                    //             e.stopPropagation();
                    //             setItems(dataRecovery.items);
                    //             setPagesContent(dataRecovery.pagesContent);
                    //             setShowRecovery(false);
                    //         }}
                    //     >
                    //         Yes
                    //     </button>
                    // </div>
                )}
            </div>
            <ModalPublic
                pagesContent={pagesContent}
                title={title}
                widthContent={widthContent}
                show={showModalPublic}
                setShowModalPublic={setShowModalPublic}
                heightDefault={heightDefault}
            ></ModalPublic>
        </>
    );
}

export default Header;
