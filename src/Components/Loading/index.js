import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Loading.module.scss";

function Loading({ display }) {
    const loadOne = useRef();
    const loadTwo = useRef();
    const loadThree = useRef();
    const [randomColor1, setRandomColor1] = useState();
    const [randomColor2, setRandomColor2] = useState();
    const [randomColor3, setRandomColor3] = useState();

    useEffect(() => {
        setTimeout(() => {
            setRandomColor1(
                "#" + Math.floor(Math.random() * 16777215).toString(16)
            );
            setRandomColor2(
                "#" + Math.floor(Math.random() * 16777215).toString(16)
            );
            setRandomColor3(
                "#" + Math.floor(Math.random() * 16777215).toString(16)
            );
        }, 500);
    });

    useEffect(() => {
        if (loadOne) {
            loadOne.current.style.borderColor = randomColor1;
        }
    }, [randomColor1]);
    useEffect(() => {
        if (loadTwo) {
            loadTwo.current.style.borderColor = randomColor2;
        }
    }, [randomColor2]);
    useEffect(() => {
        if (loadThree) {
            loadThree.current.style.borderColor = randomColor3;
        }
    }, [randomColor3]);
    return (
        <div
            className={clsx(styles.wrapper)}
            style={{ display: display ? "block" : "none" }}
            id='loading'
        >
            <div className={clsx(styles.loader)}>
                <div
                    ref={loadOne}
                    className={clsx(styles.inner, styles.one)}
                ></div>
                <div
                    ref={loadTwo}
                    className={clsx(styles.inner, styles.two)}
                ></div>
                <div
                    ref={loadThree}
                    className={clsx(styles.inner, styles.three)}
                ></div>
            </div>
        </div>
    );
}

export default Loading;
