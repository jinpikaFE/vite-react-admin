import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { Observer } from 'mobx-react';
import QueueAnim from 'rc-queue-anim';
import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs, Space } from 'antd';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Test: React.FC = (props) => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  return (
    <Observer>
      {() => (
        <div style={{ backgroundColor: 'white' }}>
          <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Github"
            subTitle="全球网站"
            actions={
              <Space>
                其他登录方式
                <AlipayCircleOutlined style={iconStyles}></AlipayCircleOutlined>
                <TaobaoCircleOutlined style={iconStyles}></TaobaoCircleOutlined>
                <WeiboCircleOutlined style={iconStyles}></WeiboCircleOutlined>
              </Space>
            }
          >
            <QueueAnim delay={300}>
              <div key="tab">
                <Tabs
                  activeKey={loginType}
                  onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                  <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                  <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                </Tabs>
              </div>
              {loginType === 'account' && (
                <QueueAnim>
                  <div key="account1">
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                      }}
                      placeholder={'用户名: admin or user'}
                      rules={[
                        {
                          required: true,
                          message: '请输入用户名!',
                        },
                      ]}
                    />
                  </div>
                  <div key="account2">
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                      }}
                      placeholder={'密码: ant.design'}
                      rules={[
                        {
                          required: true,
                          message: '请输入密码！',
                        },
                      ]}
                    />
                  </div>
                </QueueAnim>
              )}
              {loginType === 'phone' && (
                <QueueAnim>
                  <div key="phone1">
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <MobileOutlined className={'prefixIcon'} />,
                      }}
                      name="mobile"
                      placeholder={'手机号'}
                      rules={[
                        {
                          required: true,
                          message: '请输入手机号！',
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: '手机号格式错误！',
                        },
                      ]}
                    />
                  </div>
                  <div key="phone2">
                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={'请输入验证码'}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${'获取验证码'}`;
                        }
                        return '获取验证码';
                      }}
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: '请输入验证码！',
                        },
                      ]}
                      onGetCaptcha={async () => {
                        message.success('获取验证码成功！验证码为：1234');
                      }}
                    />
                  </div>
                </QueueAnim>
              )}
              <div
                key="loginBtn"
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  忘记密码
                </a>
              </div>
            </QueueAnim>
          </LoginForm>
        </div>
      )}
    </Observer>
  );
};

export default Test;
