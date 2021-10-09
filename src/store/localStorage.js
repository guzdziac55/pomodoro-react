export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // return if not exist key state
    }
    // if exist
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// arg is what we will save
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(error.err);
  }
};
