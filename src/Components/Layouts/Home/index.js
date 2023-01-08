import clsx from "clsx";
import styles from "./Home.module.scss";
import { useState, useContext } from "react";

import Header from "./HeaderHome";
import HomeContent from "./HomeContent";
import Footer from ".././Footer";
import { IoCloseOutline } from "react-icons/io5";
import ChooseTemplate from "./Chootemplate";
import { Theme } from "~/Store/Context";

function Home() {
    const [showModalChooseTemplate, setShowModalChooseTemplate] =
        useState(false);
    const [modeTheme, setModeTheme] = useState(false);
    const [theme, setTheme] = useContext(Theme);
    return (
        <div className={clsx(styles.wrapper)}>
            <Header
                theme={modeTheme}
                setTheme={setModeTheme}
                showModalChooseTemplate={showModalChooseTemplate}
                setShowModalChooseTemplate={setShowModalChooseTemplate}
            />
            {!showModalChooseTemplate && (
                <HomeContent
                    theme={modeTheme}
                    setTheme={setModeTheme}
                    stateModalChooseTemplate={setShowModalChooseTemplate}
                ></HomeContent>
            )}
            {showModalChooseTemplate && (
                <ChooseTemplate
                    modeTheme={modeTheme}
                    setModeTheme={setModeTheme}
                ></ChooseTemplate>
            )}
        </div>
    );
}

export default Home;
