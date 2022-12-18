import uuid from "react-uuid";
import backGroundHeader02 from "~/assets/img/backGroundHeader02.png";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";

const leftDefaultText = 50;
const leftDefaultTitle = 100;

export const DefaultItemInGridTemplate1 = [
  {
    type: "div",
    left: 0,
    top: 0,
    width: "100%",
    height: 500,
    id: uuid(),
    inGrid: true,
    isMulti: false,
    valueItem: "<About>",
    styleDefault: {
      backgroundColor: "#669999",
    },
  },
  {
    type: "input",
    left: "50%",
    top: 100,
    width: 500,
    height: 80,
    id: uuid(),
    inGrid: true,
    isMulti: false,
    valueItem: "[Header]",
    center: true,
    styleDefault: {
      backgroundColor: "transparent",
      fontSize: 18,
      textAlign: "center",
      color: "#000",
      fontFamily: "Poppins",
      lineHeight: "26px",
      textAlign: "center",
      color: "#fff",
    },
  },
];
