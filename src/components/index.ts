import ScaleBox from './ScaleBox.vue';
import EchartItem from './EchartItem.vue';
import Screenfull from './Screenfull.vue';
import CpuMonitor from './CpuMonitor.vue';
import SearchField from './SearchField.vue';
import Dialog from './Dialog.vue';
import ActionField from './ActionField.vue';
import PreviewImg from './PreviewImg.vue';
import type { App } from 'vue';

export {
  ScaleBox,
  EchartItem,
  Screenfull,
  CpuMonitor,
  SearchField,
  Dialog,
  ActionField,
  PreviewImg,
};

const component = [
  ScaleBox,
  EchartItem,
  Screenfull,
  CpuMonitor,
  SearchField,
  Dialog,
  ActionField,
  PreviewImg,
];
const CustomComponent = {
  install(App: App<Element>) {
    component.forEach((item) => {
      App.component(item.name, item);
    });
  },
};

export default CustomComponent;
