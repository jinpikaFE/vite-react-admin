import { ResultType } from '@/types/global';
import request from '@/utils/request';
import { FormUserType } from './type';

export const queryRole = async (params: any): Promise<ResultType<any>> => {
  return request('/api/roles', {
    method: 'GET',
    params
  });
};

export const queryRoleOne = async (id: string): Promise<ResultType<any>> => {
  return request(`/api/roles/${id}`, {
    method: 'GET',
  });
};

export const createRole = async (
  params: FormUserType,
): Promise<ResultType<any>> => {
  return request('/api/roles', {
    method: 'POST',
    data: params,
  });
};

export const delRole = async (id: string): Promise<ResultType<any>> => {
  return request(`/api/roles/${id}`, {
    method: 'DELETE',
  });
};

export const updateRole = async (
  id: string,
  params: FormUserType,
): Promise<ResultType<any>> => {
  return request(`/api/roles/${id}`, {
    method: 'PATCH',
    data: params,
  });
};
