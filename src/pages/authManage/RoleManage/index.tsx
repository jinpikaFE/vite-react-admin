import RightDrawer from '@/components/RightDrawer';
import { localeCompon } from '@/stores/compon';
import exportToExcel from '@/utils/exportToExcel';
import { toTree } from '@/utils/untils';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-form';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Popconfirm, Tag, TreeSelect } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useFormatMessage } from 'react-intl-hooks';
import RoleFormItem from './components/RoleFormItem';
import { delRole, queryRole, queryRoleOne } from './services';
import { FormRoleType } from './type';

const RoleManager: React.FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [cItem, setCItem] = useState<FormRoleType>();
  const refTable = useRef<ActionType>();
  const formRef = useRef<ProFormInstance | any>();

  const [treeData, setTreeData] = useState<any[]>([]);

  const [datasSource, setDatasSource] = useState<any[]>([]);

  const formatMessage = useFormatMessage();

  const tProps = {
    treeData,
    treeDefaultExpandAll: true,
    placeholder: '请选择',
    allowClear: true,
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  };

  const columns: ProColumns[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '角色名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '权限',
      dataIndex: 'authority',
      renderFormItem: () => {
        return <TreeSelect {...tProps} />;
      },
      render: (text) => (
        <>
          {(text as any[])?.map((item) => (
            <Tag
              key={item?._id}
              color={item?.color}
              style={{ marginBottom: '5px' }}
            >
              {
                formatMessage({
                  id: `component.create.${item?.name}`,
                }) as string
              }
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'registerTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (text, record, _, action) => [
        <Button
          type="link"
          key="editable"
          onClick={() => {
            edit(record?._id);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="del"
          placement="topRight"
          title="确定要删除吗?"
          onConfirm={() => del(record?._id, record?.name)}
          okText="确定"
          okType="danger"
          cancelText="取消"
        >
          <Button type="link" danger key="delete">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    if (localeCompon.componData) {
      const dataTemp = toTree({
        data: JSON.parse(JSON.stringify(localeCompon.componData)),
        key: '_id',
        parentKey: 'parentId',
        cb: (item: any) => {
          item.title = formatMessage({
            id: `component.create.${item.name}`,
          }) as string;
          item.value = item._id;
          if (item?.isLink) {
            item.disabled = true;
            return item;
          }
          return item;
        },
      });
      setTreeData(dataTemp);
    }
  }, [localeCompon.componData]);

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const edit = async (id: string) => {
    const res = await queryRoleOne(id);
    setCItem(res?.data);
    showDrawer();
  };

  const del = async (id: string, name: string) => {
    const res = await delRole(id, name);
    if (res) {
      refTable?.current?.reload();
      message.success(res.message || '删除成功');
    }
  };

  const renderFormItemDom = () => {
    return <RoleFormItem treeData={treeData} />;
  };

  const onFinish = async (values: FormRoleType) => {
    if (cItem) {
      // 编辑逻辑，后端要操作组件数据和角色数据
    } else {
      // 新增逻辑，后端要操作组件数据和角色数据
    }
  };

  return (
    <>
      <ProTable<FormRoleType>
        scroll={{ x: true }}
        bordered
        request={async (params, sorter, filter) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await queryRole({ ...params, ...sorter, ...filter });
          const dataTemp = msg.data?.map((item: any) => {
            item.authority = [];
            JSON.parse(JSON.stringify(localeCompon.componData))?.forEach(
              (c_item: any) => {
                if (c_item.authority.includes(item.name)) {
                  item.authority.push(c_item);
                }
              },
            );
            return item;
          });
          if (msg) {
            // execel导出数据
            setDatasSource(msg.data);
            return {
              data: dataTemp,
              success: true,
              total: msg.total,
            };
          }
          return {
            data: undefined,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: false,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: 0,
          };
        }}
        columns={columns}
        actionRef={refTable}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
        }}
        dateFormatter="string"
        headerTitle="角色列表"
        toolBarRender={() => [
          <Button
            key="out"
            onClick={() => {
              exportToExcel(datasSource, '角色管理');
            }}
          >
            导出数据
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              showDrawer();
              setCItem(undefined);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <RightDrawer
        ref={formRef}
        onCloseDrawer={onCloseDrawer}
        visibleDrawer={visibleDrawer}
        cItem={cItem}
        title="新增角色"
        renderFormItemDom={renderFormItemDom}
        onFinish={onFinish as any}
      />
    </>
  );
};

export default RoleManager;
