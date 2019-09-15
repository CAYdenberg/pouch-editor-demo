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
  db.get(DEFAULT_DOC_NAME, { conflicts: true }).then(doc => {
    if (!doc._conflicts) return [];
    return Promise.all(
      [db.get(DEFAULT_DOC_NAME)].concat(
        doc._conflicts.map(rev => db.get(DEFAULT_DOC_NAME, { rev }))
      )
    );
  });

export const resolveConflicts = (dataToKeep, revsToRemove) => db =>
  db
    .get(DEFAULT_DOC_NAME)
    .then(({ _rev }) => {
      const canonicalRev = _rev;
      return Promise.all(
        [db.put({ ...dataToKeep, _id: DEFAULT_DOC_NAME, _rev })].concat(
          revsToRemove.map(_rev => {
            if (_rev === canonicalRev) return;
            db.remove(DEFAULT_DOC_NAME, _rev);
          })
        )
      );
    })
    .then(([putResponse]) => putResponse);
