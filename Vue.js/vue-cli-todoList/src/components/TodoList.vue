<template>
    <ul class="todo-main">
        <TodoItem v-for="(todo, index) in todos" :key="index" :index="index" :todo="todo" :deleteTodo="deleteTodo"/>
    </ul>
</template>

<script>
    import TodoItem from './TodoItem'

    export default {
        name: "TodoList",
        props: {
            todos: Array,
            deleteTodo: Function,
        },
        components: {
            TodoItem,
        }
    }
</script>

<style scoped>
    .todo-main {
      margin-left: 0;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0;
    }

    .todo-empty {
      height: 40px;
      line-height: 40px;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding-left: 5px;
      margin-top: 10px;
    }
</style>
