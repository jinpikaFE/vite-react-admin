import { ResultType } from '@/types/global';
import request from '@/utils/request';
import { FormRoleType } from './type';

export const queryRole = async (): Promise<ResultType<any>> => {
  return request('/api/roles', {
    method: 'GET',
  });
};

export const queryRoleOne = async (id: string): Promise<ResultType<any>> => {
  return request(`/api/roles/${id}`, {
    method: 'GET',
  });
};

export const createRole = async (
  params: FormRoleType,
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
  params: FormRoleType,
): Promise<ResultType<any>> => {
  return request(`/api/roles/${id}`, {
    method: 'PATCH',
    data: params,
  });
};