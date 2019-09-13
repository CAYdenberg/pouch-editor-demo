import c from "./types";

export default dispatch => {
  return {
    onReady(username, dbName, isFirstLoad) {
      dispatch({ type: c.DB_READY, username, dbName, isFirstLoad });
    },

    onChange({ direction, change }) {
      if (direction !== "pull") return;
      if (!change.ok) return; // onError will also be triggered
      const { docs } = change;

      dispatch({
        type: c.CHANGE,
        updates: docs.filter(doc => !doc._deleted),
        deletions: docs.filter(doc => doc._deleted)
      });
    },

    onDenied() {
      dispatch({ type: c.DENIED });
    },

    onComplete() {
      dispatch({ type: c.COMPLETE });
    },

    onError() {
      dispatch({ type: c.ERROR });
    }
  };
};
