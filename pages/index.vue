<script setup>
import TodoForm from '~/components/todo/TodoForm.vue';
import TodoTable from '~/components/todo/TodoTable.vue';
</script>

<template>
  <div class="flex-1 w-full p-6">
    <h1 class="text-4xl font-semibold text-gray-800 text-center mb-6">ToDo管理アプリケーション</h1>
    <div class="flex flex-col items-center justify-center gap-4 px-4 py-4 w-full">
      <h2 class="text-2xl font-semibold text-gray-800">新しいタスクを追加</h2>
      <p class="text-lg text-gray-600">タスクを入力して「追加」ボタンをクリックしてください。</p>
      <TodoForm />
    </div>
    <TodoTable />
  </div>
</template>
