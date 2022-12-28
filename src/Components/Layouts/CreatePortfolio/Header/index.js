import { Link } from "react-router-dom";
import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import { faComputer, faHomeLg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs";
import { BiUndo, BiRedo } from "react-icons/bi";

import styles from "./Header.module.scss";
import { Button, TipSuggest } from "~/Components";
import { undo, redo, setUndo, setRedo } from "~/Store/reducer/actions";
import { ContextReducer, ContextItemsIngrid } from "~/Store/Context";

function Header({ setShowPreview }) {
  const [title, setTitle] = useState("Enter title");
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);

  const handleDataTitle = (e) => {
    document.title = e.target.value;
    setTitle(e.target.value);
  };

  const handleDataTitleEmpty = (e) => {
    if (e.target.value === "") {
      setTitle("Title is empty");
    }
  };
  useEffect(() => {
    if (state.undo.length > 0) {
      setItems(state.undo);
    }
    if (state.redo.length > 0) {
      setItems(state.redo);
    }
  }, [state]);
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.ctrlKey && e.key === "z") {
        handleUndo();
      }
      if (e.ctrlKey && e.key === "y") {
        handleRedo();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });
  const handleUndo = () => {
    if (state.stackUndo.length > 0) {
      const [dataLoad, ...rest] = state.stackUndo;
      dispatch(setRedo([structuredClone(dataLoad), ...state.stackRedo]));
      dispatch(setUndo([...rest]));
      dispatch(redo([]));
      dispatch(undo(structuredClone(dataLoad)));
    }
  };
  const handleRedo = () => {
    if (state.stackRedo.length > 0) {
      const [dataLoad, ...rest] = state.stackRedo;
      dispatch(setRedo([...rest]));
      dispatch(setUndo([structuredClone(dataLoad), ...state.stackUndo]));
      dispatch(undo([]));
      dispatch(redo(structuredClone(dataLoad)));
    }
  };
  return (
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
        <div>
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
        </div>
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
              setShowModal(!showModal);
            }}
          >
            Public
          </Button>
        </TipSuggest>
        <div
          className={clsx(styles.modal_public)}
          style={{
            display: showModal ? "block" : "none",
          }}
        >
          I'm sorry. Updating......
          <AiOutlineClose
            onClick={(e) => {
              setShowModal(!showModal);
            }}
            style={{
              color: "#fff",
              position: "absolute",
              right: "50px",
              top: "50%",
              transform: " translateY(-50%)",
              backgroundColor: "var(--primary)",
              fontSize: "36px",
              borderRadius: "6px",
            }}
          ></AiOutlineClose>
        </div>
      </div>
    </div>
  );
}

export default Header;
