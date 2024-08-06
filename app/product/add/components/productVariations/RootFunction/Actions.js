import React, { useState } from "react";
import {produce} from "immer";
import { UpdateAction } from "./middleWare";

// Middleware to handle async actions

const Counter = () => {
  const [state, setState] = useState({ count: 0, value: "" });

  const handleAction = (action) => {
    UpdateAction(action, state, setState);
  };

  // Example async action creator
  const fetchValue = () => (dispatch) => {
    setTimeout(() => {
      dispatch({ type: "SET_VALUE", payload: "Async Data" });
    }, 1000);
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => handleAction({ type: "INCREMENT",payload:'hello' })}>
        Increment
      </button>
      <button onClick={() => handleAction({ type: "DECREMENT" ,payload:'hello'})}>
        Decrement
      </button>
      <button onClick={() => handleAction(fetchValue())}>
        Fetch Async Value
      </button>
      <p>Value: {state.value}</p>
    </div>
  );
};

export default Counter;
