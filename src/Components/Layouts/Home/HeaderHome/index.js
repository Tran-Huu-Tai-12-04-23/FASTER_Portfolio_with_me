import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderHome.module.scss";
import logo_tdtu from "~/assets/img/icon__tdtu.png";
import logoHuutai from "~/assets/img/logoHuutai.png";

function Header() {
  return (
    <div className={clsx(styles.wrapper)}>
      {/* menu in here  */}
      <div
        style={{
          width: "100px",
          height: "50px",
        }}
      >
        <img
          src={logoHuutai}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        ></img>
      </div>
      <div className={clsx(styles.nav_home)}>
        <a href='#home'>
          <h4>Home</h4>
        </a>
        <a href='#guide'>
          <h4>Guide</h4>
        </a>
        <a href='#footer'>
          <h4>Contact</h4>
        </a>
      </div>
      
      <img
        className={clsx(styles.icon__university)}
        src={logo_tdtu}
        alt='tdtu'
      ></img>
    </div>
  );
}

export default Header;
