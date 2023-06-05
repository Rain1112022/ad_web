import request from '@/utils/request';
type DelMessageType = {
  ids: number[];
};
type PreviewMessage = {
  id: number | string;
};
export const getMessageList = (): any => {
  return request.get({ url: '/api/setting/warning_record/list' });
};
export const previewMessage = (data: PreviewMessage): any => {
  return request.post({
    url: '/api/setting/warning_record/preview',
    data,
  });
};
export const delMessage = (data: DelMessageType): any => {
  return request.post({
    url: '/api/setting/warning_record/batch_delete',
    data,
  });
};

export const remarkMessage = (data: PreviewMessage): any => {
  return request.post({
    url: '/api/setting/warning_record/remark',
    data,
  });
};
