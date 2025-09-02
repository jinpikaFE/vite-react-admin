import React, { useState, useCallback, useRef, useEffect } from 'react'
import { ProFormSelect } from '@ant-design/pro-components'
import { debounce } from 'lodash'

interface PaginatedSelectProps {
  /** 请求数据的函数 */
  request: (params: any) => Promise<any>
  /** 每页显示数量 */
  pageSize?: number
  /** 搜索防抖延迟时间(ms) */
  debounceTime?: number
  /** 自定义选项渲染 */
  optionRender?: (item: any) => any
  /** 标签 */
  label?: string
  /** 字段名 */
  name?: string
  /** 模式 */
  mode?: 'multiple' | 'tags'
  /** 占位符 */
  placeholder?: string
  /** 提示信息 */
  tooltip?: string
  /** 是否必填 */
  required?: boolean
}

const PaginatedSelect: React.FC<PaginatedSelectProps> = props => {
  const {
    request,
    pageSize = 20,
    debounceTime = 300,

    ...rest
  } = props

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState<any>('')

  // 处理滚动到底部
  const handlePopupScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { target } = e
      if (target instanceof HTMLElement) {
        const { scrollTop, scrollHeight, clientHeight } = target
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          // 滚动到底部，加载下一页
          if (data?.length < total) {
            setCurrentPage(currentPage + 1)
          }
        }
      }
    },
    [data, total, loading, currentPage]
  )

  const loadData = debounce(async (refresh = false) => {
    setLoading(true)
    if (refresh) {
      setCurrentPage(1)
    }
    try {
      const res = await request({
        pageIndex: refresh ? 1 : currentPage,
        pageSize,
        search: searchValue
      })
      setData(refresh ? res?.data : [...data, ...(res?.data || [])])
      setTotal(res?.total)
    } finally {
      setLoading(false)
    }
  }, debounceTime)

  useEffect(() => {
    loadData()
  }, [currentPage])

  useEffect(() => {
    loadData(true)
  }, [searchValue])

  return (
    <ProFormSelect
      fieldProps={{
        onSearch(value) {
          setSearchValue(value)
        },
        onPopupScroll: handlePopupScroll,
        filterOption: false,
        showSearch: true,
        allowClear: true,
        notFoundContent: loading ? '加载中...' : '暂无数据'
      }}
      params={{
        pageIndex: currentPage,
        pageSize
      }}
      options={data}
      {...rest}
    />
  )
}

export default PaginatedSelect
