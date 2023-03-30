declare namespace Global {
  type ResultType<T = any> = {
    success?: boolean
    data: T
    message: string
    code: number
    total?: number
  }
  type PageParams = {
    pageNum: number
    pageSize: number
  }
}
