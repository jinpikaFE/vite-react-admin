import { Tooltip, Dropdown, Menu } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import {
  createFromIconfontCN,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import HeaderSearch from '../HeaderSearch';
import styles from './index.module.less';
import { ICON_URL, LANGUAGE_MENU } from '@/types/constants';
import { Observer } from 'mobx-react';
import { localeLanguage } from '@/stores/language';

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
} & Partial<ProSettings>;

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const IconFont = createFromIconfontCN({
    scriptUrl: ICON_URL,
  });

  const onClickMenu = ({ key }: any) => {
    localeLanguage.setLocaleLang(key);
  };

  const menu = (
    <Observer>
      {() => (
        <Menu
          defaultSelectedKeys={[localeLanguage?.localeLang]}
          onClick={onClickMenu}
        >
          {Object.keys(LANGUAGE_MENU).map((item) => (
            <Menu.Item key={item}>{(LANGUAGE_MENU as any)[item]}</Menu.Item>
          ))}
        </Menu>
      )}
    </Observer>
  );

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Site Search"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <Tooltip title="Use documentation">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        className={styles.action}
      >
        <IconFont type="icon-wenben" />
      </Dropdown>
    </div>
  );
};

export default GlobalHeaderRight;
