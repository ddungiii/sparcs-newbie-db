/*
Item example:
{
  name: "과제하기",
  done: false
}
*/
const TodoModel = require("./model/todo");

let ITEMS = [];
let ID_COUNTER = 1;

function getAll(callback) {
  TodoModel.find({}, (error, result) =>{
    if (error) {
      console.log(error);
      callback([]);
    } else {
      callback(result);
    }
  })
}

function add(name, callback) {
  const newItem = new TodoModel({
    name
  });

  newItem.save((error, result) => {
    callback(result);
  })
}

function remove(id, callback) {
  TodoModel.deleteOne({_id: id}, () => {
    callback();
  })
}

function setDone(id, callback) {
  TodoModel.findOne({_id: id}, (error, item) => {
    TodoModel.updateOne({_id: id}, {done: !item.done}, () => {
      callback();
    })
  })
}

module.exports = {
  getAll,
  add,
  remove,
  setDone
};
