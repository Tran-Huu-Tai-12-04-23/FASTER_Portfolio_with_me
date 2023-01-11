import uuid from "react-uuid";
import clsx from "clsx";
import ReactDOMServer from "react-dom/server";
import Html from "~/Html";
import { useContext, useRef, useEffect, useState } from "react";

import styles from "./TemplateContent.module.scss";
import { Grid, Item } from "~/Components";
import { ContextPages, ElementContentPortfolio } from "~/Store/Context";
import { IoAddSharp } from "react-icons/io5";

function TemplateContent({ DefaultComponentPages }) {
    const [pages, setPages] = useState(DefaultComponentPages);
    const template = useRef();
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        template.current.scrollTop = scroll;
    }, [scroll]);

    const handleAddPages = () => {
        setScroll((prev) => prev + template.current.offsetHeight);
        setPages((prev) => {
            return [
                ...prev,
                {
                    id: uuid(),
                    style: {},
                },
            ];
        });
    };

    const render = () => {
        return pages.map((grid, index) => {
            return (
                <Grid
                    key={uuid()}
                    id={grid.id}
                    numberPage={index + 1}
                    pages={pages}
                    setPages={setPages}
                    style={{
                        ...grid.style,
                    }}
                ></Grid>
            );
        });
    };
    return (
        <div className={clsx(styles.wrapper)} ref={template}>
            {render()}
            <div className={clsx(styles.add_pages)} onClick={handleAddPages}>
                <IoAddSharp />
                <span>Add page</span>
            </div>
        </div>
    );
}

export default TemplateContent;
