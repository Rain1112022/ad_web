<template>
  <div class="search-field">
    <el-input
      v-model="searchInput"
      :placeholder="route.meta.title"
      class="input-with-select"
      :prefix-icon="Search"
      @change="inputChange"
      size="large"
    >
      <template #append>
        <span class="search-filter" @click="openSearchForm">
          <el-icon :size="20" color="#409eff"><Filter /></el-icon>
        </span>
      </template>
    </el-input>
  </div>
  <Dialog v-model="dialogVisible" :title="dialogTitle">
    {{ dialogTitle }}
  </Dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SearchField',
});
</script>
<script setup lang="ts">
import { ref, onMounted, toRaw, computed } from 'vue';
import { Dialog } from '@/components';
// import { getJournalById, getJournalByPlate } from '@/api/journal';
import { Search } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const searchInput = ref('');
const dialogVisible = ref(false);
const dialogTitle = computed(() => route.meta.title);

const openSearchForm = () => {
  console.log(toRaw(route.path));
  dialogVisible.value = true;
  if (route.path) {
  }
};
const inputChange = () => {};

const getData = () => {};
onMounted(() => {
  getData();
});
</script>

<style scoped lang="scss">
.search-field {
  padding: 0 30px 0 0;
  .search-filter {
    display: flex;
    align-items: center;
  }
}
</style>
