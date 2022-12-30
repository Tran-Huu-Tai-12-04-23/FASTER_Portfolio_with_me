import { Link } from "react-router-dom";
import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import { faComputer, faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs";
import { BiUndo, BiRedo } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { getDataUserWeb } from "~/Store/util/index";

import styles from "./Header.module.scss";
import { Button, TipSuggest } from "~/Components";
import { undo, redo, setUndo, setRedo } from "~/Store/reducer/actions";
import {
  ContextReducer,
  ContextItemsIngrid,
  ItemsLocalStore,
} from "~/Store/Context";
import ModalPublic from "./ModalPublic";

function Header({ setShowPreview, heightDefault, widthContent }) {
  const [title, setTitle] = useState("Enter title");
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [showModalPublic, setShowModalPublic] = useState(false);
  const [showLinkYourWebsite, setShowLinkYourWebsite] = useState(false);
  const dataUserWeb = useContext(ItemsLocalStore);

  const handleDataTitle = (e) => {
    document.title = e.target.value;
    setTitle(e.target.value);
  };

  const handleDataTitleEmpty = (e) => {
    if (e.target.value === "") {
      setTitle("Title is empty");
    }
  };

  // useEffect(() => {
  //   const handleKeyUp = (e) => {
  //     if (e.ctrlKey && e.key === "z") {
  //       handleUndo();
  //     }
  //     if (e.ctrlKey && e.key === "y") {
  //       handleRedo();
  //     }
  //   };
  //   window.addEventListener("keyup", handleKeyUp);
  //   return () => {
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // });
  const handleUndo = () => {
    if (state.stackUndo.length > 0) {
      state.stackRedo.push(structuredClone(items));
      setItems(structuredClone(state.stackUndo.pop()));
    }
  };
  const handleRedo = () => {
    if (state.stackRedo.length > 0) {
      state.stackUndo.push(structuredClone(items));
      setItems(structuredClone(state.stackRedo.pop()));
    }
  };
  const renderYourLink = (e) => {
    if (dataUserWeb) {
      if (Array.isArray(dataUserWeb)) {
        return dataUserWeb.map((item, index) => {
          return (
            <a key={index} href={item.path} target='_blank'>
              <li>/{item.path}</li>
            </a>
          );
        });
      } else {
        return (
          <a href={dataUserWeb.path} target='_blank'>
            <li>/{dataUserWeb.path}</li>
          </a>
        );
      }
    } else {
      return (
        <li
          style={{
            textAlign: "center",
          }}
        >
          You haven't public your website
        </li>
      );
    }
  };
  return (
    <>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.wrapper_input)}>
          <TipSuggest content='Return Home'>
            <Link to='/'>
              <FontAwesomeIcon
                className={clsx(styles.icon_home)}
                icon={faHomeLg}
              ></FontAwesomeIcon>
            </Link>
          </TipSuggest>

          <TipSuggest classNames={clsx(styles.input)} content='Edit'>
            <input
              value={title}
              onChange={handleDataTitle}
              onBlur={handleDataTitleEmpty}
            ></input>
          </TipSuggest>
        </div>

        <div className={clsx(styles.until_options)}>
          <div
            className={clsx(styles.your_website)}
            onClick={(e) => {
              setShowLinkYourWebsite(true);
            }}
          >
            <TipSuggest content='Link your website'>
              <CgWebsite
                style={{
                  display: showLinkYourWebsite ? "none" : "block",
                }}
              ></CgWebsite>
            </TipSuggest>
            <AiOutlineClose
              onClick={(e) => {
                e.stopPropagation();
                setShowLinkYourWebsite(false);
              }}
              style={{
                display: showLinkYourWebsite ? "block" : "none",
              }}
            ></AiOutlineClose>
            <div
              className={clsx(styles.wrapper_manager_link)}
              style={{
                display: showLinkYourWebsite ? "block" : "none",
              }}
            >
              {renderYourLink()}
            </div>
          </div>
          {/* <div>
            <TipSuggest content='Undo'>
              <BiUndo
                style={{
                  fontSize: "36px",
                  opacity: state.stackUndo.length > 0 ? 1 : 0.4,
                }}
                onClick={handleUndo}
              ></BiUndo>
            </TipSuggest>

            <TipSuggest content='Redo'>
              <BiRedo
                style={{
                  fontSize: "36px",
                  opacity: state.stackRedo.length > 0 ? 1 : 0.4,
                }}
                onClick={handleRedo}
              ></BiRedo>
            </TipSuggest>
          </div> */}
          <TipSuggest content='Show preview'>
            <FontAwesomeIcon
              onClick={(e) => {
                setShowPreview(true);
              }}
              icon={faComputer}
            ></FontAwesomeIcon>
          </TipSuggest>

          <TipSuggest content='Public'>
            <Button
              primary
              className={clsx(styles.button)}
              onClick={(e) => {
                setShowModalPublic(true);
              }}
            >
              Public
            </Button>
          </TipSuggest>
        </div>
      </div>
      <ModalPublic
        widthContent={widthContent}
        show={showModalPublic}
        setShowModalPublic={setShowModalPublic}
        heightDefault={heightDefault}
      ></ModalPublic>
    </>
  );
}

export default Header;
