import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, updateEditor, save } from "../store";
import ConflictHandler from "./ConflictHandler";

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
      <textarea
        value={editorState}
        onChange={e => dispatch(updateEditor(e))}
        placeholder="Start typing here"
      />
      <ConflictHandler />
    </div>
  );
};

export default App;
