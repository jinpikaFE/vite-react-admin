import { ProCard, ProField, ProFieldFCMode } from '@ant-design/pro-components'
import { Descriptions, Radio, Space, Switch } from 'antd'
import { useState } from 'react'

const Profile: React.FC = () => {
  const [state, setState] = useState<ProFieldFCMode>('read')
  const [plain, setPlain] = useState<boolean>(false)
  return (
    <ProCard>
      <div className="text-3xl">ssss</div>
      <Space>
        <Radio.Group onChange={e => setState(e.target.value as ProFieldFCMode)} value={state}>
          <Radio value="read">只读</Radio>
          <Radio value="edit">编辑</Radio>
        </Radio.Group>
        简约模式
        <Switch checked={plain} onChange={checked => setPlain(checked)} />
      </Space>
      <Descriptions column={2}>
        <Descriptions.Item label="空字符串">
          <ProField text="" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="头像">
          <ProField
            text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4"
            mode={state}
            valueType="avatar"
          />
        </Descriptions.Item>
      </Descriptions>
    </ProCard>
  )
}

export default Profile
