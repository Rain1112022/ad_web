import request from '@/utils/request';
type AddCameraType = {
  name: string;
  url: string;
};
type UpdateCameraType = {
  id: number | string;
  name: string;
  url: string;
};
type DelCameraType = {
  ids: number[];
};

export const getCameraList = (): any => {
  return request.get({ url: '/api/setting/camera/list' });
};

export const addCamera = (data: AddCameraType): any => {
  return request.post({ url: '/api/setting/camera/add', data });
};

export const updateCamera = (data: UpdateCameraType): any => {
  return request.post({ url: '/api/setting/camera/update', data });
};
export const delCamera = (data: DelCameraType): any => {
  return request.post({ url: '/api/setting/camera/update', data });
};
