<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import type { Todo, TodoStatus } from '../../types/todo';
import { useTodoStore } from '~/stores/todo';

const todoStore = useTodoStore();
const UButton = resolveComponent('UButton');
const USelect = resolveComponent('USelect');

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
  <UTable ref="table" :data="todoStore.todos" :columns="columns" sticky class="h-140 bg-gray-50"
    :key="todoStore.todos.length">
    <template #expanded="{ row }">
      <pre>{{ row.original }}</pre>
    </template>
  </UTable>
</template>
