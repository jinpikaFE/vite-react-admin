import React, { useRef, useState } from 'react';
import ComponTree from '@/components/ComponTree';
import ComponFormItem from './components/ComponFormItem';
import { Button, message, Popconfirm } from 'antd';
import { delCompon, queryCompon } from './services';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { IconFont } from '@/types/constants';
import type { TParams, TProColumns } from './type';
import worker_script from '@/works/works';

const myWorker = new Worker(worker_script);

const SideMenu: React.FC = () => {
  const refTable = useRef<ActionType>();
  const formRef = useRef();
  const childrenRef = useRef<any>(null);

  const [dataSource, setDataSource] = useState<any[]>([]);

  const [cItem, setCItem] = useState<TProColumns | any>();

  const del = async (id: string) => {
    const res = await delCompon(id);
    refTable?.current?.reload();
    window.location.reload();
    message.success(res.message || '删除成功');
  };

  const columns: ProColumns<TProColumns>[] = [
    {
      title: '组件名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: 'ID',
      dataIndex: '_id',
      copyable: true,
      ellipsis: true,
      width: '10%',
    },
    {
      title: '图标',
      width: 60,
      align: 'center',
      dataIndex: 'icon',
      render: (text) => <IconFont type={text as string} />,
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      width: '10%',
      valueEnum: {
        menu: { text: '菜单组件', color: 'green' },
        page: {
          text: '页面组件',
          color: 'pink',
        },
        component: {
          text: '普通组件',
          color: 'blue',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'registerTime',
      valueType: 'dateTime',
      width: '10%',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <Button
          type="link"
          key="addChild"
          onClick={() => {
            childrenRef.current?.edit({
              parentId: record?._id,
              parentName: record?.name,
            });
          }}
        >
          添加子组件
        </Button>,
        <Button
          type="link"
          key="editable"
          onClick={() => {
            setCItem(record);
            childrenRef.current?.edit(record);
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
    return <ComponFormItem cRecord={cItem} />;
  };

  const onFinish = async (values: any) => {
    console.log(values);

    if (cItem && cItem?.name) {
      // 编辑逻辑
      console.log('编辑逻辑');
    } else {
      // 新增逻辑
      console.log('新增逻辑');
    }
  };

  return (
    <ComponTree
      ref={childrenRef}
      onFinish={onFinish}
      formRef={formRef}
      refTable={refTable}
      newBtnTitle="添加一级组件"
      proTableProps={{
        headerTitle: '组件列表',
        dataSource,
        request: async (params, sorter, filter) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          const res = await queryCompon<TParams, TProColumns[]>({
            ...params,
            ...sorter,
            ...filter,
          });
          if (res) {
            // 利用web worker线层进行树级遍历
            myWorker.postMessage({
              data: res?.data,
              key: '_id',
              parentKey: 'parentId',
              cb: ((item: any) => item).toString(),
            });
            new Promise((resolve) => {
              myWorker.onmessage = (m) => {
                setDataSource(m?.data);
                myWorker.terminate();
                resolve(m?.data);
              };
            }).then(() => myWorker.terminate());
          }
          return {
            data: undefined,
            success: false,
            total: 0,
          };
        },
      }}
      FromProps={{
        initialValues: {
          isLink: 0,
          parentId: cItem?.parentId,
        },
      }}
      cItem={cItem}
      setCItem={setCItem}
      drawerTitle="新增组件"
      renderFormItemDom={renderFormItemDom}
      columns={columns}
    />
  );
};

export default SideMenu;
