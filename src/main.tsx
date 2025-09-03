import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from '../config/routes'

import 'antd/dist/reset.css'
import 'virtual:uno.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
