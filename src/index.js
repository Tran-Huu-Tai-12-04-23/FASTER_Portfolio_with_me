import reportWebVitals from "./reportWebVitals";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";
import Globalstyles from "./Globalstyles";
import { Provider as ProviderActions } from "./Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Globalstyles>
        <ProviderActions>
          <App />
        </ProviderActions>
      </Globalstyles>
    </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
