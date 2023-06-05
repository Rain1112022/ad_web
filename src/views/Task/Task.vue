<template>
  <h2>欢迎</h2>
</template>
<script lang="ts" setup>
import { computed, watch, ref, onMounted, onBeforeMount } from 'vue';
import { useTaskStore } from '@/stores/task';
import { getTaskList } from '@/api/task';
interface Task {
  id: number | string;
  name: string;
  source: number | string;
  models: number | string;
  start: number | string;
  schedulerType: string;
}

const taskStore = useTaskStore();
const taskList = ref<Task[]>([]);
const getListFlag = computed(() => taskStore.handleFlag);
watch(getListFlag, (val) => {
  if (val) {
    getData();
  }
});

const getData = () => {
  getTaskList()
    .then((res) => {
      console.log('getTaskList', res);
      if (res.list) {
        taskList.value = res.list;
        taskStore.handleTask(false);
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
