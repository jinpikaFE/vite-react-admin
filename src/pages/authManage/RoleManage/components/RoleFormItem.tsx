import ProForm, { ProFormText } from '@ant-design/pro-form';
import { TreeSelect } from 'antd';
import React from 'react';

const RoleFormItem: React.FC<{ treeData: any[] }> = (props) => {
  const { treeData } = props;

  const tProps = {
    treeData,
    treeDefaultExpandAll: true,
    treeCheckable: true,
    treeCheckStrictly: true,
    showCheckedStrategy: TreeSelect.SHOW_ALL,
    placeholder: '请选择',
    allowClear: true,
    className: 'input-fix-md',
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  };

  return (
    <>
      <ProFormText
        width="md"
        name="name"
        label="角色名"
        tooltip="最长为 16 位"
        placeholder="请输入角色名"
        rules={[
          { required: true, message: '请输入角色名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('角色名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProForm.Item
        label="权限"
        name="authority"
        rules={[{ required: true, message: '请选择权限!' }]}
      >
        <TreeSelect {...tProps} />
      </ProForm.Item>
    </>
  );
};

export default RoleFormItem;
