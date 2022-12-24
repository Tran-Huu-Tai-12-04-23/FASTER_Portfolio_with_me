import { AiOutlineConsoleSql } from "react-icons/ai";
import { constantActions } from "~/Constants";
export const setBackgroundColor = (payload) => {
  return {
    type: constantActions.SET_BACKGROUND_COLOR,
    payload,
  };
};
export const setTop = (payload) => {
  return {
    type: constantActions.SET_TOP,
    payload,
  };
};
export const setLeft = (payload) => {
  return {
    type: constantActions.SET_LEFT,
    payload,
  };
};
export const setTextAlign = (payload) => {
  return {
    type: constantActions.SET_TEXT_ALIGN,
    payload,
  };
};
export const setBorderColor = (payload) => {
  return {
    type: constantActions.SET_BORDER_COLOR,
    payload,
  };
};
export const setBorderRadius = (payload) => {
  return {
    type: constantActions.SET_BORDER_RADIUS,
    payload,
  };
};
export const setBorderStyle = (payload) => {
  return {
    type: constantActions.SET_BORDER_STYLE,
    payload,
  };
};
export const setBorderSize = (payload) => {
  return {
    type: constantActions.SET_BORDER_SIZE,
    payload,
  };
};

export const setColor = (payload) => {
  return {
    type: constantActions.SET_COLOR,
    payload,
  };
};
export const setFontSize = (payload) => {
  return {
    type: constantActions.SET_FONT_SIZE,
    payload,
  };
};
export const setLineHeight = (payload) => {
  return {
    type: constantActions.SET_LINE_HEIGHT,
    payload,
  };
};
export const setFontWeight = (payload) => {
  return {
    type: constantActions.SET_FONT_WEIGHT,
    payload,
  };
};
export const setFontFamily = (payload) => {
  return {
    type: constantActions.SET_FONT_FAMILY,
    payload,
  };
};
export const setTextTransform = (payload) => {
  return {
    type: constantActions.SET_TEXT_TRANSFORM,
    payload,
  };
};

export const setIdItemSelected = (payload) => {
  return {
    type: constantActions.SET_ID_ITEM,
    payload,
  };
};
