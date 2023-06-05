import { defineStore } from 'pinia';
import { uploadAlgorithm } from '@/api/algorithm';

export const useAlgorithmStore = defineStore('algorithm', {
  state: () => ({
    handleFlag: false,
  }),

  getters: {
    getHandleFlag: (state) => {
      console.log('useAlgorithmStore getHandleFlag', state.handleFlag);
      return state.handleFlag;
    },
  },

  actions: {
    handleAlgorithm(state) {
      this.handleFlag = state;
    },
    newAlgorithm(data) {
      return uploadAlgorithm(data)
        .then((res) => {
          console.log('uploadAlgorithm', res);
          this.handleFlag = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
