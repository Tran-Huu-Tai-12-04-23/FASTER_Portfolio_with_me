import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import clsx from "clsx";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import { publicRoutes } from "./Routes";
import styles from "./App.module.scss";

function App() {
  return (
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
  );
}

export default App;
