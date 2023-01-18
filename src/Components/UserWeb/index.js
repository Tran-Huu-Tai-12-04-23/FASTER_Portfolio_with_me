import { useEffect, useState, useLayoutEffect, useRef } from "react";
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
    pagesContent = [],
    heightTemplate = 1000,
    widthContent,
    width = "100%",
    height = "100%",
    setShowPreview,
    showPreview,
    children,
    type,
    id,
    title,
}) {
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
                                    width: widthContent
                                        ? `${
                                              (item.width / widthContent) * 100
                                          }%`
                                        : item.width,
                                    height: `${(item.height / 800) * 100}%`,
                                    position: "absolute",
                                    top: `${(item.top / 1000) * 100}%`,
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
                                    top: `${(item.top / 1000) * 100}%`,
                                    left: item.left,
                                    height: `${(item.height / 800) * 100}%`,
                                    width: widthContent
                                        ? `${
                                              (item.width / widthContent) * 100
                                          }%`
                                        : item.width,
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
                                    top: `${(item.top / 1000) * 100}%`,
                                    left: item.left,
                                    height: `${(item.height / 800) * 100}%`,
                                    width: widthContent
                                        ? `${
                                              (item.width / widthContent) * 100
                                          }%`
                                        : item.width,
                                    transform: item.center
                                        ? "translateX(-50%)"
                                        : "",
                                    ...item.styleDefault,
                                    zIndex: 1,
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
                                    top: `${(item.top / 1000) * 100}%`,
                                    left: item.left,
                                    height: `${(item.height / 800) * 100}%`,
                                    width: widthContent
                                        ? `${
                                              (item.width / widthContent) * 100
                                          }%`
                                        : item.width,
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
                                    top: `${(item.top / 1000) * 100}%`,
                                    left: item.left,
                                    height: `${(item.height / 800) * 100}%`,
                                    width: widthContent
                                        ? `${
                                              (item.width / widthContent) * 100
                                          }%`
                                        : item.width,
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
                                        border: "none",
                                        ...item.styleDefault,
                                    }}
                                >
                                    {item.InfoIcon
                                        ? icons[item.InfoIcon]
                                        : null}
                                </a>
                            </div>
                        );
                    }
                }
            });
        }
    };
    console.log(items);
    const renderPageContent = () => {
        return pagesContent.map((grid, index) => {
            return (
                <div
                    key={index}
                    style={{
                        width: "100%",
                        ...grid.style,
                        height: "1000px",
                        position: "relative",
                    }}
                >
                    {renderItem(grid.id)}
                </div>
            );
        });
    };

    return (
        <div className={clsx(styles.wrapper)}>
            {pagesContent && renderPageContent()}
        </div>
    );
}
export default UserWeb;
