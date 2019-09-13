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
