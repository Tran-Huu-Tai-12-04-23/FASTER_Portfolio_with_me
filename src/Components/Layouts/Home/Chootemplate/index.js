import clsx from "clsx";
import styles from "./choosetemplate.module.scss";
import ContentNewBlank from "~/Components/ContentNewBlank";
import Header from "../HeaderHome";

function ChooseTemplate({ setModeTheme, modeTheme }) {
    return (
        <>
            <Header modeTheme={modeTheme} setModeTheme={setModeTheme} />

            <div
                className={clsx(styles.wrapper)}
                style={{
                    color: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    flexWrap: "wrap",
                }}
            >
                <ContentNewBlank></ContentNewBlank>
            </div>
        </>
    );
}
export default ChooseTemplate;
