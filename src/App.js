import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";

import { publicRoutes } from "./Routes";
import styles from "./App.module.scss";
import { Loading, UserWeb, Preview } from "~/Components";
import { getDataUserWeb } from "~/Store/util";

function App() {
  const [displayLoading, setDisplayLoading] = useState(true);
  const [dataUserWeb, setDataUserWeb] = useState([]);
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
                <UserWeb items={item.items} heightTemplate={4000}></UserWeb>
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
                heightTemplate={4000}
              ></UserWeb>
            }
          ></Route>
        );
      }
    }
  };
  return (
    <>
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
    </>
  );
}

export default App;
