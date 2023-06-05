import request from '@/utils/request';
type UserLoginType = {
  username: string;
  password: string;
};

export default {
  login(data: UserLoginType): Promise<IResponse<UserLoginType>> {
    return request.post({
      url: '/api/user/login',
      data,
    });
  },

  getUserInfo(token: string): Promise<IResponse> {
    return request.get({
      url: '/user/info',
      params: { token },
    });
  },
};
