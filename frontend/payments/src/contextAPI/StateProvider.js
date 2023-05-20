import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext(null);

const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider
      value={useReducer(reducer, initialState)}
      // value={useReducer(reducer, initialState)}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateValue = () => useContext(StateContext);
