import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Input, Modal, List, Avatar, Spin, Empty, message, Pagination, Select } from 'antd'
import { Icon } from '@iconify/react'
import { SearchOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'

interface IconSelectorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
}

interface IconifySearchResponse {
  icons: string[]
  total: number
  limit: number
  start: number
  collections: Record<string, any>
  request: Record<string, string>
}

interface PrefixOption {
  label: string
  value: string
  total?: number
  category?: string
  samples?: string[]
}

const IconSelector: React.FC<IconSelectorProps> = ({
  value,
  onChange,
  placeholder = '请选择图标',
  disabled = false,
  size = 'middle'
}) => {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [icons, setIcons] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [selectedPrefix, setSelectedPrefix] = useState<string>('')
  const [prefixOptions, setPrefixOptions] = useState<PrefixOption[]>([])
  const [loadingPrefixes, setLoadingPrefixes] = useState(false)

  // 获取图标集合列表
  const fetchPrefixOptions = useCallback(async () => {
    setLoadingPrefixes(true)
    try {
      const response = await fetch('https://api.iconify.design/collections?pretty=1')
      if (!response.ok) {
        throw new Error(`获取图标集合失败: ${response.status}`)
      }

      const data = await response.json()
      const options: PrefixOption[] = Object.entries(data).map(([prefix, info]: [string, any]) => ({
        label: info.name || prefix,
        value: prefix,
        total: info.total,
        category: info.category,
        samples: info.samples
      }))

      setPrefixOptions(options)
      setSelectedPrefix(value ? value?.split(':')[0] : options[0]?.value)
    } catch (error) {
      console.error('获取图标集合失败:', error)
      // 如果API失败，使用默认选项
      const defaultOptions: PrefixOption[] = [
        { label: 'Material Design Icons', value: 'mdi' },
        { label: 'Font Awesome Solid', value: 'fa-solid' },
        { label: 'Heroicons Outline', value: 'heroicons-outline' },
        { label: 'Heroicons Solid', value: 'heroicons-solid' },
        { label: 'Feather Icons', value: 'feather' },
        { label: 'Lucide Icons', value: 'lucide' },
        { label: 'Tabler Icons', value: 'tabler' },
        { label: 'Carbon Icons', value: 'carbon' },
        { label: 'Ant Design Icons', value: 'ant-design' },
        { label: 'Bootstrap Icons', value: 'bi' }
      ]
      setPrefixOptions(defaultOptions)
    } finally {
      setLoadingPrefixes(false)
    }
  }, [selectedPrefix])

  // 当弹窗打开时获取图标集合列表
  useEffect(() => {
    if (visible && prefixOptions.length === 0) {
      fetchPrefixOptions()
    }
  }, [visible, prefixOptions.length, fetchPrefixOptions])

  // 搜索图标
  const searchIcons = useCallback(
    async (query: string = '', prefix: string = 'mdi', page: number = 1, limit: number = 64) => {
      setLoading(true)
      try {
        const start = (page - 1) * limit
        const params = new URLSearchParams({
          prefix: prefix,
          limit: '999',
          pretty: '1'
        })

        // 只有当有搜索关键词时才添加query参数
        if (query && query.trim()) {
          params.append('query', query.trim())
          const response = await fetch(`https://api.iconify.design/search?${params}`)
          if (!response.ok) {
            throw new Error(`搜索失败: ${response.status}`)
          }

          const data: IconifySearchResponse = await response.json()
          setIcons(data.icons)
          setTotal(data.total)
        } else {
          // 没有搜索关键词时，使用当前选中集合的示例图标
          const currentPrefixOption = prefixOptions.find(option => option.value === prefix)
          if (currentPrefixOption?.samples && currentPrefixOption.samples.length > 0) {
            setIcons(currentPrefixOption.samples?.map((item: string) => `${prefix}:${item}`))
            setTotal(currentPrefixOption.samples.length)
          }
        }
      } catch (error) {
        console.error('搜索图标失败:', error)
        message.error('搜索图标失败，请稍后重试')
        setIcons([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    },
    [prefixOptions]
  )

  // 处理搜索输入
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  // 处理图标集合前缀变化
  const handlePrefixChange = (prefix: string) => {
    setSelectedPrefix(prefix)
  }

  // 处理图标点击
  const handleIconClick = (iconName: string) => {
    onChange?.(iconName)
    setVisible(false)
    message.success(`已选择图标: ${iconName}`)
  }

  // 弹窗打开时自动加载数据，监听搜索条件变化
  useEffect(() => {
    if (visible && prefixOptions.length > 0) {
      searchIcons(searchText.trim(), selectedPrefix)
    }
  }, [visible, prefixOptions.length, searchText, selectedPrefix])

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          padding: '4px 8px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          backgroundColor: '#fff',
          minHeight: size === 'small' ? '24px' : size === 'large' ? '40px' : '32px'
        }}
        onClick={() => !disabled && setVisible(true)}
      >
        {value ? <Icon icon={value} style={{ marginRight: 8, fontSize: '16px' }} /> : null}
        <span style={{ color: value ? '#000' : '#999', flex: 1 }}>{value || placeholder}</span>
        <Icon icon="mdi:chevron-down" style={{ fontSize: '12px', color: '#999' }} />
      </div>

      <Modal
        title="选择图标"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={900}
        destroyOnHidden
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <Select
              value={selectedPrefix}
              onChange={handlePrefixChange}
              style={{ width: 200 }}
              placeholder="选择图标集合"
              loading={loadingPrefixes}
              showSearch
              filterOption={(input, option) => {
                const label = option?.label || option?.children || ''
                return label.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
            >
              {loadingPrefixes && <Select.Option value="">加载中...</Select.Option>}
              {prefixOptions.map(option => (
                <Select.Option key={option.value} value={option.value} label={option.label}>
                  {option.label} {option.total != null ? `(${option.total?.toLocaleString()})` : ''}
                </Select.Option>
              ))}
            </Select>
            <Input
              placeholder="搜索图标..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              defaultValue={searchText}
              allowClear
              style={{ flex: 1 }}
            />
          </div>
          {total > 0 && (
            <div style={{ fontSize: '12px', color: '#666' }}>共找到 {total} 个图标</div>
          )}
          {!searchText && (
            <div style={{ fontSize: '12px', color: '#666' }}>示例图标; 搜索获取更多</div>
          )}
        </div>

        <div style={{ maxHeight: 500, overflow: 'auto', width: '100%' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : icons.length > 0 ? (
            <>
              <List
                grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 6, xl: 8, xxl: 10 }}
                dataSource={icons}
                style={{ width: '98%' }}
                renderItem={iconName => (
                  <List.Item>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '12px 8px',
                        border: '1px solid #f0f0f0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        backgroundColor: value === iconName ? '#e6f7ff' : '#fff',
                        borderColor: value === iconName ? '#1890ff' : '#f0f0f0',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                      onClick={() => handleIconClick(iconName)}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5'
                        e.currentTarget.style.borderColor = '#d9d9d9'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor =
                          value === iconName ? '#e6f7ff' : '#fff'
                        e.currentTarget.style.borderColor =
                          value === iconName ? '#1890ff' : '#f0f0f0'
                      }}
                    >
                      <Avatar
                        size={40}
                        icon={<Icon icon={iconName} style={{ fontSize: '24px' }} />}
                        style={{
                          backgroundColor: 'transparent',
                          color: value === iconName ? '#1890ff' : '#666'
                        }}
                      />
                      <div
                        style={{
                          marginTop: '8px',
                          fontSize: '12px',
                          color: '#666',
                          textAlign: 'center',
                          wordBreak: 'break-all',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={iconName}
                      >
                        {iconName.split(':').pop()}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <Empty
              description={
                searchText
                  ? '未找到相关图标'
                  : loading
                    ? '正在加载图标...'
                    : '该图标集合暂无示例图标，请搜索或选择其他集合'
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default IconSelector
