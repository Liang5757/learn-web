<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <todo-header :addTodo="addTodo"/>
            <TodoList :todos="todos" :deleteTodo="deleteTodo"/>
            <TodoFooter :todos="todos" :deleteAllChecked="deleteAllChecked" :selectAll="selectAll"/>
        </div>
    </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'
import StorageUtil from "./utils/StorageUtil";

export default {
    name: "App",
    components: {
      TodoHeader,
      TodoList,
      TodoFooter,
    },
    data () {
        return {
            // 从localStorage中读取todos
            todos: StorageUtil.readTodos(),
        }
    },
    watch: {
        todos: {
            deep: true,   // 深度监视
            handler: StorageUtil.saveTodos,
        }
    },
    methods: {
      addTodo (todo) {
          this.todos.unshift(todo);
      },

      deleteTodo (index) {
          this.todos.splice(index, 1);
      },

      // 删除所有选中的todo
      deleteAllChecked () {
          this.todos = this.todos.filter(todo => !todo.complete)
      },

      // 全选/全不选
      selectAll (check) {
          this.todos.forEach(todo => todo.compete = check);
      }
    },
}
</script>

<style scoped>
    .todo-container {
      width: 600px;
      margin: 0 auto;
    }

    .todo-container .todo-wrap {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
</style>
