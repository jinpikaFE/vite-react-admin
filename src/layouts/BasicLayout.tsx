import React, { useEffect, useState } from 'react';
import {
  DefaultFooter,
  MenuDataItem,
  PageContainer,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import UseRouteChild from '@/hooks/UseRouteChild';
import '@ant-design/pro-layout/dist/layout.css';
import { RouteType } from '@config/routes/type';
import { GithubOutlined } from '@ant-design/icons';
import { queryMenu } from '@/services/global';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input } from 'antd';

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Produced by JinPinKa`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

// 路由菜单，http菜单
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    // const localItem = {
    //   ...item,
    //   // http请求到则使用http相关的，请求失败则路由的，后续改成请求失败，进入失败页面最后做
    //   icon: iconEnum[item.icon as string] || item.icon,
    //   children: item.children ? menuDataRender(item.children) : undefined,
    // };
    return item;
  });

const footerRender = (props: any) => {
  return (
    <a
      style={{
        lineHeight: '48rpx',
        display: 'flex',
        height: 48,
        color: 'rgba(255, 255, 255, 0.65)',
        alignItems: 'center',
      }}
      href="https://preview.pro.ant.design/dashboard/analysis"
      target="_blank"
      rel="noreferrer"
    >
      <img
        alt="pro-logo"
        src="https://procomponents.ant.design/favicon.ico"
        style={{
          width: 16,
          height: 16,
          margin: '0 16px',
          marginRight: 10,
        }}
      />
      {!props?.collapsed && 'Preview Pro'}
    </a>
  );
};
const filterByMenuDate = (
  data: MenuDataItem[],
  keyWord: string,
): MenuDataItem[] =>
  data
    .map((item) => {
      if (
        (item.name && item.name.includes(keyWord)) ||
        filterByMenuDate(item.children || [], keyWord).length > 0
      ) {
        return {
          ...item,
          children: filterByMenuDate(item.children || [], keyWord),
        };
      }

      return undefined;
    })
    .filter((item) => item) as MenuDataItem[];

const BasicLayout: React.FC<{ routes: RouteType[] }> = (props) => {
  const { routes } = props;
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const [pathname, setPathname] = useState<string>('/');
  const [keyWord, setKeyWord] = useState('');
  const history = useHistory();
  useEffect(() => {
    const getMenu = async () => {
      const res = await queryMenu();
      if (res) {
        setMenuData(res.data?.menuData); // res.data?.menuData
      }
    };
    getMenu();
  }, []);
  const location = useLocation();
  // React.useEffect(() => {
  //   ga.send(["pageview", location.pathname]);
  // }, [location]);

  return (
    <ProLayout
      style={{ height: '100vh' }}
      title="Jin Pi Ka"
      footerRender={() => defaultFooterDom}
      onMenuHeaderClick={() => history.push('/home')}
      location={{
        pathname: location?.pathname,
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to="/home">{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      iconfontUrl="//at.alicdn.com/t/font_2827128_yxrpesjeac.js"
      menuFooterRender={footerRender}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps?.isUrl ||
          !menuItemProps?.path ||
          location?.pathname === menuItemProps?.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      menuDataRender={
        menuData?.length > 0 ? () => menuDataRender(menuData) : menuDataRender
      }
      menuExtraRender={({ collapsed }) =>
        !collapsed && (
          <Input.Search
            onSearch={(e) => {
              setKeyWord(e);
            }}
          />
        )
      }
      postMenuData={(menus) => filterByMenuDate(menus || [], keyWord)}
    >
      <PageContainer>{UseRouteChild({ routes })}</PageContainer>
    </ProLayout>
  );
};

export default BasicLayout;
