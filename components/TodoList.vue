<script setup lang="ts">

import { useTodoStore } from '~/stores/todo';
import { h, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import type { Todo, TodoStatus } from '../types/todo';

const UButton = resolveComponent('UButton')
const USelect = resolveComponent('USelect')

const todoStore = useTodoStore();
const newTodo = ref('');

const addTask = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value);
    newTodo.value = '';
  }
};

const columns: TableColumn<Todo>[] = [{
  accessorKey: 'id',
  header: 'ID',
  cell: ({ row }) => `#${row.original.id}`,
}, {
  accessorKey: 'title',
  header: 'タスク',
  cell: ({ row }) => h('div', { class: 'lowercase' }, row.original.title),
}, {
  accessorKey: 'date',
  header: '追加日時',
  cell: ({ row }) => new Date(row.original.createDate).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}, {
  accessorKey: 'status',
  header: '状態',
  cell: ({ row }) => {
    const currentStatus = row.original.status;
    return h(USelect, {
      modelValue: currentStatus,
      'onUpdate:modelValue': (value: TodoStatus) => {
        todoStore.updateTodoStatus(row.original.id, value);
      },
      items: [
        { label: '未着手', value: 'not_started' },
        { label: '進行中', value: 'in_progress' },
        { label: '完了', value: 'completed' }
      ],
      class: 'cursor-pointer'
    });
  }
}, {
  id: 'delete',
  header: '削除',
  cell: ({ row }) => {
    return h(UButton, {
      label: '削除',
      color: 'warning',
      onClick: () => {
        todoStore.removeTodo(row.original.id);
      },
      class: 'cursor-pointer'
    });
  }
}];
</script>

<template>
  <div class="flex-1 w-full">
    <div class="flex flex-col items-center justify-center gap-4 px-4 py-4 w-full">
      <h2 class="text-2xl font-semibold text-gray-800">新しいタスクを追加</h2>
      <p class="text-lg text-gray-600">タスクを入力して「追加」ボタンをクリックしてください。</p>
      <div class="flex flex-col items-center gap-4 p-4 w-full max-w-md">
        <UInput v-model="newTodo" placeholder="新しいタスクを入力" class="w-full" />
        <UButton @click="addTask" label="タスクを追加" color="primary" class="cursor-pointer" />
      </div>
    </div>
    <UTable ref="table" :data="todoStore.todos" :columns="columns" sticky class="h-140 bg-gray-50"
      :key="todoStore.todos.length">
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>
  </div>
</template>
