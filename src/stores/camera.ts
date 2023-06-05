import { defineStore } from 'pinia';
import { addCamera } from '@/api/camera';

export const useCameraStore = defineStore('camera', {
  state: () => ({
    handleFlag: false,
  }),

  getters: {
    getHandleFlag: (state) => {
      console.log('useCameraStore getHandleFlag', state.handleFlag);
      return state.handleFlag;
    },
  },

  actions: {
    handleCamera(state) {
      this.handleFlag = state;
    },
    newCamera(data) {
      return addCamera(data)
        .then((res) => {
          console.log('addCamera', res);
          this.handleFlag = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
