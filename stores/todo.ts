import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as { id: number; text: string; completed: boolean }[],
  }),
  actions: {
    addTodo(text: string) {
      this.todos.push({ id: Date.now(), text, completed: false });
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
  },
});
