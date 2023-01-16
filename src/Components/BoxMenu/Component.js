import { useState } from "react";
import clsx from "clsx";
import styles from "./BoxMenu.module.scss";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Item } from "~/Components";
import uuid from "react-uuid";
function Component() {
    const [showOptionsFooter, setShowOptionsFooter] = useState(false);
    const footerImg = [
        "https://i.ibb.co/LRznKc3/v1.png",
        "https://i.ibb.co/LRznKc3/v1.png",
        "https://i.ibb.co/LRznKc3/v1.png",
    ];
    const renderFooter = () => {
        return footerImg.map((footer, index) => {
            return (
                <div key={uuid()}>
                    <Item
                        type='img'
                        isMulti={true}
                        typeMulti={"footer"}
                        numberFooter={index}
                        src={footer}
                    />
                </div>
            );
        });
    }; 
    return (
        <div className={clsx(styles.wrapper_component)}>
            <div onClick={(e) => setShowOptionsFooter(!showOptionsFooter)}>
                <button>Footer</button>
                <AiOutlineMenuFold
                    style={{
                        display: showOptionsFooter ? "block" : "none",
                    }}
                ></AiOutlineMenuFold>
                <MdOutlineKeyboardArrowDown
                    style={{
                        display: !showOptionsFooter ? "block" : "none",
                    }}
                ></MdOutlineKeyboardArrowDown>
            </div>
            <div
                className={clsx(styles.wrapper_footer)}
                style={{
                    display: showOptionsFooter ? "block" : "none",
                }}
            >
                {renderFooter()}
            </div>
        </div>
    );
}
export default Component;
