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
    id: uuid(),
    type: "input",
    left: "50%",
    top: 380,
    width: 500,
    height: 80,
    inGrid: true,
    isMulti: false,
    valueItem: "<Updating>",
    center: true,
    styleDefault: {
      backgroundColor: "transparent",
      borderColor: "rgb(204, 204, 204)",
      borderRadius: "",
      fontSize: "40px",
      color: "rgb(0, 0, 0)",
      fontFamily: "Poppins",
      lineHeight: "26px",
      boxShadow: "14px 17px 115px 0px rgba(0,0,0,0.75)",
      TextTransform: "uppercase",
      borderStyle: "solid",
      fontWeight: "",
      borderWidth: "1px",
      textAlign: "center",
      textTransform: "",
    },
    textValue: "<Updating>",
  },
];
