import React, { useRef, useState } from 'react';
import ComponTree from '@/components/ComponTree';
import ComponFormItem from './components/ComponFormItem';
import { Button, message, Popconfirm } from 'antd';
import { delCompon } from './services';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { IconFont } from '@/types/constants';
import type { TProColumns } from './type';
import { localeCompon } from '@/stores/compon';
import { toTree } from '@/utils/untils';
import Authorized from '@/utils/Authorized';
import NotFound from '@/components/NotFound';
import { Link } from 'react-router-dom';

const SideMenu: React.FC = () => {
  const refTable = useRef<ActionType>();
  const formRef = useRef();
  const childrenRef = useRef<any>(null);

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
    return (
      // 在组件列表中复制对应的id
      // 当前['admin1', 'test'] 在mock中添加admin即可显示
      <>
        {Authorized.check(
          localeCompon.componData.find(
            (item) => item._id === '61639dadec93bb0b6a96f530223',
          )?.authority,
          <ComponFormItem cRecord={cItem} />,
          <NotFound
            status="403"
            title="403"
            subTitle="对不起！暂无该组件访问权限！请联系管理员或更换账号登录"
            extra={
              (
                <>
                  <p>
                    <Link to={'/15757182982'}>联系管理员</Link>
                  </p>
                  <Button type="primary">
                    <Link to="/login">重新登录</Link>
                  </Button>
                </>
              ) as React.ReactDOM | any
            }
          />,
        )}
      </>
    );
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
        request: async () => {
          const dataTemp = toTree({
            data: JSON.parse(JSON.stringify(localeCompon.componData)),
            key: '_id',
            parentKey: 'parentId',
            cb: (item) => item,
          });
          return {
            data: dataTemp,
            success: true,
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
