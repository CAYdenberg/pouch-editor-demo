import c from "./constants";
import { DEFAULT_DOC_NAME } from "../constants";

const defaultState = {
  editorState: "",
  documentState: null,
  rev: null,
  isDirty: false,
  hasSaveConflict: false,
  existingConflicts: []
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

    case c.SAVE_CONFLICT: {
      return {
        ...initialState,
        hasSaveConflict: true
      };
    }

    case c.FORCE_SAVE_SUCCESS: {
      return {
        ...initialState,
        rev: action.rev,
        documentState: action.value,
        editorState: action.value,
        isDirty: false,
        hasSaveConflict: false
      };
    }

    case c.CHECK_FOR_CONFLICTS_SUCCESS: {
      return {
        ...initialState,
        existingConflicts: action.conflicts
      };
    }

    case c.RESOLVE_CONFLICTS_SUCCESS: {
      return {
        ...initialState,
        existingConflicts: [],
        rev: action.rev,
        documentState: action.value,
        editorState: action.value,
        isDirty: false,
        hasSaveConflict: false
      };
    }

    case "@@koala-redux/CHANGE": {
      // current document text:
      const { _rev, data } = action.updates.find(
        update => update._id === DEFAULT_DOC_NAME
      );

      // if the editor is no longer up-to-date
      if (initialState.isDirty) {
        return {
          ...initialState,
          documentState: data
        };
      } else {
        return {
          ...initialState,
          documentState: data,
          editorState: data,
          rev: _rev
        };
      }
    }
  }

  return initialState;
};
