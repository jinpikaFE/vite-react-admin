import { ResultType } from '@/types/global'
import request from '@/utils/request'

export const queryMenu = async (): Promise<ResultType> => {
  return request('/api/menu', {
    method: 'GET'
  });
} 