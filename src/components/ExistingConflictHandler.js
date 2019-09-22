import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resolveConflicts } from "../store";
import Modal from "./Modal";

const ExistingConflictHandler = () => {
  const conflicts = useSelector(state => state.existingConflicts);
  const dispatch = useDispatch();

  if (conflicts.length < 2) return null;

  const keep = revToKeep => {
    const dataToKeep = conflicts.find(doc => doc._rev === revToKeep);
    const revsToRemove = conflicts
      .map(doc => doc._rev)
      .filter(rev => rev !== revToKeep);
    dispatch(resolveConflicts(dataToKeep, revsToRemove));
  };

  return (
    <Modal title="Existing conflict detected">
      <div className="columns">
        {conflicts.map(({ _rev, data }) => (
          <div className="column is-half" key={_rev}>
            <div>{data}</div>
            <button
              type="button"
              className="button is-info"
              onClick={() => keep(_rev)}
            >
              Keep this one
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ExistingConflictHandler;
