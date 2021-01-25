const TODOS_KEYS = 'todos_key';

export default {
  saveTodos (todos) {
    window.localStorage.setItem('todos_key', JSON.stringify(todos));
  },

  readTodos () {
    return JSON.parse(window.localStorage.getItem('todos_key') || '[]');
  }
}
