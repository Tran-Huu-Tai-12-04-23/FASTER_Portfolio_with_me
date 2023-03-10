import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";

import { publicRoutes } from "./Routes";
import styles from "./App.module.scss";
import { Loading, UserWeb, Preview } from "~/Components";
import { getDataUserWeb } from "~/Store/util";
import { ItemsLocalStore, Theme } from "./Store/Context";

function App() {
    const [displayLoading, setDisplayLoading] = useState(true);
    const [dataUserWeb, setDataUserWeb] = useState([]);
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        window.onload = () => {
            setDisplayLoading(false);
        };
        setTimeout(() => {
            setDisplayLoading(false);
        }, 2000);
    }, []);
    const data = getDataUserWeb();
    data.then((data) => {
        setDataUserWeb(data);
    }).catch((error) => console.error(error));
    const renderUserWeb = () => {
        if (dataUserWeb) {
            if (Array.isArray(dataUserWeb)) {
                return dataUserWeb.map((item, index) => {
                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <UserWeb
                                    widthContent={item.widthContent}
                                    heightTemplate={item.heightDefault}
                                    items={structuredClone(item.items)}
                                    type={item.path}
                                    title={item.title}
                                    pagesContent={item.pagesContent}
                                ></UserWeb>
                            }
                        ></Route>
                    );
                });
            } else {
                return (
                    <Route
                        path={dataUserWeb.path}
                        element={
                            <UserWeb
                                items={dataUserWeb.items}
                                heightTemplate={dataUserWeb.heightDefault}
                                widthContent={dataUserWeb.widthContent}
                                type={dataUserWeb.path}
                                title={dataUserWeb.title}
                                pagesContent={dataUserWeb.pagesContent}
                            ></UserWeb>
                        }
                    ></Route>
                );
            }
        }
    };
    return (
        <ItemsLocalStore.Provider value={dataUserWeb}>
            <Theme.Provider value={[theme, setTheme]}>
                <Loading display={displayLoading}></Loading>
                <div className={clsx(styles.wrapper)}>
                    <Router>
                        <Routes>
                            {publicRoutes.map((page, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={page.path}
                                        element={page.element}
                                    ></Route>
                                );
                            })}
                            {renderUserWeb()}
                        </Routes>
                    </Router>
                </div>
            </Theme.Provider>
        </ItemsLocalStore.Provider>
    );
}

export default App;
