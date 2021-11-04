import { ResultType } from '@/types/global';
import request from '@/utils/request';
<<<<<<< HEAD
import { GlobalType } from '../type';
=======
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982

export const findAllUser = async (): Promise<ResultType<any>> => {
  return request('/api/users', {
    method: 'GET',
  });
};
<<<<<<< HEAD

export const findUvMaps = async (type: GlobalType): Promise<ResultType<any>> => {
  return request(`/api/uv/maps/${type}`, {
    method: 'GET',
  });
};

export const findUvAll = async (params: {
  type: GlobalType;
}): Promise<ResultType<any>> => {
  return request('/api/uv/statistics', {
    method: 'GET',
    params,
  });
};

export const findPvAll = async (params: {
  type: GlobalType;
}): Promise<ResultType<any>> => {
  return request('/api/pv/statistics', {
    method: 'GET',
    params,
  });
};
=======
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982
