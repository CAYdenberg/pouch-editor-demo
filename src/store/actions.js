import c from "./constants";
import * as db from "../db";

export const updateEditor = e => ({
  type: c.UPDATE_EDITOR,
  value: e.target.value
});

export const openSuccess = doc => ({
  type: c.OPEN_SUCCESS,
  value: doc.data,
  rev: doc._rev
});

export const open = () => ({
  type: c.OPEN,
  pouch: db.open(),
  response: openSuccess,
  error: console.error
});

export const saveSuccess = (rev, data) => ({
  type: c.SAVE_SUCCESS,
  value: data,
  rev
});

export const saveError = (error, data) => {
  if (error.status === 409) {
    return {
      type: c.SAVE_CONFLICT
    };
  }
  console.error(error);
};

export const save = (rev, data) => ({
  type: c.SAVE,
  pouch: db.save(rev, data),
  response: ({ rev }) => saveSuccess(rev, data),
  error: error => saveError(error, data)
});

export const forceSaveSuccess = (rev, data) => ({
  type: c.FORCE_SAVE_SUCCESS,
  rev,
  value: data
});

export const forceSave = data => ({
  type: c.FORCE_SAVE,
  pouch: db.forceSave(data),
  response: ({ rev }) => forceSaveSuccess(rev, data),
  error: console.error
});

export const checkForConflictsSuccess = conflicts => ({
  type: c.CHECK_FOR_CONFLICTS_SUCCESS,
  conflicts
});

export const checkForConflicts = () => ({
  type: c.CHECK_FOR_CONFLICTS,
  pouch: db.checkForConflicts(),
  response: checkForConflictsSuccess,
  error: console.error
});

export const resolveConflictsSuccess = (rev, dataToKeep) => ({
  type: c.RESOLVE_CONFLICTS_SUCCESS,
  rev,
  value: dataToKeep.data
});

export const resolveConflicts = (dataToKeep, revsToRemove) => ({
  type: c.RESOLVE_CONFLICTS,
  pouch: db.resolveConflicts(dataToKeep, revsToRemove),
  response: ({ rev }) => resolveConflictsSuccess(rev, dataToKeep),
  error: console.error
});
