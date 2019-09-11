import c from "./constants";

const defaultState = {
  editorState: "",
  documentState: null,
  rev: null,
  isDirty: false
};

export default (initialState = defaultState, action) => {
  switch (action.type) {
    case c.UPDATE_EDITOR: {
      return {
        ...initialState,
        editorState: action.value,
        isDirty: true
      };
    }

    case c.OPEN_SUCCESS: {
      return {
        ...initialState,
        editorState: action.value,
        documentState: action.value,
        rev: action.rev
      };
    }

    case c.SAVE_SUCCESS: {
      return {
        ...initialState,
        rev: action.rev,
        documentState: action.value,
        isDirty: false
      };
    }
  }

  return initialState;
};
