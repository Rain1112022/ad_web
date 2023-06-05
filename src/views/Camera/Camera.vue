<template>
  <h2>欢迎</h2>
</template>
<script lang="ts" setup>
import { computed, watch, ref, onMounted, onBeforeMount } from 'vue';
import { useCameraStore } from '@/stores/camera';
import { getCameraList } from '@/api/camera';
interface Camera {
  id: number | string;
  name: string;
  updatedtime: string;
  url: string;
}

const cameraStore = useCameraStore();
const cameraList = ref<Camera[]>([]);
const getListFlag = computed(() => cameraStore.handleFlag);
watch(getListFlag, (val) => {
  if (val) {
    getData();
  }
});

const getData = () => {
  getCameraList()
    .then((res) => {
      console.log('getCameraList', res);
      if (res.list) {
        cameraList.value = res.list;
        cameraStore.handleCamera(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onBeforeMount(() => {
  getData();
});

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
