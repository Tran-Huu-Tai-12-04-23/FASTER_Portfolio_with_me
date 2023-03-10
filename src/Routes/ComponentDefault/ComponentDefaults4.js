import uuid from "react-uuid";

const leftDefaultText = 50;
const leftDefaultTitle = 100;

export const DefaultItemInGridTemplate4 = [
    {
        id: uuid(),
        type: "background",
        left: "0%",
        top: 0,
        width: "100%",
        height: 500,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            backgroundColor: "rgb(1, 34, 65)",
            border: "none",
            borderColor: "rgb(205, 228, 207)",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        valueItem: "",
    },
    {
        id: uuid(),
        type: "input",
        left: "18.36840394849088%",
        top: 130,
        width: 300,
        height: 52,
        inGrid: true,
        isMulti: false,
        valueItem: "[Enter name]",
        styleDefault: {
            backgroundColor: "transparent",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            border: "none",
            color: "rgb(255, 255, 255)",
            fontFamily: "Poppins",
            lineHeight: "50px",
            textTransform: "uppercase",
            borderRadius: "",
            borderStyle: "groove",
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: "1px",
            borderSize: "1px",
        },
        textValue: "[Enter name]",
    },
    {
        id: uuid(),
        type: "input",
        left: "17.27276156430806%",
        top: 205,
        width: 328,
        height: 60,
        inGrid: true,
        isMulti: false,
        valueItem: "<Your about>",
        styleDefault: {
            backgroundColor: "transparent",
            fontSize: "18px",
            textAlign: "center",
            border: "none",
            color: "rgb(201, 44, 44)",
            fontFamily: "Poppins",
            lineHeight: "26px",
            borderRadius: "",
            borderStyle: "none",
            borderColor: "initial",
            fontWeight: "",
            borderWidth: "initial",
            textTransform: "",
            borderSize: "initial",
        },
        textValue: "<Your about>",
    },
    {
        id: uuid(),
        type: "img",
        left: "53.536754507628295%",
        top: 81,
        width: 300,
        height: 300,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            backgroundColor: "transparent",
            borderColor: "initial",
            borderRadius: "24px",
            border: "none",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderStyle: "none",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
        },
        valueItem: "",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU",
    },
    {
        id: uuid(),
        type: "background",
        left: "0%",
        top: 496,
        width: "100%",
        height: 504,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            backgroundColor: "rgb(255, 210, 48)",
            border: "none",
            borderColor: "rgb(205, 228, 207)",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
        },
        valueItem: "",
    },
    {
        id: uuid(),
        type: "button",
        left: "47.57281553398058%",
        top: 553,
        width: 200,
        height: 48,
        inGrid: true,
        isMulti: false,
        heading: true,
        center: true,
        valueItem: "Education",
        styleDefault: {
            fontWeight: "bold",
            fontSize: "24px",
            color: "rgb(255, 255, 255)",
            border: "none",
            wordSpacing: "4px",
            backgroundColor: "transparent",
            textAlign: "center",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            borderColor: "initial",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        src: "",
    },
    {
        id: uuid(),
        type: "input",
        left: "47.91955617198336%",
        top: 658,
        width: 500,
        height: 100,
        inGrid: true,
        isMulti: false,
        heading: true,
        center: true,
        valueItem: "<Describe>",
        styleDefault: {
            fontWeight: "bold",
            color: "blue",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
        },
        textValue: "<Describe>",
    },
    {
        id: uuid(),
        type: "background",
        left: "0%",
        top: 998,
        width: "100%",
        height: 504,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            backgroundColor: "rgb(1, 34, 65)",
            border: "none",
            borderColor: "rgb(205, 228, 207)",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
        },
        valueItem: "",
    },
    {
        id: uuid(),
        type: "button",
        left: "41.98390775248232%",
        top: 1086,
        width: 200,
        height: 48,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "Skills",
        styleDefault: {
            fontWeight: "bold",
            fontSize: "24px",
            color: "var(--primary)",
            border: "none",
            wordSpacing: "4px",
            backgroundColor: "transparent",
            textAlign: "center",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            borderColor: "initial",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
        },
    },
    {
        id: uuid(),
        type: "input",
        left: "34.55205171803457%",
        top: 1181,
        width: 350,
        height: 100,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "<List skills>",
        styleDefault: {
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
        },
        textValue: "<List skills>",
    },
    {
        id: uuid(),
        type: "background",
        left: "0%",
        top: 1500,
        width: "100%",
        height: 504,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            backgroundColor: "rgb(255, 210, 48)",
            border: "none",
            borderColor: "rgb(205, 228, 207)",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
        },
        valueItem: "",
    },
    {
        id: uuid(),
        type: "button",
        left: "21.050493561360035%",
        top: 1647,
        width: 300,
        height: 48,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "Your projects",
        styleDefault: {
            fontWeight: "bold",
            fontSize: "24px",
            color: "rgb(255, 255, 255)",
            border: "none",
            wordSpacing: "4px",
            backgroundColor: "transparent",
            textAlign: "center",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            borderColor: "initial",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
        },
    },
    {
        id: uuid(),
        type: "input",
        left: "17.641989565863312%",
        top: 1734,
        width: 350,
        height: 100,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "<Project theme>",
        styleDefault: {
            fontWeight: "bold",
            color: "blue",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
        },
        textValue: "<Project theme>",
    },
    {
        id: uuid(),
        type: "img",
        left: "58.11140965302722%",
        top: 1630,
        width: 247,
        height: 211,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            borderColor: "rgb(205, 228, 207)",
            borderRadius: "24px",
            backgroundColor: "transparent",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderStyle: "",
            fontWeight: "",
            textAlign: "",
            borderWidth: "",
            textTransform: "",
            lineHeight: "",
        },
        valueItem: "",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU",
    },
    {
        id: uuid(),
        type: "background",
        left: "0%",
        top: 2000,
        width: "100%",
        height: 510,
        inGrid: true,
        isMulti: false,
        valueItem: "",
        styleDefault: {
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
            backgroundColor: "rgb(1, 34, 65)",
            border: "none",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            borderColor: "initial",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
    },
    {
        id: uuid(),
        type: "img",
        left: "33.69274427080007%",
        top: 2091,
        width: 229,
        height: 285,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            borderRadius: "24px",
            backgroundColor: "transparent",
            border: "none",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderStyle: "none",
            borderColor: "initial",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        valueItem: "",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU",
    },
    {
        id: uuid(),
        type: "img",
        left: "10.90825735989647%",
        top: 2092,
        width: 223,
        height: 139,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            borderRadius: "24px",
            backgroundColor: "transparent",
            border: "none",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderStyle: "none",
            borderColor: "initial",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        valueItem: "",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU",
    },
    {
        id: uuid(),
        type: "img",
        left: "10.946993657112683%",
        top: 2246,
        width: 226,
        height: 129,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            borderRadius: "24px",
            backgroundColor: "transparent",
            border: "none",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderStyle: "none",
            borderColor: "initial",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        valueItem: "",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9zZ0dsOIYyjwZdkWKTE_kuxtRplsy9dexPnXEzCsMRNXXATXEmrELQz9i7z1aeStYJI&usqp=CAU",
    },
    {
        id: uuid(),
        type: "input",
        left: "62.097186032880856%",
        top: 2123,
        width: 238,
        height: 61,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "About work",
        styleDefault: {
            fontWeight: "bold",
            color: "rgb(212, 140, 140)",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            minHeight: 50,
            fontSize: "18px",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "44px",
            borderSize: "1px",
        },
        textValue: "About work",
    },
    {
        id: uuid(),
        type: "input",
        left: "62.27113667094167%",
        top: 2231,
        width: 242,
        height: 128,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "<Describes>",
        styleDefault: {
            fontWeight: "bold",
            color: "rgb(212, 140, 140)",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            minHeight: 50,
            fontSize: "18px",
            textTransform: "uppercase",
            boxShadow: "10px 10px 106px -33px rgba(240,43,53,1)",
            borderRadius: "12px",
            fontFamily: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            lineHeight: "43px",
            borderSize: "1px",
        },
        textValue: "<Describes>",
    },
    {
        id: uuid(),
        type: "background",
        left: "0%",
        top: 2498,
        width: "100%",
        height: 508,
        inGrid: true,
        isMulti: false,
        styleDefault: {
            fontWeight: "bold",
            backgroundColor: "rgb(255, 210, 48)",
            textAlign: "center",
            border: "none",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "none",
            borderColor: "initial",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        valueItem: "",
    },
    {
        id: uuid(),
        type: "input",
        left: "16.561435477225377%",
        top: 2591,
        width: 174,
        height: 50,
        inGrid: true,
        isMulti: false,
        heading: true,
        valueItem: "Contact me",
        styleDefault: {
            fontWeight: "bold",
            color: "var(--primary)",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            minHeight: 50,
            fontSize: "18px",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
        },
        textValue: "Contact me",
    },
    {
        id: uuid(),
        type: "img",
        left: "41.880465880140896%",
        top: 2536,
        width: 195,
        height: 265,
        inGrid: true,
        isMulti: false,
        src: "https://i.ibb.co/rHpQj5S/Pngtree-contact-our-front-desk-5412876-1.png",
        styleDefault: {
            borderRadius: "24px",
            backgroundColor: "transparent",
            border: "none",
            color: "",
            fontSize: "",
            fontFamily: "",
            borderStyle: "double",
            borderColor: "rgb(253, 216, 216)",
            fontWeight: "",
            textAlign: "",
            borderWidth: "initial",
            textTransform: "",
            lineHeight: "",
            borderSize: "initial",
        },
        valueItem: "",
    },
    {
        id: uuid(),
        type: "input",
        left: "67.27348696313233%",
        top: 2594,
        width: 171,
        height: 218,
        inGrid: true,
        isMulti: false,
        valueItem: "[Your detail, address]",
        styleDefault: {
            fontWeight: "bold",
            color: "rgb(0, 0, 0)",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            minHeight: 50,
            fontSize: "14px",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
        },
        textValue: "[Your detail, address]",
    },
    {
        id: uuid(),
        type: "button",
        left: "41.415195074251834%",
        top: 2819,
        width: 200,
        height: 30,
        inGrid: true,
        isMulti: false,
        valueItem: "Connect with me",
        styleDefault: {
            color: "blue",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            minHeight: 50,
            fontSize: "14px",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            fontWeight: "",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
        },
    },
    {
        id: uuid(),
        type: "input",
        left: "15.062906586041008%",
        top: 2649,
        width: 209,
        height: 173,
        inGrid: true,
        isMulti: false,
        valueItem: "Details",
        styleDefault: {
            color: "blue",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            textAlign: "center",
            minHeight: 50,
            fontSize: "14px",
            fontFamily: "",
            borderRadius: "",
            borderStyle: "solid",
            borderColor: "rgb(204, 204, 204)",
            fontWeight: "",
            borderWidth: "1px",
            textTransform: "",
            lineHeight: "",
            borderSize: "1px",
        },
        textValue: "Details",
    },
    {
        type: "icon",
        left: "51.97816259379407%",
        top: 2879,
        width: 101,
        height: 64,
        inGrid: true,
        isMulti: false,
        InfoIcon: "Facebook",
        styleDefault: {
            borderWidth: "",
            borderStyle: "",
            borderColor: "",
            padding: "12px",
            backgroundColor: "",
            color: "rgb(33, 55, 228)",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            fontWeight: "",
            textAlign: "",
            textTransform: "",
            lineHeight: "",
            borderSize: "",
        },
        href: "http://localhost:3000/template4",
        valueItem: "",
        id: uuid(),
    },
    {
        type: "icon",
        left: "42.70335830639686%",
        top: 2880,
        width: 90,
        height: 62,
        inGrid: true,
        isMulti: false,
        InfoIcon: "Instagram",
        styleDefault: {
            borderWidth: "",
            borderStyle: "",
            borderColor: "",
            padding: "12px",
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "rgb(255, 0, 0)",
            fontSize: "",
            fontFamily: "",
            borderRadius: "",
            fontWeight: "",
            textAlign: "",
            textTransform: "",
            lineHeight: "",
            borderSize: "",
        },
        href: "http://localhost:3000/template4",
        valueItem: "",
        id: uuid(),
    },
];
