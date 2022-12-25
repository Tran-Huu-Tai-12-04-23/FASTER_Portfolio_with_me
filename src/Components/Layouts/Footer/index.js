import clsx from "clsx";
import styles from "./Footer.module.scss";

import iconFinal from "~/assets/img/iconFinal.png";
import logoHuutai from "~/assets/img/logoHuutai.png";

import { TfiFacebook } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

function Footer({ backgroundColor, showPreview }) {
  return (
    <div
      className={clsx(styles.wrapper)}
      id='footer'
      style={{
        backgroundColor: backgroundColor,
        display: showPreview ? "none" : "block",
        borderTop: backgroundColor ? "1px solid #000" : "",
        marginTop: backgroundColor ? 60 : "",
      }}
    >
      <div className={clsx(styles.wrapper_content_contact)}>
        <h1
          style={{
            color: backgroundColor ? "#000" : "#fff",
            fontWeight: "bold",
            fontSize: "24px",
            textAlign: "center",
            textTransform: "uppercase",
            wordSpacing: "10px",
          }}
        >
          Contact me
        </h1>
      </div>
      <div>
        <h4
          style={{
            textAlign: "center",
            color: "#FFEBCD",
            marginTop: "20px",
          }}
        >
          My Social Network
        </h4>
        <div
          className={clsx(styles.wrapper_social_network)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            textAlign: "center",
          }}
        >
          <a
            href='https://www.facebook.com/profile.php?id=100037828690010'
            target='_blank'
            style={{
              backgroundColor: "#00bfff",
              color: "#fff",
            }}
          >
            <TfiFacebook
              style={{
                color: "#fff",
              }}
            ></TfiFacebook>
          </a>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            style={{
              backgroundColor: "#DC143C",
            }}
          >
            <FaInstagram
              style={{
                color: "#fff",
              }}
            ></FaInstagram>
          </a>
          <a
            href='https://github.com/Tran-Huu-Tai-12-04-23'
            target='_blank'
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <AiFillGithub
              style={{
                color: "#fff",
              }}
            ></AiFillGithub>
          </a>
        </div>
      </div>
      <div className={clsx(styles.wrapper_logo)}>
        <img src={iconFinal}></img>
        <img src={logoHuutai}></img>
      </div>
    </div>
  );
}

export default Footer;
