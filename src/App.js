import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";

import { publicRoutes } from "./Routes";
import styles from "./App.module.scss";
import { Loading } from "~/Components";

function App() {
  const [displayLoading, setDisplayLoading] = useState(true);
  useEffect(() => {
    window.onload = () => {
      setDisplayLoading(false);
    };
  }, []);
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
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
