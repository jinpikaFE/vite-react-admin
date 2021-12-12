import React, { useRef } from 'react';
import ComponTree from '@/components/ComponTree';
import ComponFormItem from './components/ComponFormItem';
import { Button, message, Popconfirm } from 'antd';
import { delCompon } from './services';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { IconFont } from '@/types/constants';

const SideMenu: React.FC = () => {
  const refTable = useRef<ActionType>();
  const formRef = useRef();
  const del = async (id: string) => {
    const res = await delCompon(id);
    refTable?.current?.reload();
    window.location.reload();
    message.success(res.message || '删除成功');
  };

  const columns: ProColumns[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '图标',
      width: 60,
      align: 'center',
      dataIndex: 'icon',
      render: (text) => <IconFont type={text as string} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        0: {
          text: '停用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'registerTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 50,
      render: (text, record) => [
        <Button
          type="link"
          key="editable"
          onClick={() => {
            // edit(record);
          }}
        >
          编辑
        </Button>,
        <span key="del">
          {!record?.children && (
            <Popconfirm
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={() => del(record?._id)}
              okText="确定"
              okType="danger"
              cancelText="取消"
            >
              <Button type="link" danger key="delete">
                删除
              </Button>
            </Popconfirm>
          )}
        </span>,
      ],
    },
  ];

  const renderFormItemDom = () => {
    return <ComponFormItem />;
  };

  const onFinish = async (values: any) => {
    //
  };

  return (
    <ComponTree
      onFinish={onFinish}
      formRef={formRef}
      refTable={refTable}
      proTableProps={{ headerTitle: '组件列表' }}
      drawerTitle="新增组件"
      renderFormItemDom={renderFormItemDom}
      columns={columns}
    />
  );
};

export default SideMenu;
