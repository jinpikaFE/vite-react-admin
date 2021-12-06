import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { Input } from 'antd';
import React, { useState } from 'react';
import { FormBillType } from './type';

const BillForm: React.FC<{
  setCaptcha: React.Dispatch<React.SetStateAction<string>>;
  cItem?: FormBillType;
  formRef?: ProFormInstance | any;
}> = (props) => {
  const { setCaptcha, cItem, formRef } = props;
  const [roleList, setRoleList] = useState<any[]>([]);

  const handleChange = (val: number) => {
    console.log(
      formRef?.current
        ?.getFieldsValue(['exRecords'])
        ?.exRecords?.reduce(
          (total: { value: string | number }, current: { value: number }) => {
            console.log(total, current);
            return total?.value
              ? +total?.value
              : Number(total) + (Number(current?.value) || 0);
          },
        ),
    );
  };

  return (
    <>
      <ProFormDatePicker width="md" name="date" label="日期" />
      <ProFormList
        name="exRecords"
        creatorButtonProps={{
          creatorButtonText: '添加一笔记录',
        }}
        label="消费记录"
      >
        <Input.Group compact>
          <ProFormSelect
            initialValue="diet"
            options={[
              {
                value: 'diet',
                label: '饮食',
              },
              {
                value: 'shop',
                label: '购物',
              },
            ]}
            width="xs"
            name="type"
          />
          <ProFormDigit
            onChange={handleChange}
            name="value"
            placeholder="请输入金额"
            rules={[
              {
                required: true,
                message: '请输入金额',
              },
            ]}
          />
        </Input.Group>
      </ProFormList>
      <ProFormText width="md" name="totalConsume" label="总消费" disabled />
    </>
  );
};

export default BillForm;
