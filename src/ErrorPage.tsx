import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  // 使用 useRouteError 取得路由錯誤資訊
  const error: any = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      {/* 把 error 資料顯示在你的 jsx 上 */}
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  )
}
export default ErrorPage
