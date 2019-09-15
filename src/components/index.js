import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, updateEditor, save, checkForConflicts } from "../store";
import SaveConflictHandler from "./SaveConflictHandler";
import ExistingConflictHandler from "./ExistingConflictHandler";

const App = () => {
  const editorState = useSelector(state => state.editorState);
  const rev = useSelector(state => state.rev);
  const dispatch = useDispatch();

  return (
    <div>
      <a href="http://localhost:5000/auth/party">Login</a>
      <button type="button" onClick={() => dispatch(open())}>
        Open
      </button>
      <button type="button" onClick={() => dispatch(save(rev, editorState))}>
        Save
      </button>
      <button type="button" onClick={() => dispatch(checkForConflicts())}>
        Check For Conflicts
      </button>
      <textarea
        value={editorState}
        onChange={e => dispatch(updateEditor(e))}
        placeholder="Start typing here"
      />
      <SaveConflictHandler />
      <ExistingConflictHandler />
    </div>
  );
};

export default App;
