<template>
  <div v-show="btnShow" class="action-field">
    <el-button type="primary" size="large" @click="openActionForm">
      <span style="font-size: 14px; font-weight: 600; color: #fff">{{
        btnText
      }}</span>
    </el-button>
  </div>

  <Dialog
    class="animate__animated animate__bounce"
    v-model="dialogVisible"
    :title="btnText"
    :maxHeight="'300px'"
  >
    <el-form
      style="width: 400px"
      ref="btnFormRef"
      :model="btnForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="btnForm"
    >
      <el-form-item :label="labelText" prop="name">
        <el-input v-model="btnForm.name" />
      </el-form-item>
      <el-form-item v-if="route.path === '/camera'" label="rtsp流" prop="url">
        <el-input v-model="btnForm.url" placeholder="rtsp流" />
      </el-form-item>
      <el-form-item
        v-if="route.path === '/task'"
        label="数据来源"
        prop="source"
      >
        <el-select v-model="btnForm.source" placeholder="数据来源">
          <el-option
            v-for="item in cameraOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="route.path === '/task'"
        label="算法模型"
        prop="algorithm"
      >
        <el-select v-model="btnForm.models" placeholder="算法模型">
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务设置" v-if="route.path === '/task'" prop="start">
        <el-radio-group v-model="radioCheck">
          <el-radio label="1">{{ '立刻启动' }}</el-radio>
          <el-radio label="2">{{ '暂不启动' }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="route.path === '/algorithm'">
        <el-upload
          name="file"
          accept=".zip"
          action="/api/setting/algorithm/upload"
          :before-upload="beforeUpload"
          :on-change="uploadChange"
          :auto-upload="false"
        >
          <el-button type="primary">上传模型</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(btnFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(btnFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </Dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ActionField',
});
</script>
<script setup lang="ts">
import { ref, onBeforeMount, computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Dialog } from '@/components';
import { useTaskStore } from '@/stores/task';
import { useAlgorithmStore } from '@/stores/algorithm';
import { useCameraStore } from '@/stores/camera';
import { getCameraList } from '@/api/camera';
import { getAlgorithmList } from '@/api/algorithm';
import { useRoute } from 'vue-router';
const route = useRoute();
const taskStore = useTaskStore();
const algorithmStore = useAlgorithmStore();
const cameraStore = useCameraStore();
const dialogVisible = ref(false);
const btnFormRef = ref<FormInstance>();
const radioCheck = ref(1);
const file = ref(null);
const cameraOptions = ref([]);
const modelOptions = ref([]);
const btnShow = computed(() => {
  return route.path === '/task' ||
    route.path === '/algorithm' ||
    route.path === '/camera'
    ? true
    : false;
});
const btnText = computed(() => {
  return route.path === '/task'
    ? '创建任务'
    : route.path === '/algorithm'
    ? '上传模型'
    : route.path === '/camera'
    ? '添加相机'
    : '';
});
const labelText = computed(() => {
  return route.path === '/task'
    ? '任务名称'
    : route.path === '/algorithm'
    ? '算法名称'
    : route.path === '/camera'
    ? '相机名称'
    : '';
});
const openActionForm = () => {
  dialogVisible.value = true;
  //如果是任务创建，需要有算法和相机的列表
  if (btnText.value === '创建任务') {
    getCameraList()
      .then((res) => {
        console.log('getCameraList', res);
        if (res.list && res.list.length) {
          res.list.forEach((ele) => {
            cameraOptions.value.push({
              label: ele.url,
              value: ele.id,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getAlgorithmList()
      .then((res) => {
        console.log('getAlgorithmList', res);
        if (res.list && res.list.length) {
          res.list.forEach((ele) => {
            modelOptions.value.push({
              label: ele.name,
              value: ele.id,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const btnForm = reactive({
  name: '',
  url: '/home/user/hutao/mp4/text1.mp4',
  start: 0, //创建并启动(根据调度类型判断)
  source: 0, //数据来源(url)
  schedulerType: 'Daemon',
  models: '', //绑定算法id
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  url: [{ required: true, message: '不能为空', trigger: 'blur' }],
  source: [{ required: true, message: '必选', trigger: 'blur' }],
  models: [{ required: true, message: '必选', trigger: 'blur' }],
  start: [{ required: true, message: '必选', trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (btnText.value === '上传模型') {
        const formData = new FormData();
        formData.append('file', file.value);
        formData.append('name', btnForm.name);
        algorithmStore.newAlgorithm(formData);
        console.log('submit task!');
        dialogVisible.value = false;
      } else if (btnText.value === '添加相机') {
        let cd = {
          name: btnForm.name,
          url: btnForm.url,
        };
        cameraStore.newCamera(cd);
        console.log('submit task!');
        dialogVisible.value = false;
      } else if (btnText.value === '创建任务') {
        let td = {
          name: btnForm.name,
          source: btnForm.source,
          models: btnForm.models,
          start: btnForm.start,
          schedulerType: btnForm.schedulerType,
        };
        taskStore.newTask(td);
        console.log('submit task!');
        dialogVisible.value = false;
      }
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const beforeUpload = (file) => {
  // console.log(file)
  file.value = file;
  if (file.name.substr(-4) !== '.zip') {
    ElMessage({
      message: '只能上传 zip格式',
      type: 'error',
    });
    return false;
  }
  return true;
};

const uploadChange = () => {};
onBeforeMount(() => {});
</script>

<style scoped lang="scss">
.action-field {
  padding: 0 30px 0 0;
}
</style>
