import request from '@/utils/request';

export const getCpuState = (): any => {
  return request.get({ url: '' });
};
