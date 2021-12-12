import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Radio, TreeSelect } from 'antd';
import React from 'react';

const ComponFormItem: React.FC = () => {
  return (
    <>
      <ProFormText
        width="md"
        name="name"
        label="菜单名称"
        tooltip="最长为 16 位"
        placeholder="请输入菜单名称"
        rules={[
          { required: true, message: '请输入菜单名称!' },
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
      {/* <ProForm.Item label="上级菜单" name="lastMenu">
      <TreeSelect
        allowClear
        className='input-fix-md'
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择"
      />
    </ProForm.Item> */}
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
    </>
  );
};

export default ComponFormItem;
