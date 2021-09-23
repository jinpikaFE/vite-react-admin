import React from 'react';
import ReactDOM from 'react-dom';
import RouterView from '@/components/RouterView';
import 'antd/dist/antd.less';
import './index.less';
import { IntlProvider } from 'react-intl-hooks';
import locale_en from './locales/en-US';
import locale_cn from './locales/zh-CN';
import locale_id from './locales/id-ID';
import locale_jp from './locales/ja-JP';
import locale_br from './locales/pt-BR';
import locale_tw from './locales/zh-TW';

import { localeLanguage } from '@/stores/language';
import { Observer } from 'mobx-react';

const data = {
  zh: locale_cn,
  en: locale_en,
  id: locale_id,
  jp: locale_jp,
  br: locale_br,
  tw: locale_tw,
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <Observer>
    {() => (
      <IntlProvider
        locale={language}
        messages={(data as any)?.[localeLanguage?.localeLang || language]}
        defaultLocale="zh"
      >
        <RouterView />
      </IntlProvider>
    )}
  </Observer>,
  document.getElementById('root'),
);
