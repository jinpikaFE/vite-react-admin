import { getMonitorList } from '@/apis/home'
import ExcelTable from '@/components/exportExcel'
import { getFirstDayOfMonth } from '@/utils/date'
import { formatToDateTime } from '@/utils/dateUtil'
import { ActionType } from '@ant-design/pro-components'
import { useRef } from 'react'

const Home: React.FC = () => {
  const actionRef = useRef<ActionType>()

  return (
    <ExcelTable
      headerTitle="性能监控"
      columns={[
        {
          title: '角色名称2',
          dataIndex: 'keyword',
          hideInTable: true
        },
        {
          title: '时间',
          dataIndex: 'time',
          hideInTable: true,
          valueType: 'dateTimeRange',
          initialValue: [getFirstDayOfMonth(new Date()), formatToDateTime(new Date())],
          search: {
            transform: val => ({
              startTime: val?.[0],
              endTime: val?.[1]
            })
          }
        },
        /** search */
        {
          title: '访问标识',
          dataIndex: 'uuid',
          hideInSearch: true,
          ellipsis: true
        },
        {
          title: '错误页面',
          dataIndex: 'pageUrl',
          hideInSearch: true,
          ellipsis: true
        },
        {
          title: '描述',
          dataIndex: 'description',
          hideInSearch: true
        }
      ]}
      form={{
        syncToUrl: false
      }}
      pagination={{
        pageSize: 10
      }}
      rowKey="_time"
      requestFn={async params => {
        const data = await getMonitorList({
          ...params,
          type: 'performance',
          apikey: 'vite-react-ts-admin'
        })
        return data
      }}
      actionRef={actionRef}
      rowSelection={false}
      toolBarRenderFn={() => []}
    />
  )
}

export default Home
