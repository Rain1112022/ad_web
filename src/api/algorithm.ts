import request from '@/utils/request';

type DelAlgorithm = {
  ids: number[];
};

export const getAlgorithmList = (): any => {
  return request.get({ url: '/api/setting/algorithm/list' });
};

export const uploadAlgorithm = (data: any): any => {
  return request.post({ url: '/api/setting/algorithm/upload', data });
};

export const delAlgorithm = (data: DelAlgorithm): any => {
  return request.post({ url: '/api/setting/algorithm/batch_delete', data });
};
