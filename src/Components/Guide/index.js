import uuid from "react-uuid";
import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Guide.module.scss";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineDrag,
} from "react-icons/ai";
import { BsFillSkipForwardFill } from "react-icons/bs";
import { TipSuggest } from "~/Components";

function Guide({ showGuide, setShowGuide }) {
    const [step, setStep] = useState(0);
    const steps = [0, 1, 2, 3, 4, 5, 6];
    const positions = [
        {
            x: "0%",
            y: "40%",
        },
        {
            x: "22%",
            y: "20%",
        },
        {
            x: "43%",
            y: "60%",
        },
        {
            x: "55%",
            y: "4%",
        },
        {
            x: "43%",
            y: "8%",
        },
        {
            x: "55%",
            y: "8%",
        },
        {
            x: "60%",
            y: "8%",
        },
    ];
    const styleStep = [
        {
            top: "50%",
            left: "50%",
            transform: "translateY(-50%)",
        },
        {
            backgroundColor: "transparent",
            border: "4px solid #fff",
            top: "0%",
            left: "0%",
            height: "calc(100%)",
            height: "96%",
            transform: " translateY(50px)",
            top: "0%",
            width: "23%",
        },
        {
            top: "88%",
            left: "43%",
            backgroundColor: "transparent",
            border: "4px solid #fff",
            height: "10%",
        },
        {
            top: "10%",
            left: "90%",
            backgroundColor: "transparent",
            border: "4px solid #fff",
            height: "10%",
            width: "8%",
        },
        {
            top: "1%",
            left: "0%",
            backgroundColor: "transparent",
            border: "4px solid #fff",
            height: "60px",
            width: "100%",
        },
        {
            top: "0%",
            left: "73%",
            backgroundColor: "transparent",
            border: "4px solid #fff",
            height: "60px",
            width: "6%",
        },
        {
            top: "0%",
            left: "82%",
            backgroundColor: "transparent",
            border: "4px solid #fff",
            height: "60px",
            width: "10%",
        },
    ];
    const contents = [
        "The main edit page for your portfolio. Drag the desired items to design here.",
        "Components to drag onto the page to design your portfolio site. Drag them in.",
        "Click here to add a new page for your portfolio.",
        "Click here to display the settings for the page",
        "The header contains the necessary functions",
        "Click here to see the preview.",
        "Click here to publish your site online.",
    ];

    const handleSaveShowedGuide = () => {
        localStorage.setItem("showGuided", true);
    };

    useEffect(() => {
        const item = document.getElementById("menu_item");
        const header = document.getElementById("header_create");
        if (item) {
            item.style.zIndex = "unset";
            header.style.zIndex = "unset";
        }
        if (step === 1 && item) {
            item.style.zIndex = "10000000000";
        } else if (step === 4 && header) {
            console.log(header);
            header.style.zIndex = "10000000000";
        }
    }, [step]);

    const renderStep = () => {
        return steps.map((number) => {
            return (
                <div
                    key={number}
                    className={clsx(styles.statusStep)}
                    style={{
                        filter: number === step ? "brightness(200%)" : "",
                        border: "1px solid #000",
                    }}
                ></div>
            );
        });
    };

    return (
        <div
            className={styles.wrapper}
            style={{
                display: showGuide ? "block" : "none",
            }}
        >
            <div
                className={clsx(styles.guide)}
                style={{
                    ...styleStep[step],
                }}
            >
                <h1
                    style={{
                        fontSize: "32px",
                        margin: "12px",
                        display: step === 0 ? "block" : "none",
                    }}
                >
                    Drag here
                </h1>
                <AiOutlineDrag
                    style={{
                        display: step === 0 ? "block" : "none",
                    }}
                />
            </div>
            <div
                className={clsx(styles.content)}
                style={{
                    top: positions[step] ? positions[step].y : 0,
                    left: positions[step] ? positions[step].x : 0,
                }}
            >
                <AiOutlineArrowLeft
                    className={clsx(styles.icon)}
                    onClick={(e) => {
                        setStep(step - 1);
                    }}
                    style={{
                        display: step === 0 ? "none" : "block",
                    }}
                />

                <div className={clsx(styles.proper)}>
                    <h1
                        style={{
                            color: "#000",
                            fontWeight: "bold",
                            marginTop: "24px",
                            textTransform: "uppercase",
                            fontSize: "24px",
                            textAlign: "center",
                        }}
                    >
                        Step {step + 1}/{steps.length}
                    </h1>
                    <p
                        style={{
                            color: "#000",
                            fontSize: "18px",
                            marginTop: "24px",
                            textAlign: "center",
                            lineHeight: "28px",
                        }}
                    >
                        {contents[step]}
                    </p>
                    <div className={clsx(styles.wrapper_step)}>
                        {renderStep()}
                    </div>
                    <div
                        className={clsx(styles.icon_skip)}
                        onClick={(e) => {
                            handleSaveShowedGuide();
                            setStep(0);
                            setShowGuide(false);
                        }}
                    >
                        <BsFillSkipForwardFill></BsFillSkipForwardFill>
                        <span
                            style={{
                                fontSize: "18px",
                            }}
                        >
                            skip
                        </span>
                    </div>
                </div>

                <AiOutlineArrowRight
                    className={clsx(styles.icon)}
                    onClick={(e) => {
                        if (step < 6) {
                            setStep(step + 1);
                        } else {
                            setShowGuide(false);
                            setStep(0);
                            handleSaveShowedGuide();
                        }
                    }}
                />
            </div>
        </div>
    );
}
export default Guide;
