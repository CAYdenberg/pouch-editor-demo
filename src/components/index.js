import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, updateEditor, save } from "../store";

const App = () => {
  const editorState = useSelector(state => state.editorState);
  const rev = useSelector(state => state.rev);
  const dispatch = useDispatch();

  return (
    <div>
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
    </div>
  );
};

export default App;
