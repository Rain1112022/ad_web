<template>
  <el-row class="navbar">
    <el-col :span="6" class="navbar-left">
      <Hamburger
        id="hamburger-container"
        :is-active="sidebarOpened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <RouterBreadcrumb
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </el-col>
    <el-col :span="18" class="navbar-right">
      <SearchField></SearchField>
      <ActionField></ActionField>
      <CpuMonitor></CpuMonitor>
      <Screenfull></Screenfull>
      <Avatar></Avatar>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';
import Hamburger from './Humburger.vue';
import RouterBreadcrumb from './RouterBreadcrumb.vue';
import Avatar from './Avatar.vue';
import { Screenfull, CpuMonitor, SearchField, ActionField } from '@/components';
const appStore = useAppStore();
const sidebarOpened = computed(() => appStore.sidebar.opened);
function toggleSideBar() {
  appStore.toggleSideBar();
}
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: $menuBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .navbar-left {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .hamburger-container {
      line-height: 60px;
      height: 100%;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .breadcrumb-container {
      line-height: 60px;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .navbar-right {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
