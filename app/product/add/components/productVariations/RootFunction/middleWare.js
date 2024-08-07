const { updateState } = require("./updater");

const thunkMiddleware = (next) => (action, state, setState) => {
    if (typeof action === "function") {
      console.log('object');
      // If action is a function, assume it's an async action
      return action(next, state, setState);
    }
    return next(action, state, setState);
  };
  
  // Middleware to log actions
  const loggerMiddleware = (next) => (action, state, setState) => {
    console.log("Dispatching action:", action);
    console.log("Current state:", state);
    const result = next(action, state, setState);
    console.log("Next state:", result);
 
    return result;
  };
  
  // Action Handlers

  // Update state function using immer's produce and object mapping
   
  // Apply middleware function
  const applyMiddleware = (middlewares, updateStateFn) => {
    return (action, setState) => {
      let next = (a, st) => updateStateFn(a, st);
  
      // Apply the middlewares in reverse order
      for (let i = middlewares.length - 1; i >= 0; i--) {
        next = middlewares[i](next);
      }
  
      return next(action, setState);
    };
  };
  
  // Create enhanced action handler with middleware
  const middlewares = [thunkMiddleware, loggerMiddleware];
  export const UpdateAction = applyMiddleware(middlewares, updateState);
  