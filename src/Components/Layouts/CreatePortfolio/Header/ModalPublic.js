import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./Header.module.scss";

import { AiFillCloseCircle } from "react-icons/ai";
import { ContextItemsIngrid } from "~/Store/Context";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";

function ModalPublic({
    show,
    setShowModalPublic,
    heightDefault,
    widthContent,
    title,
    pagesContent,
}) {
    const [items, setItems] = useContext(ContextItemsIngrid);
    const [value, setValue] = useState("");
    const [showLink, setShowLink] = useState(false);
    const [enterAgain, setEnterAgain] = useState(false);

    const [data, setData] = useState({
        path: "default",
        items: "",
        heightDefault: heightDefault,
        widthContent: widthContent,
        title: title,
        pagesContent: "",
    });

    const handleSubmit = (e) => {
        setValue("");
        setShowLink(true);
        const prevPublic = localStorage.getItem("public");
        localStorage.removeItem("public");
        if (prevPublic) {
            localStorage.setItem("public", [JSON.stringify(data)]);
        } else {
            localStorage.setItem("public", [JSON.stringify(data)]);
        }
    };

    return (
        <div
            className={clsx(styles.wrapper_modal_public)}
            style={{
                display: show ? "block" : "none",
            }}
        >
            <div className={clsx(styles.wrapper_form_enter_path)}>
                <AiFillCloseCircle
                    onClick={(e) => {
                        setShowModalPublic(false);
                        setShowLink(false);
                    }}
                ></AiFillCloseCircle>
                <div
                    style={{
                        display: showLink ? "block" : "none",
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            setShowLink(false);
                        }
                    }}
                >
                    <span
                        style={{
                            color: "var(--primary)",
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "20px",
                        }}
                    >
                        After visiting the website you can right click to
                        download it right click
                    </span>
                    <span
                        style={{
                            fontSize: "16px",
                            marginBottom: "12px",
                        }}
                    >
                        Click to get your website:
                    </span>
                    <a
                        onClick={(e) => {
                            setShowModalPublic(false);
                            setShowLink(false);
                            setValue("");
                            setEnterAgain(true);
                        }}
                        href={`/${data.path}`}
                        target='_blank'
                        style={{
                            color: "blue",
                            textDecoration: "underline",
                            textAlign: "center",
                            display: "block",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px outset var(--primary)",
                        }}
                    >{`/${data.path}`}</a>
                </div>
                <div
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            if (
                                !data.path.toString().includes("/") &&
                                data.path !== "default"
                            ) {
                                handleSubmit();
                            } else {
                                setEnterAgain(!enterAgain);
                            }
                        }
                    }}
                    style={{
                        display: !showLink ? "block" : "none",
                    }}
                >
                    <span>Path</span>
                    <span
                        style={{
                            fontSize: "10px",
                            color: " var(--primary)",
                            fontWeight: "600",
                            lineHeight: "20px",
                            display: enterAgain ? "block" : "none",
                        }}
                    >
                        Try again...
                    </span>
                    <input
                        type='text'
                        onChange={(e) => {
                            setEnterAgain(false);
                            if (e.target.value != "" && e.target.value) {
                                setData({
                                    path: e.target.value,
                                    items: items,
                                    heightDefault,
                                    widthContent,
                                    title,
                                    pagesContent: pagesContent,
                                });
                            }
                            setValue(e.target.value);
                        }}
                        value={value}
                    ></input>
                    <button
                        onClick={(e) => {
                            if (
                                !data.path.toString().includes("/") &&
                                data.path !== "default"
                            ) {
                                handleSubmit();
                            } else {
                                setEnterAgain(!enterAgain);
                            }
                        }}
                    >
                        Public
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ModalPublic;
