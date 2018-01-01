function createFSM({ actions, transitions, initialState }) {
  let currentState = initialState;

  const findTransitionFor = (...args) => {
    return transitions[currentState]
      .find(({ when }) => {
        return when(...args).every((condition) => condition);
      });
  }

  const performTransition = ({ to: newState }) => (...args) => {
    currentState = newState;

    actions[newState](...args);
  }

  return { findTransitionFor, performTransition };
}

export default createFSM;