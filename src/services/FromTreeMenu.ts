import { MenuFormType } from '@/components/FormTreeMenu/MenuDrawer/type';
import { ResultType } from '@/types/global';
import request from '@/utils/request';

export const createMenu = async (
  params: MenuFormType,
): Promise<ResultType<any>> => {
  return request('/api/menu', {
    method: 'POST',
    data: params,
  });
};
