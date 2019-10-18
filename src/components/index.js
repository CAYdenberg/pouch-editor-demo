import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, updateEditor, save, checkForConflicts } from "../store";
import SaveConflictHandler from "./SaveConflictHandler";
import ExistingConflictHandler from "./ExistingConflictHandler";

const App = () => {
  const editorState = useSelector(state => state.editorState);
  const rev = useSelector(state => state.rev);
  const isDirty = useSelector(state => state.isDirty);
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-end">
            <a
              className="navbar-item"
              href="http://localhost:5000/auth/twitter"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="section">
          <div className="level">
            <div className="level-left">
              <button
                type="button"
                className="button is-primary"
                onClick={() => dispatch(open())}
              >
                Open
              </button>
              <button
                type="button"
                className="button is-primary"
                onClick={() => dispatch(save(rev, editorState))}
                disabled={!isDirty}
              >
                Save
              </button>
              <button
                type="button"
                className="button is-primary"
                onClick={() => dispatch(checkForConflicts())}
              >
                Check For Conflicts
              </button>
            </div>
          </div>
          <textarea
            className="textarea"
            value={editorState}
            onChange={e => dispatch(updateEditor(e))}
            placeholder="Start typing here"
          />
          <SaveConflictHandler />
          <ExistingConflictHandler />
          <p>
            _rev: <span style={{ fontFamily: "monospace" }}>{rev}</span>
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;
