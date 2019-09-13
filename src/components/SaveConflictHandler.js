import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { forceSave } from "../store";

const SaveConflictHandler = () => {
  const { hasSaveConflict, documentState, editorState } = useSelector(
    state => state
  );
  const dispatch = useDispatch();

  if (!hasSaveConflict) return null;

  return (
    <table>
      <tbody>
        <tr>
          <td>{documentState}</td>
          <td>{editorState}</td>
        </tr>
        <tr>
          <td>
            <button
              type="button"
              onClick={() => dispatch(forceSave(documentState))}
            >
              Resolve to theirs
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={() => dispatch(forceSave(editorState))}
            >
              Resolve to ours
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SaveConflictHandler;
