import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderHome.module.scss";
import iconFinal from "~/assets/img/iconFinal.png";
import logoHuutai from "~/assets/img/logoHuutai.png";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";

function Header({
    theme,
    setTheme,
    showModalChooseTemplate,
    setShowModalChooseTemplate,
}) {
    return (
        <div
            className={clsx(styles.wrapper)}
            style={{
                color: theme ? "#000" : "#fff",
            }}
        >
            {/* menu in here  */}

            <div className={clsx(styles.nav_home)}>
                <div className={clsx(styles.mode_themes)}>
                    {theme && (
                        <MdOutlineDarkMode
                            style={{
                                color: "#000",
                            }}
                            onClick={(e) => {
                                setTheme(!theme);
                            }}
                        ></MdOutlineDarkMode>
                    )}
                    {!theme && (
                        <BsFillSunFill
                            style={{
                                color: "yellow",
                            }}
                            onClick={(e) => {
                                setTheme(!theme);
                            }}
                        ></BsFillSunFill>
                    )}
                </div>
                <a
                    onClick={(e) => {
                        setShowModalChooseTemplate(!showModalChooseTemplate);
                    }}
                >
                    <h4>Home</h4>
                </a>
                <a href='#guide'>
                    <h4>Storage</h4>
                </a>
                <a href='#footer'>
                    <h4>Contact</h4>
                </a>
                <button
                    href='#footer'
                    style={{
                        padding: "6px 32px",
                        border: "1px solid var(--primary)",
                        background:
                            "linear-gradient(to right, #ff00cc, #333399)",
                        borderRadius: "12px",
                        fontSize: "20px",
                        color: "inherit",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: !showModalChooseTemplate ? "block" : "none",
                    }}
                    onClick={(e) => {
                        setShowModalChooseTemplate(!showModalChooseTemplate);
                    }}
                >
                    Get start
                </button>
            </div>
        </div>
    );
}

export default Header;
