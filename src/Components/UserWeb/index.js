import { useEffect, useState, useLayoutEffect } from "react";
import clsx from "clsx";
import styles from "./UserWeb.module.scss";
import {
    GrFacebookOption,
    GrInstagram,
    GrGithub,
    GrLinkedin,
    GrYoutube,
} from "react-icons/gr";
import { BsSave } from "react-icons/bs";
import { TipSuggest } from "~/Components";

function UserWeb({
    items = [],
    heightTemplate = 1000,
    widthContent,
    width = "100%",
    height = "100%",
    setShowPreview,
    showPreview,
    children,
    type,
    id,
}) {
    const [data, setData] = useState(items);
    const [showMenu, setShowMenu] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const icons = {
        Facebook: <GrFacebookOption />,
        Instagram: <GrInstagram />,
        Github: <GrGithub />,
        Linkedin: <GrLinkedin />,
        Youtube: <GrYoutube />,
    };

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            setShowMenu(true);
            setLeft(e.pageX);
            setTop(e.pageY);
        };
        const handleClick = (e) => {
            e.preventDefault();
            setShowMenu(false);
        };
        window.addEventListener("click", handleClick);
        window.addEventListener("contextmenu", handleContextMenu);
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    useEffect(() => {
        data.map((item) => {
            if (widthContent && heightTemplate) {
                if (!item.height.toString().includes("%")) {
                    item.height = `${(item.height / heightTemplate) * 100}%`;
                }
                if (!item.width.toString().includes("%")) {
                    item.width = `${(item.width / widthContent) * 100}%`;
                }
                if (!item.top.toString().includes("%")) {
                    item.top = `${(item.top / heightTemplate) * 100}%`;
                }
                if (!item.left.toString().includes("%")) {
                    item.left = `${(item.left / widthContent) * 100}%`;
                }
                if (
                    item.type === "background" ||
                    item.type === "backgroundImage"
                ) {
                    item.width = "100%";
                }
            }
        });
    }, []);
    const handleDownload = (e) => {
        document.getElementById("menu_web").style.display = "none";
        document.getElementById("loading").style.display = "none";
        e.preventDefault();
        var pageHTML =
            "<!DOCTYPE html>" + window.document.documentElement.outerHTML;
        // // console.log(pageHTML);

        console.log(document.location.host);
        const vitri = pageHTML.search("/static/css/main.fbba4472.css");
        let newPageHtml;
        console.log(vitri);
        if (vitri !== -1 && vitri) {
            const length = document.location.host.toString().length;
            newPageHtml = pageHTML.substring(0, vitri);
            const resthtml = pageHTML.substring(
                vitri + length + 1,
                pageHTML.length
            );
            newPageHtml +=
                `${document.location.host.toString()}/static/css/main.fbba4472.css` +
                resthtml;
            console.log(newPageHtml);
        }
        pageHTML = newPageHtml ? newPageHtml : pageHTML;
        let data = new Blob([pageHTML], { type: "data:attachment/text," });
        let csvURL = URL.createObjectURL(data);
        let tempLink = document.createElement("a");
        tempLink.href = csvURL;
        // tempLink.href = data;
        tempLink.setAttribute("download", `new.html`);
        tempLink.click();
    };
    const renderItem = () => {
        if (data) {
            return data.map((item, index) => {
                if (item.type === "img" || item.type === "backgroundImage") {
                    return (
                        <img
                            key={index}
                            src={item.src}
                            style={{
                                width: item.width,
                                height: item.height,
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                ...item.styleDefault,
                                zIndex: item.type === "img" ? 2 : 1,
                                transform: item.center
                                    ? "translateX(-50%)"
                                    : "",
                            }}
                        ></img>
                    );
                } else if (item.type === "input" || item.type === "button") {
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                height: item.height,
                                width: item.width,
                                ...item.styleDefault,
                                zIndex: 2,
                                transform: item.center
                                    ? "translateX(-50%)"
                                    : "",
                                display:
                                    item.type === "button" ? "flex" : "block",
                                justifyContent:
                                    item.type === "button" ? "center" : "",
                                alignItems:
                                    item.type === "button" ? "center" : "",
                            }}
                        >
                            {item.valueItem}
                        </div>
                    );
                } else if (item.type === "div") {
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                height: item.height,
                                width: item.width,
                                transform: item.center
                                    ? "translateX(-50%)"
                                    : "",
                                ...item.styleDefault,
                                zIndex: 1,
                            }}
                        ></div>
                    );
                } else if (item.type === "a") {
                    return (
                        <a
                            key={index}
                            href={item.href}
                            target={"_blank"}
                            style={{
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                height: item.height,
                                width: item.width,
                                ...item.styleDefault,
                                zIndex: 2,
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {item.textValue}
                        </a>
                    );
                } else if (item.type === "icon") {
                    // console.log(item);
                    return (
                        <div
                            className={clsx(styles.icon)}
                            key={index}
                            style={{
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                height: item.height,
                                width: item.width,
                                padding: "0",
                                border: "none",
                                zIndex: 2,
                            }}
                        >
                            <a
                                href={item.href}
                                target={"_blank"}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                    ...item.styleDefault,
                                }}
                            >
                                {item.InfoIcon ? icons[item.InfoIcon] : null}
                            </a>
                        </div>
                    );
                } else if (item.type === "background") {
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: item.top,
                                left: item.left,
                                height: item.height,
                                width: item.width,
                                ...item.styleDefault,
                                padding: "0",
                                border: "none",
                                zIndex: 1,
                            }}
                        ></div>
                    );
                }
            });
        }
    };

    return (
        <div
            className={clsx(styles.wrapper)}
            style={{
                position: "relative",
                height: heightTemplate ? heightTemplate + 500 : 1000,
            }}
        >
            {data && renderItem()}
            <div
                className={styles.menu}
                style={{
                    position: "absolute",
                    display: showMenu ? "flex" : "none",
                    left: left,
                    top: top,
                }}
                id={"menu_web"}
                onClick={handleDownload}
            >
                <BsSave
                    style={{
                        fontSize: 40,
                        color: "#fff",
                    }}
                ></BsSave>
                <h3>Download</h3>
            </div>
        </div>
    );
}
export default UserWeb;
