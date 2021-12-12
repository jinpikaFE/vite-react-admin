import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useState } from 'react';
import RightDrawer from '../RightDrawer';
import { ComponProps } from './type';

const ComponTree: React.FC<ComponProps> = (props) => {
  const {
    columns,
    drawerTitle,
    formRef,
    refTable,
    renderFormItemDom,
    onFinish,
    proTableProps,
    FromProps,
  } = props;
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  const [cItem, setCItem] = useState<any>();

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const edit = (record: any) => {
    setCItem(record);
    showDrawer();
  };

  return (
    <>
      <ProTable
        // 前面为默认值可通过proTableProps覆盖
        scroll={{ x: 700 }}
        bordered
        actionRef={refTable}
        columns={columns}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="_id"
        search={false}
        pagination={false}
        dateFormatter="string"
        toolBarRender={() => [
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
        {...proTableProps}
      />
      <RightDrawer
        ref={formRef}
        onCloseDrawer={onCloseDrawer}
        visibleDrawer={visibleDrawer}
        cItem={cItem}
        title={drawerTitle}
        renderFormItemDom={renderFormItemDom}
        onFinish={onFinish as any}
        {...FromProps}
      />
    </>
  );
};

ComponTree.defaultProps = {
  drawerTitle: '新增',
};

export default ComponTree;
