declare namespace Global {
  type ResultType<T = any> = {
    success?: boolean
    data: T
    message: string
    msg?: string
    count?: number
    code: number
  }
  type PageParams = {
    pageIndex: number
    pageSize: number
  }

  type PageResponse<T = any> = {
    list: T[]
    count: number
    pageIndex: number
    pageSize: number
  }
}
