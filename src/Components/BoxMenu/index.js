import uuid from "react-uuid";
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
            styleDefault={{
              position: "unset",
              backgroundColor: "var(primary_color_component)",
            }}
          >
            <BsBoxSeam />
          </Item>
        </TipSuggest>
      </div>
      <div className={clsx(styles.multi_items)}>
        <span
          style={{
            width: "100%",
            textAlign: "center",
            color: "#FF6600",
            fontWeight: "600",
          }}
        >
          Multi items
        </span>
        <Item
          resizable={false}
          id='item_div'
          type1='img'
          type2='input'
          type3='input'
          numberComponents={3}
          isMulti='true'
          draggable='true'
          className={clsx(styles.item_button)}
          styleDefaultChild={[
            {
              backgroundColor: "transparent",
              color: "#ccc",
            },
            {
              backgroundColor: "transparent",
              fontSize: 18,
              color: "#ccc",
            },
            {
              backgroundColor: "transparent",
              fontSize: 14,
            },
          ]}
          icon
          styleDefault={{
            position: "unset",
            backgroundColor: "var(primary)",
          }}
        >
          <TipSuggest content='Image + text'>
            <div className={clsx(styles.wrapper_icon)}>
              <BsImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></BsImage>
              <AiOutlineAlignLeft
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></AiOutlineAlignLeft>
            </div>
          </TipSuggest>
        </Item>
        <Item
          resizable={false}
          id='item_div'
          type1='img'
          type2='input'
          type3='img'
          type4='input'
          numberComponents={4}
          isMulti='true'
          draggable='true'
          className={clsx(styles.item_button)}
          icon
          styleDefaultChild={[
            {
              backgroundColor: "transparent",
            },
            {
              backgroundColor: "transparent",
              fontSize: 14,
              color: "#ccc",
            },
            {
              backgroundColor: "transparent",
            },
            {
              backgroundColor: "transparent",
              fontSize: 14,
              color: "#ccc",
            },
          ]}
          styleDefault={{
            position: "unset",
            backgroundColor: "var(primary)",
          }}
        >
          <TipSuggest content='Feedback client, etc'>
            <div className={clsx(styles.wrapper_icon)}>
              <BsImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></BsImage>
              <AiOutlineAlignLeft
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></AiOutlineAlignLeft>
              <BsImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></BsImage>
              <AiOutlineAlignLeft
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></AiOutlineAlignLeft>
            </div>
          </TipSuggest>
        </Item>
        <Item
          resizable={false}
          id='item_div'
          type1='img'
          type2='input'
          numberComponents={8}
          isMulti='true'
          draggable='true'
          className={clsx(styles.item_button)}
          icon
          styleDefaultChild={[
            {
              backgroundColor: "transparent",
            },
            {
              backgroundColor: "transparent",
              fontSize: 16,
              color: "#ccc",
            },
            {
              backgroundColor: "transparent",
            },
            {
              backgroundColor: "transparent",
              fontSize: 16,
              color: "#ccc",
            },
            {
              backgroundColor: "transparent",
            },
            {
              backgroundColor: "transparent",
              fontSize: 16,
              color: "#ccc",
            },
            {
              backgroundColor: "transparent",
            },
            {
              backgroundColor: "transparent",
              fontSize: 16,
              color: "#ccc",
            },
          ]}
          styleDefault={{
            position: "unset",
            backgroundColor: "var(primary)",
          }}
        >
          <TipSuggest content='Show projects,etc'>
            <div className={clsx(styles.wrapper_icon)}>
              <TfiImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></TfiImage>
              <TfiImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></TfiImage>
              <TfiImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></TfiImage>
              <TfiImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></TfiImage>
            </div>
          </TipSuggest>
        </Item>
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
