import { ResultType } from '@/types/global';
import request from '@/utils/request';

export const queryCompon = async <T, F>(params: T): Promise<ResultType<F>> => {
  return request('/api/component', {
    method: 'GET',
    params,
  });
};

export const createCompon = async <T, F>(params: T): Promise<ResultType<F>> => {
  return request('/api/menu', {
    method: 'POST',
    data: params,
  });
};

export const delCompon = async <T>(id: string): Promise<ResultType<T>> => {
  return request(`/api/menu/${id}`, {
    method: 'DELETE',
  });
};

export const updateCompon = async <T, F>(
  id: string,
  params: T,
): Promise<ResultType<F>> => {
  return request(`/api/menu/${id}`, {
    method: 'PATCH',
    data: params,
  });
};
