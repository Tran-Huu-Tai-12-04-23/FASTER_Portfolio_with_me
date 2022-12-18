import { useReducer } from "react";

import initState from "./reducer/initState";
import reducer from "./reducer";
import { ContextReducer } from "./Context";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <ContextReducer.Provider value={[state, dispatch]}>
      {children}
    </ContextReducer.Provider>
  );
}

export default Provider;
