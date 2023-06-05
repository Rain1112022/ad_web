<template>
  <div class="detail-container">
    <div class="detail-table">
      <el-table
        ref="multipleTableRef"
        :data="tableData()"
        style="width: 100%"
        max-height="760"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" width="55" />
        <el-table-column prop="name" label="事件名称" width="200" />
        <el-table-column prop="task" label="任务名称" width="200" />
        <el-table-column prop="camera" label="数据来源" width="200">
        </el-table-column>
        <el-table-column prop="manualLabel" label="人工标记状态" width="200">
          <template #default="scope">
            <el-tag
              size="large"
              :type="
                scope.row.manualLabel === 0
                  ? 'danger'
                  : scope.row.manualLabel === 1
                  ? 'success'
                  : 'info'
              "
              >{{
                scope.row.manualLabel === 0
                  ? '未处理'
                  : scope.row.manualLabel === 1
                  ? '有效'
                  : '无效'
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="240" />
        <el-table-column prop="url" label="预览" width="240">
          <template #default="scope">
            <img :src="scope.row.url" height="80" alt="" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              @click="handleRemark(scope.$index, scope.row)"
              >标记</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-block">
      <div class="select-content">
        <el-button
          type="danger"
          plain
          v-show="delBtnShow"
          @click="handleDelete()"
          >删除</el-button
        >
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total ,prev, pager, next ,sizes"
        :total="state.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>

  <PreviewImg
    v-if="preImgShow"
    :previewInfo="previewInfo"
    @closePreview="closePreview"
  ></PreviewImg>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeMount, ref, computed } from 'vue';
import { getMessageList, delMessage, remarkMessage } from '@/api/message';
import { ElTable } from 'element-plus';
import { PreviewImg } from '@/components';

interface Event {
  id: number | string;
  name: string;
  task: any;
  manualLabel: number;
  camera: any;
  url: string;
  time: string;
  boxes: any;
}
let dataList = ref<Event[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const preImgShow = ref(false);
const delBtnShow = computed(() => {
  return multipleSelectionList.value.length;
});

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelectionList = ref<Event[]>([]);
const previewInfo = ref<Event>();
const state = reactive({
  page: 1,
  limit: 10,
  total: dataList.value.length,
});
const getList = () => {
  getMessageList().then((res) => {
    console.log(res);
    if (res.length) {
      dataList.value = res;
    } else {
      dataList.value = [
        {
          id: 1,
          name: 'xxx',
          task: 'xxx',
          manualLabel: 0,
          camera: 'ugslifgskrjgsr',
          url: 'Ygfbcoida',
          time: 'hSUhdvcjpzlvhdjbkfvlzhakrjfhkd',
          boxes: {},
        },
      ];
    }
  });
};
const handleSelectionChange = (val: Event[]) => {
  multipleSelectionList.value = val;
};
const handleDelete = () => {
  let ids = [];
  if (multipleSelectionList.value && multipleSelectionList.value.length) {
    multipleSelectionList.value.forEach((ele) => {
      ids.push(ele.id);
    });
  }
  delMessage({ ids }).then((res) => {
    console.log('删除结果', res);
  });
};
const handleRemark = (index: number, row: Event) => {
  // console.log('标记', index, row);
  preImgShow.value = true;
  previewInfo.value = row;
  // remarkMessage({ id: row.id }).then((res) => {
  //   console.log('标记结果', res);
  // });
};
const closePreview = () => {
  preImgShow.value = false;
};
//限制分页（tableData为当前展示页表格）
const tableData = () => {
  // console.log(dataList.value.length);
  state.total = dataList.value.length;
  return dataList.value.filter(
    (item, index) =>
      item &&
      index < state.page * state.limit &&
      index >= state.limit * (state.page - 1)
  );
};
//改变页码
const handleCurrentChange = (e: number) => {
  state.page = e;
};
//改变页数限制
const handleSizeChange = (e: number) => {
  state.limit = e;
};
onBeforeMount(() => {
  getList();
});

onMounted(() => {
  // getList();
});
</script>

<style lang="scss" scoped>
.detail-container {
  width: 100%;
  height: 100%;
  border: 1px solid var(--el-text-color-regular);
  padding: 10px;
  // overflow: hidden;
  position: relative;
  .detail-table {
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
  }
  .pagination-block {
    width: 100%;
    height: 80px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--el-border-color-lighter);
    .select-content {
    }
    // .el-pagination {
    //   justify-content: flex-end;
    // }
  }
}
</style>
