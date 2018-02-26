function createFSM({ actions, transitions, initialState }) {
  let currentState = initialState;

  let findTransitionFor = (...args) => {
    return transitions[currentState]
      .find(({ when }) => {
        return when(...args).every((condition) => condition);
      });
  }

  let performTransition = ({ to: newState }) => (...args) => {
    currentState = newState;

    actions[newState](...args);
  }

  return { findTransitionFor, performTransition };
}

export default createFSM;