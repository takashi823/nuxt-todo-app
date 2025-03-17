import { defineStore } from 'pinia';
import { reactive, nextTick } from 'vue';
import type { Todo, TodoStatus } from '../types/todo';

const INITIAL_TODO_STATE: TodoStatus = 'not_started';

export const useTodoStore = defineStore<
  'todo',
  { todos: Todo[] },
  {},
  {
    addTodo: (title: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    updateTodoStatus: (id: number, status: TodoStatus) => void; // 新しいメソッドを追加
  }
>('todo', {
  state: () => ({
    // todos を reactive でラップ
    todos: reactive([]),
  }),
  actions: {
    async addTodo(title: string) {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        createDate: new Date(),
        status: INITIAL_TODO_STATE,
      };

      this.todos.push(newTodo);
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) todo.status = todo.status;
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    updateTodoStatus(id: number, status: TodoStatus) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.status = status;
      }
    },
  },
});
