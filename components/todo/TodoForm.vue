<script setup lang="ts">
import { ref } from 'vue';
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
  <div class="flex flex-col items-center justify-center gap-4 p-4 w-full max-w-md">
    <UInput v-model="newTodo" placeholder="新しいタスクを入力" class="w-full" />
    <UButton @click="addTask" label="タスクを追加" color="primary" class="cursor-pointer" />
  </div>
</template>
