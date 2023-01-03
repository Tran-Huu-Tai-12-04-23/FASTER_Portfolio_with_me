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
}) {
    const [items, setItems] = useContext(ContextItemsIngrid);
    const [value, setValue] = useState("");
    const [showLink, setShowLink] = useState(false);

    const [data, setData] = useState({
        path: "default",
        items: "",
        heightDefault: heightDefault,
        widthContent: widthContent,
    });

    const handleSubmit = (e) => {
        setValue("");
        setShowLink(true);
        const prevPublic = localStorage.getItem("public");
        if (prevPublic) {
            localStorage.removeItem("public");
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
                            fontSize: "16px",
                            marginBottom: "12px",
                        }}
                    >
                        Get to your website:
                    </span>
                    <a
                        onClick={(e) => {
                            setShowModalPublic(false);
                            setShowLink(false);
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
                            handleSubmit();
                        }
                    }}
                    style={{
                        display: !showLink ? "block" : "none",
                    }}
                >
                    <span>Path</span>
                    <input
                        type='text'
                        onChange={(e) => {
                            setData({
                                path: e.target.value,
                                items: items,
                                heightDefault,
                                widthContent,
                            });
                            setValue(e.target.value);
                        }}
                        value={value}
                    ></input>
                    <button
                        onClick={(e) => {
                            handleSubmit();
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
