import { DEFAULT_DOC_NAME } from "./constants";

export const open = () => db => db.get(DEFAULT_DOC_NAME);

export const save = (rev, data) => db =>
  db.put({
    _id: DEFAULT_DOC_NAME,
    _rev: rev,
    data
  });

export const forceSave = data => db =>
  db
    .get(DEFAULT_DOC_NAME)
    .then(({ _rev }) => db.put({ _id: DEFAULT_DOC_NAME, _rev, data }));

export const checkForConflicts = () => db =>
  db
    .get(DEFAULT_DOC_NAME, { conflicts: true })
    .then(doc =>
      Promise.all(doc._conflicts.map(rev => db.get(DEFAULT_DOC_NAME, { rev })))
    );

export const resolveConflicts = (dataToKeep, revsToRemove) => db =>
  db
    .get(DEFAULT_DOC_NAME)
    .then(({ _rev }) =>
      Promise.all(
        [db.put({ _id: DEFAULT_DOC_NAME, _rev, ...dataToKeep })].concat(
          revsToRemove.map(rev => db.remove(DEFAULT_DOC_NAME, _rev))
        )
      )
    );
