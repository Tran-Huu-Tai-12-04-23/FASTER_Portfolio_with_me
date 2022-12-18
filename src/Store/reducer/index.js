import { constantActions } from "~/Constants";

const reducer = (state, action) => {
  switch (action.type) {
    case constantActions.SET_COLOR: {
      return {
        ...state,
        color: action.payload,
      };
    }
    case constantActions.SET_BACKGROUND_COLOR: {
      return {
        ...state,
        background_color: action.payload,
      };
    }
    case constantActions.SET_FONT_SIZE: {
      return {
        ...state,
        font_size: action.payload,
      };
    }
    case constantActions.SET_TEXT_TRANSFORM: {
      return {
        ...state,
        text_transform: action.payload,
      };
    }
    case constantActions.SET_LINE_HEIGHT: {
      return {
        ...state,
        line_height: action.payload,
      };
    }
    case constantActions.SET_FONT_FAMILY: {
      return {
        ...state,
        font_family: action.payload,
      };
    }
    case constantActions.SET_FONT_WEIGHT: {
      return {
        ...state,
        font_weight: action.payload,
      };
    }
    case constantActions.SET_BORDER_RADIUS: {
      return {
        ...state,
        border_radius: action.payload,
      };
    }
    case constantActions.SET_BORDER_STYLE: {
      return {
        ...state,
        border_style: action.payload,
      };
    }
    case constantActions.SET_BORDER_COLOR: {
      return {
        ...state,
        border_color: action.payload,
      };
    }
    case constantActions.SET_BORDER_SIZE: {
      return {
        ...state,
        border_size: action.payload,
      };
    }
    case constantActions.SET_ALIGN_CENTER: {
      return {
        ...state,
        align_center: action.payload,
      };
    }
    case constantActions.SET_TEXT_ALIGN: {
      return {
        ...state,
        text_align: action.payload,
      };
    }

    case constantActions.SET_ID_ITEM: {
      return {
        ...state,
        id_item_selected: action.payload,
      };
    }
    case constantActions.SET_VALUE: {
      return {
        ...state,
        value: action.payload,
      };
    }
    case constantActions.SET_HREF: {
      return {
        ...state,
        href: action.payload,
      };
    }
    case constantActions.SET_SRC: {
      return {
        ...state,
        src: action.payload,
      };
    }

    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
