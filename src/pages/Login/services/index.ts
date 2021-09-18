import { ResultType } from '@/types/global'
import request from '@/utils/request'

export const postLogin = async (params: any): Promise<ResultType> => {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
} 