import uuid from "react-uuid";
import { useState } from "react";
import clsx from "clsx";
import styles from "./Guide.module.scss";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineDrag,
} from "react-icons/ai";

function Guide() {
    const [showGuide, setShowGuide] = useState(true);
    const [step, setStep] = useState(0);
    const steps = [0, 1, 2, 3, 4, 5];
    const positions = [
        {
            x: "0%",
            y: "40%",
        },
        {
            x: "20%",
            y: "20%",
        },
        {
            x: "60%",
            y: "20%",
        },
        {
            x: "30%",
            y: "20%",
        },
        {
            x: "10%",
            y: "20%",
        },
    ];
    const contents = [
        "The main edit page for your portfolio. Drag the desired items to design here",
        "The main edit page for your portfolio. Drag the desired items to design here",
        "The main edit page for your portfolio. Drag the desired items to design here",
        "The main edit page for your portfolio. Drag the desired items to design here",
        "The main edit page for your portfolio. Drag the desired items to design here",
        "The main edit page for your portfolio. Drag the desired items to design here",
    ];

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
                        Step {step + 1}/{steps.length - 1}
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
                </div>

                <AiOutlineArrowRight
                    className={clsx(styles.icon)}
                    onClick={(e) => {
                        if (step < 5) {
                            setStep(step + 1);
                        } else {
                            setShowGuide(false);
                        }
                    }}
                />
            </div>
        </div>
    );
}
export default Guide;
