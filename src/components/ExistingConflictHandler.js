import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ExistingConflictHandler = () => {
  const conflicts = useSelector(state => state.existingConflicts);
  const dispatch = useDispatch();

  if (!conflicts.length) return null;

  return (
    <table>
      <tbody>
        {conflicts.map(({ _rev, data }) => (
          <tr>
            <td>{data}</td>
            <td>
              <button type="button">Keep this one</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExistingConflictHandler;
