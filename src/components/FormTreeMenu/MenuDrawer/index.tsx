import { message, Radio, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import ProForm, { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { MenuDrawerProps, MenuFormType } from './type';
import { createMenu } from '@/services/FromTreeMenu';
import { queryMenu } from '@/services/global';

const MenuDrawer: React.FC<MenuDrawerProps> = (props) => {
  const { onCloseDrawer, visibleDrawer } = props;
  const [treeData, setTreeData] = useState<any[]>([]);
  useEffect(() => {
    if (visibleDrawer) {
      const getData = async () => {
        const res = await queryMenu();
        if (res) {
          const dataTemp: any[] = [];
          res.data.forEach((item: any) => {
            const { _id: value, name: title } = item;
            if (!item?.lastMenu) {
              dataTemp.push({ value, title });
            }
          });
          dataTemp.forEach(item => {
            
          })
          console.log(dataTemp);

          setTreeData(dataTemp);
        }
      };
      getData();
    }
  }, [visibleDrawer]);

  return (
    <DrawerForm<MenuFormType>
      {...{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }}
      title="新建菜单"
      layout="horizontal"
      visible={visibleDrawer}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: onCloseDrawer,
      }}
      onFinish={async (values: MenuFormType) => {
        const res = await createMenu(values);
        if (res) {
          message.success(res.message || '创建成功');
          onCloseDrawer();
        }
      }}
      initialValues={{
        status: 1,
      }}
    >
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
        placeholder="路由路径，例‘/path/paths’"
        rules={[
          { required: true, message: '请输入路由路径!' },
          {
            validator: (rule, value, callback) => {
              const match = new RegExp('^(/[a-zA-Z]+)+$', 'g');
              if (!match.test(value)) {
                callback('请输入正确的路由');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProForm.Item label="上级菜单" name="lastMenu">
        <TreeSelect
          style={{ width: '328px' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="请选择"
          treeDefaultExpandAll
        />
      </ProForm.Item>
      <ProFormText
        width="md"
        name="icon"
        label="图标"
        placeholder="请输入图标名"
        rules={[
          { required: true, message: '请输入图标名!' },
          {
            validator: (rule, value, callback) => {
              const match = new RegExp('^[a-zA-Z]+$', 'g');
              if (!match.test(value)) {
                callback('请输入正确的图标名');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProForm.Item name="status" label="状态">
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={[
            {
              label: '启用',
              value: 1,
            },
            {
              label: '禁用',
              value: 0,
            },
          ]}
        />
      </ProForm.Item>
    </DrawerForm>
  );
};

export default MenuDrawer;
