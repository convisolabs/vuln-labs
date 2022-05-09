const moongose = require('mongoose');

const TodosSchema = new moongose.Schema({
  user_id: { type: moongose.Schema.Types.ObjectId, ref: 'User', index: true },
  todo_description: { type: String },
  is_done: { type: Boolean, require: true, default: false },
});

module.exports = moongose.model('Todos', TodosSchema);