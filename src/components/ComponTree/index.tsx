import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import RightDrawer from '../RightDrawer';
import { ComponProps } from './type';

const ComponTree: React.FC<ComponProps> = React.forwardRef((props, ref) => {
  const {
    columns,
    drawerTitle,
    formRef,
    refTable,
    renderFormItemDom,
    onFinish,
    proTableProps,
    FromProps,
    newBtnTitle,
    cItem,
    setCItem,
  } = props;
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    edit: (record: any) => {
      setCItem(record);
      showDrawer();
    },
  }));

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
    setCItem(undefined);
  };

  return (
    <>
      <ProTable
        // 前面为默认值可通过proTableProps覆盖
        scroll={{ x: 1200 }}
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
            }}
          >
            {newBtnTitle}
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
});

ComponTree.defaultProps = {
  drawerTitle: '新增',
  newBtnTitle: '新增',
};

export default ComponTree;
