const db = require("../data/dbConfig");

module.exports = {
  addAction
};

function getActionById(id) {
  return db("actions")
    .where({ id })
    .first();
}

function addAction(action) {
  return db("actions")
    .insert(action)
    .then(ids => {
      return getActionById(ids[0]);
    })
    .then(obj => {
      return accomodateKnexsShortcomings(obj);
    });
}

function accomodateKnexsShortcomings(obj) {
  // Use this function to accomodate knex's shortcoming and change an object's "complete" to either true or false, not 1 or 0
  return { ...obj, complete: obj.complete ? true : false };
}
