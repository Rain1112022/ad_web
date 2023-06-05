import request from '@/utils/request';
type AddTaskType = {
  id?: number | string;
  name: string;
  start: number | string;
  source: number | string;
  schedulerType: string;
  models: string;
};
type DelTaskType = {
  ids: number[];
};
type ResetTask = {
  id: number | string;
};

export const getTaskList = (): any => {
  return request.get({ url: '/api/setting/task/list' });
};
export const addTask = (data: AddTaskType): any => {
  return request.post({ url: '/api/setting/task/add', data });
};
export const delTask = (data: DelTaskType): any => {
  return request.post({ url: '/api/setting/task/delete', data });
};
export const updateTask = (data: AddTaskType): any => {
  return request.post({ url: '/api/setting/task/update', data });
};

export const resetTask = (data: ResetTask): any => {
  return request.post({ url: '/api/setting/task/reset', data });
};

export const restartTask = (data: ResetTask): any => {
  return request.post({ url: '/api/setting/task/restart', data });
};

export const startTask = (data: ResetTask): any => {
  return request.post({ url: '/api/setting/task/start', data });
};

export const stopTask = (data: ResetTask): any => {
  return request.post({ url: '/api/setting/task/stop', data });
};
export const previewTask = (data: ResetTask): any => {
  return request.post({ url: '/api/setting/task/preview', data });
};
