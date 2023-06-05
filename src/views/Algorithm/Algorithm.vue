<template>
  <h2>欢迎</h2>
</template>
<script lang="ts" setup>
import { computed, watch, ref, onMounted, onBeforeMount } from 'vue';
import { useAlgorithmStore } from '@/stores/algorithm';
import { getAlgorithmList } from '@/api/algorithm';
interface Algorithm {
  id: number | string;
  name: string;
  product: string;
  updatedtime: string;
  vendor: string;
}

const algorithmStore = useAlgorithmStore();
const algorithmList = ref<Algorithm[]>([]);
const getListFlag = computed(() => algorithmStore.handleFlag);
watch(getListFlag, (val) => {
  if (val) {
    getData();
  }
});

const getData = () => {
  getAlgorithmList()
    .then((res) => {
      console.log('getAlgorithmList', res);
      if (res.list) {
        algorithmList.value = res.list;
        algorithmStore.handleAlgorithm(false);
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
