import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { forceSave } from "../store";
import Modal from "./Modal";

const SaveConflictHandler = () => {
  const { hasSaveConflict, documentState, editorState } = useSelector(
    state => state
  );
  const dispatch = useDispatch();

  if (!hasSaveConflict) return null;

  return (
    <Modal title="Conflict while saving">
      <div className="columns">
        <div className="column is-half">
          <div>{documentState}</div>
          <button
            className="button is-info"
            type="button"
            onClick={() => dispatch(forceSave(documentState))}
          >
            Resolve to theirs
          </button>
        </div>
        <div className="column is-half">
          <div>{editorState}</div>
          <button
            className="button is-info"
            type="button"
            onClick={() => dispatch(forceSave(editorState))}
          >
            Resolve to ours
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveConflictHandler;
