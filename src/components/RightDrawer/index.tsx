import React, { useEffect, useRef } from 'react';
<<<<<<< HEAD
import { DrawerForm, ProFormInstance } from '@ant-design/pro-form';
import { RightDrawerProps } from './type';
import styles from './index.module.less'
=======
import {
  DrawerForm,
  ProFormInstance,
} from '@ant-design/pro-form';
import { RightDrawerProps } from './type';
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982

const RightDrawer: React.FC<RightDrawerProps> = (props) => {
  const {
    onCloseDrawer,
    visibleDrawer,
    cItem,
    onFinish,
    title,
    renderFormItemDom,
<<<<<<< HEAD
    initialValues,
=======
    initialValues
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982
  } = props;
  const formRef = useRef<ProFormInstance | any>();

  useEffect(() => {
    if (visibleDrawer && cItem) {
      formRef?.current?.resetFields();
      formRef?.current?.setFieldsValue(cItem);
    }
  }, [visibleDrawer, cItem]);

  useEffect(() => {
    if (!cItem) {
      formRef?.current?.resetFields();
    }
<<<<<<< HEAD
  }, [cItem]);

  return (
    <DrawerForm
      className={styles.drawerForm}
=======
  }, [cItem])

  return (
    <DrawerForm
>>>>>>> e8fbd1edc97f6d3e693548c2636cdddfcdf2f982
      {...{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }}
      title={title}
      layout="horizontal"
      visible={visibleDrawer}
      drawerProps={{
        forceRender: true,
        // destroyOnClose: true,
        onClose: onCloseDrawer,
      }}
      onFinish={onFinish}
      initialValues={initialValues}
      formRef={formRef}
    >
      {renderFormItemDom()}
    </DrawerForm>
  );
};

export default RightDrawer;
