import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resolveConflicts } from "../store";

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
    <table>
      <tbody>
        {conflicts.map(({ _rev, data }) => (
          <tr key={_rev}>
            <td>{data}</td>
            <td>
              <button type="button" onClick={() => keep(_rev)}>
                Keep this one
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExistingConflictHandler;
