import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";

import { publicRoutes } from "./Routes";
import styles from "./App.module.scss";
import { Loading, UserWeb, Preview } from "~/Components";
import { getDataUserWeb } from "~/Store/util";
import { ItemsLocalStore } from "./Store/Context";

function App() {
  const [displayLoading, setDisplayLoading] = useState(true);
  const [dataUserWeb, setDataUserWeb] = useState([]);
  const [widthContent, setWidthContent] = useState();
  const content = useRef();
  useEffect(() => {
    setWidthContent((content.current.offsetWidth * 76) / 100);
  }, []);

  useEffect(() => {
    window.onload = () => {
      setDisplayLoading(false);
    };
  }, []);
  const data = getDataUserWeb();
  data
    .then((data) => {
      setDataUserWeb(data);
    })
    .catch((error) => console.error(error));
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
                  widthContent={widthContent}
                  heightTemplate={item.heightDefault}
                  items={item.items}
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
              ></UserWeb>
            }
          ></Route>
        );
      }
    }
  };
  return (
    <ItemsLocalStore.Provider value={dataUserWeb}>
      <Loading display={displayLoading}></Loading>
      <div className={clsx(styles.wrapper)} ref={content}>
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
    </ItemsLocalStore.Provider>
  );
}

export default App;
