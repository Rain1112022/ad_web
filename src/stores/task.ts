import { defineStore } from 'pinia';
import { addTask } from '@/api/task';

export const useTaskStore = defineStore('task', {
  state: () => ({
    handleFlag: false,
  }),

  getters: {
    getHandleFlag: (state) => {
      console.log('useTaskStore getHandleFlag', state.handleFlag);
      return state.handleFlag;
    },
  },

  actions: {
    handleTask(state) {
      this.handleFlag = state;
    },
    newTask(data) {
      return addTask(data)
        .then((res) => {
          console.log('addTask', res);
          this.handleFlag = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
