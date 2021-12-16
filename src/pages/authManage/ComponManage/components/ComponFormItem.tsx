import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { TProColumns } from '../type';

const ComponFormItem: React.FC<{ cRecord: TProColumns }> = (props) => {
  const { cRecord } = props;

  const [showNotMenu, setShowNotMenu] = useState<boolean>(true);

  useEffect(() => {
    cRecord?.type !== 'menu' && setShowNotMenu(false);
    cRecord?.type === 'menu' && setShowNotMenu(true);
  }, [cRecord?.type]);

  return (
    <>
      <ProFormText width="md" name="parentId" label="上级组件" disabled />
      <ProFormText width="md" name="parentName" label="上级组件名称" disabled />
      <ProFormSelect
        width="md"
        name="type"
        label="组件类型"
        placeholder="请输入选择组件类型"
        rules={[{ required: true, message: '请输入选择组件类型!' }]}
        onChange={(val: string) => {
          val !== 'menu' && setShowNotMenu(false);
          val === 'menu' && setShowNotMenu(true);
        }}
        valueEnum={{
          menu: {
            color: 'blue',
            text: '菜单组件',
          },
          page: {
            color: 'green',
            text: '页面组件',
          },
          component: {
            color: 'volcano',
            text: '普通组件',
          },
        }}
      />
      <ProFormText
        width="md"
        name="name"
        label="组件名称"
        tooltip="最长为 16 位"
        placeholder="请输入组件名称"
        rules={[
          { required: true, message: '请输入组件名称!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('菜单名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      {showNotMenu && (
        <ProFormText
          width="md"
          name="path"
          label="路由路径"
          placeholder="路由路径，例‘/path/paths’,‘https://www.baidu.com/’"
          rules={[
            { required: true, message: '请输入路由路径!' },
            {
              validator: (rule, value, callback) => {
                const match = new RegExp('^(/[a-zA-Z]+)+$', 'g');
                const urlMatch = new RegExp(
                  '^https?://(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+)',
                  'g',
                );
                if (!(match.test(value) || urlMatch.test(value))) {
                  callback('请输入正确的路由');
                } else {
                  callback();
                }
              },
            },
          ]}
        />
      )}
      {showNotMenu && (
        <ProFormText
          width="md"
          name="icon"
          label="图标"
          placeholder="请输入图标名"
          rules={[
            { required: true, message: '请输入图标名!' },
            {
              validator: (rule, value, callback) => {
                const match = new RegExp('^[^\u4e00-\u9fa5]+$', 'g');
                if (!match.test(value)) {
                  callback('请输入正确的图标名');
                } else {
                  callback();
                }
              },
            },
          ]}
        />
      )}
      {showNotMenu && (
        <ProForm.Item name="isLink" label="是否外链">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={[
              {
                label: '否',
                value: 0,
              },
              {
                label: '是',
                value: 1,
              },
            ]}
          />
        </ProForm.Item>
      )}
    </>
  );
};

export default ComponFormItem;
