function createFSM({ actions, transitions, initialState }) {
  let currentState = initialState;

  let findTransitionFor = (...args) => {
    return transitions[currentState]
      .find(({ when }) => {
        return when(...args).every((condition) => condition);
      });
  }

  let performAction = (...args) => {
    actions[currentState](...args);
  }

  let performTransition = ({ to: newState }) => (...args) => {
    currentState = newState;

    performAction(...args);
  }

  return { findTransitionFor, performTransition, performAction };
}

export default createFSM;
