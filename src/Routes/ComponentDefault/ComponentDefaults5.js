import uuid from "react-uuid";
import {
  GrFacebookOption,
  GrInstagram,
  GrGithub,
  GrLinkedin,
  GrYoutube,
} from "react-icons/gr";

const leftDefaultText = 50;
const leftDefaultTitle = 100;

export const DefaultItemInGridTemplate5 = [
  {
    type: "input",
    left: "50%",
    top: 380,
    width: 500,
    height: 80,
    id: uuid(),
    inGrid: true,
    isMulti: false,
    valueItem: "<Updating>",
    center: true,
    styleDefault: {
      backgroundColor: "transparent",
      fontSize: 18,
      textAlign: "center",
      border: "none",
      color: "#000",
      fontFamily: "Poppins",
      lineHeight: "26px",
      border: "1px solid #ccc",
      boxShadow: "14px 17px 115px 0px rgba(0,0,0,0.75)",
      zIndex: -100,
      fontSize: 40,
      TextTransform: "uppercase",
    },
  },
];
