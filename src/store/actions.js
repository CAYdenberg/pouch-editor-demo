import c from "./constants";

export const updateEditor = e => ({
  type: c.UPDATE_EDITOR,
  value: e.target.value
});

export const saveSuccess = (rev, data) => ({
  type: c.SAVE_SUCCESS,
  value: data,
  rev
});

export const save = (rev, data) => ({
  type: c.SAVE,
  pouch: db =>
    db
      .put({
        _id: "poucheg|document",
        _rev: rev,
        data
      })
      .catch(console.error),
  response: ({ rev }) => saveSuccess(rev, data)
});

export const openSuccess = doc => ({
  type: c.OPEN_SUCCESS,
  value: doc.data,
  rev: doc._rev
});

export const open = () => ({
  type: c.OPEN,
  pouch: db => db.get("poucheg|document").catch(console.error),
  response: openSuccess
});
