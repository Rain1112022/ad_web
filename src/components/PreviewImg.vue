<template>
  <div class="preview-img">
    <div class="preview-header">
      <div class="info"></div>
      <div class="close"></div>
    </div>
    <div class="preview-body"></div>
    <div class="preview-footer">
      <el-button type="success">有效</el-button>
      <el-button type="danger">无效</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PreviewImg',
});
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps({
  previewInfo: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(['closePreview']);
const scale = ref(1);
const setCanvasImg = () => {
  if (props.previewInfo.url) {
  }
};

const closePreview = () => {
  emits('closePreview', true);
};
onMounted(() => {
  setCanvasImg();
});
</script>

<style scoped lang="scss">
.preview-img {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $darkerFill;
  z-index: 999;
  .preview-header {
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.8);
  }
  .preview-body {
    width: 100%;
    height: calc(100% - 60px);
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    position: relative;
  }
  .preview-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
