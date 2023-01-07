import clsx from "clsx";
import styles from "./Home.module.scss";
import { useState } from "react";

import Header from "./HeaderHome";
import ContentNewBlank from "~/Components/ContentNewBlank";
import HomeContent from "./HomeContent";
import Footer from ".././Footer";
import { IoCloseOutline } from "react-icons/io5";

function Home() {
    const [showModalChooseTemplate, setShowModalChooseTemplate] =
        useState(false);
    const [modeTheme, setModeTheme] = useState(false);

    return (
        <div className={clsx(styles.wrapper)}>
            <Header modeTheme={modeTheme} setModeTheme={setModeTheme} />
            <HomeContent
                modeTheme={modeTheme}
                setModeTheme={setModeTheme}
                stateModalChooseTemplate={setShowModalChooseTemplate}
            ></HomeContent>
            {/* <div
        className={clsx(styles.wrapper_modal_choose_template)}
        style={{
          display: "none",
          display: showModalChooseTemplate ? "block" : "none",
        }}
      >
        <IoCloseOutline
          className={clsx(styles.icon_close_modal)}
          onClick={(e) => {
            setShowModalChooseTemplate(!showModalChooseTemplate);
          }}
        ></IoCloseOutline>
        <ContentNewBlank
          setShowModalChooseTemplate={setShowModalChooseTemplate}
        />
      </div>
      <Guide></Guide>
      <Footer></Footer> */}
        </div>
    );
}

export default Home;
