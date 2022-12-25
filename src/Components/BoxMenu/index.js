import uuid from "react-uuid";
import { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";
import clsx from "clsx";
import {
  BsCardText,
  BsFileImage,
  BsBoxSeam,
  BsFillMenuButtonWideFill,
} from "react-icons/bs";
import { TfiImage } from "react-icons/tfi";
import { BsImage } from "react-icons/bs";
import { AiOutlineAlignLeft, AiOutlineLink } from "react-icons/ai";

import styles from "./BoxMenu.module.scss";
import { Item, TipSuggest } from "~/Components";
import { wrapperContent } from "~/Store/Context";

function BoxMenu() {
  const icons = [
    {
      Name: "Facebook",
      Component: <GrFacebookOption />,
    },
    {
      Name: "Instagram",
      Component: <GrInstagram />,
    },
    {
      Name: "Github",
      Component: <GrGithub />,
    },
    {
      Name: "Linkedin",
      Component: <GrLinkedin />,
    },
    {
      Name: "Youtube",
      Component: <GrYoutube />,
    },
  ];

  const wrapperContentPortfolio = useContext(wrapperContent);
  const [widthMenu, setWidthMenu] = useState();

  /// resize set width content
  useEffect(() => {
    if (wrapperContentPortfolio.current) {
      setWidthMenu(wrapperContentPortfolio.current.offsetWidth * 0.22 + 14);
    }
    const handleResize = () => {
      setWidthMenu(wrapperContentPortfolio.current.offsetWidth * 0.22 + 14);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const renderIcons = () => {
    return icons.map((Icon) => {
      return (
        <TipSuggest
          key={uuid()}
          content={`Icon ${Icon.Name}`}
          position={"top"}
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            draggable='true'
            className={clsx(styles.item_text)}
            icon
            id={uuid()}
            type='icon'
            InfoIcon={Icon}
            widthMenu={widthMenu}
            styleDefault={{
              position: "unset",
              border: "none",
              backgroundColor: "var(--primary_color_component)",
            }}
          >
            {Icon.Component}
          </Item>
        </TipSuggest>
      );
    });
  };

  return (
    <div className={clsx(styles.wrapper)} id='menu_1'>
      <div className={clsx(styles.wrapper_single_component)}>
        <span
          style={{
            width: "100%",
            textAlign: "center",
            color: "#FF6600",
            fontWeight: "600",
          }}
        >
          Single items
        </span>
        <TipSuggest
          content='Text'
          position={"top"}
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            id='item_text'
            draggable='true'
            type='input'
            className={clsx(styles.item_text)}
            icon
            widthMenu={widthMenu}
            styleDefault={{
              position: "unset",
              backgroundColor: "var(primary_color_component)",
            }}
          >
            <BsCardText />
          </Item>
        </TipSuggest>
        <TipSuggest
          content='Link'
          position={"top"}
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            id='item_link'
            type='a'
            draggable='true'
            className={clsx(styles.item_link)}
            icon
            widthMenu={widthMenu}
            styleDefault={{
              position: "unset",
              backgroundColor: "var(primary_color_component)",
            }}
          >
            <FontAwesomeIcon icon={faLink} />
          </Item>
        </TipSuggest>
        <TipSuggest
          content='Image'
          position={"top"}
          width='30%'
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            id='item_image'
            type='img'
            draggable='true'
            className={clsx(styles.item_img)}
            icon
            widthMenu={widthMenu}
            styleDefault={{
              position: "unset",
              backgroundColor: "var(primary_color_component)",
            }}
          >
            <BsFileImage />
          </Item>
        </TipSuggest>
        <TipSuggest
          content='Button'
          position={"top"}
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            id='item_button'
            type='button'
            draggable='true'
            className={clsx(styles.item_button)}
            icon
            widthMenu={widthMenu}
            styleDefault={{
              position: "unset",
              backgroundColor: "var(primary_color_component)",
            }}
          >
            <BsFillMenuButtonWideFill />
          </Item>
        </TipSuggest>
        <TipSuggest content='Box'>
          <Item
            resizable={false}
            id='item_div'
            type='div'
            draggable='true'
            className={clsx(styles.item_button)}
            icon
            widthMenu={widthMenu}
            styleDefault={{
              position: "unset",
              backgroundColor: "var(primary_color_component)",
            }}
          >
            <BsBoxSeam />
          </Item>
        </TipSuggest>
      </div>
      <div className={clsx(styles.menu_icon)}>
        <span
          style={{
            width: "100%",
            textAlign: "center",
            color: "#FF6600",
            fontWeight: "600",
          }}
        >
          Icons
        </span>
        {renderIcons()}
      </div>
    </div>
  );
}

export default BoxMenu;
