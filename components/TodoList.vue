<script setup>
import { useTodoStore } from '~/stores/todo';

const todoStore = useTodoStore();
const newTodo = ref('');

const addTask = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value);
    newTodo.value = '';
  }
};
</script>

<template>
  <div>
    <h2>ToDo リスト</h2>
    <div>
      <input v-model="newTodo" placeholder="新しいタスクを入力" />
      <button @click="addTask">追加</button>
    </div>
    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <span @click="todoStore.toggleTodo(todo.id)">
          {{ todo.text }}
        </span>
        <button @click="todoStore.removeTodo(todo.id)">削除</button>
      </li>
    </ul>
  </div>
</template>
