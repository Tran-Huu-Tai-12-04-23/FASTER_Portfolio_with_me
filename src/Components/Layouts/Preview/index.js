import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import styles from "./Preview.module.scss";
import {
    GrFacebookOption,
    GrInstagram,
    GrGithub,
    GrLinkedin,
    GrYoutube,
} from "react-icons/gr";
import { Grid } from "~/Components";

function Preview({
    items,
    heightTemplate = 1000,
    width = "75.5%",
    setShowPreview,
    showPreview,
    children,
    id,
    pagesContent = [],
}) {
    const Preview = useRef();
    const icons = {
        Facebook: <GrFacebookOption />,
        Instagram: <GrInstagram />,
        Github: <GrGithub />,
        Linkedin: <GrLinkedin />,
        Youtube: <GrYoutube />,
    };
    const renderItem = (id) => {
        if (items) {
            return items.map((item, index) => {
                if (item.idGrid === id) {
                    if (
                        item.type === "img" ||
                        item.type === "backgroundImage"
                    ) {
                        return (
                            <img
                                key={index}
                                src={item.linkImage ? item.linkImage : item.src}
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
                                    overflow: "hidden",
                                }}
                            ></img>
                        );
                    } else if (
                        item.type === "input" ||
                        item.type === "button"
                    ) {
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
                                        item.type === "button"
                                            ? "flex"
                                            : "block",
                                    justifyContent:
                                        item.type === "button" ? "center" : "",
                                    alignItems:
                                        item.type === "button" ? "center" : "",
                                    overflow: "hidden",
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
                                    zIndex: 2,
                                    overflow: "hidden",
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
                                    overflow: "hidden",
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
                                    // ...item.styleDefault,
                                    padding: "0",
                                    border: "none",
                                    zIndex: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <a
                                    href={item.href}
                                    target={"_blank"}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        ...item.styleDefault,
                                    }}
                                >
                                    {item.InfoIcon
                                        ? icons[item.InfoIcon]
                                        : null}
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
                                    overflow: "hidden",
                                }}
                            ></div>
                        );
                    }
                }
            });
        }
    };
    const renderPageContent = () => {
        return pagesContent.map((grid, index) => {
            return (
                <div
                    key={index}
                    style={{
                        width: "100%",
                        ...grid.style,
                        height: "70vh",
                        position: "relative",
                    }}
                >
                    {renderItem(grid.id)}
                </div>
            );
        });
    };
    return (
        <div
            className={clsx(styles.wrapper)}
            style={{
                height: `${70 * pagesContent.length + 20}vh`,
            }}
            ref={Preview}
        >
            <AiOutlineClose
                className={clsx(styles.icon_close)}
                onClick={(e) => {
                    setShowPreview(false);
                }}
            ></AiOutlineClose>

            <div
                className={clsx(styles.wrapper_template)}
                style={{
                    width: width,
                }}
            >
                {/* {items && renderItem()} */}
                {pagesContent && renderPageContent()}
            </div>
        </div>
    );
}
export default Preview;
