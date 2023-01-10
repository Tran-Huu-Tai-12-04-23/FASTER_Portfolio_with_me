import clsx from "clsx";
import styles from "./choosetemplate.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Template } from "~/Components";
import { templates } from "~/assets/img";

function ChooseTemplate({ setModeTheme, modeTheme }) {
    const contentTip = [
        "Create with  blue templates",
        "Create with professinal templates ",
        "Create with normal templates",
        "Create with pink templates",
    ];
    function renderTemplate() {
        return templates.map((temp, index) => {
            const nameTemplate = "/template" + (index + 2);
            return (
                <Link key={index + 1} to={nameTemplate}>
                    <Template background={temp} content={contentTip[index]} />
                </Link>
            );
        });
    }
    return (
        <>
            <div
                className={clsx(styles.wrapper)}
                style={{
                    color: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    backgroundColor: !modeTheme
                        ? "var(--second_background)"
                        : "#fff",
                }}
            >
                <Link to='/template1'>
                    <Template
                        key='0'
                        content={contentTip[0]}
                        icon={<FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>}
                    />
                </Link>
                {renderTemplate()}
            </div>
        </>
    );
}
export default ChooseTemplate;
