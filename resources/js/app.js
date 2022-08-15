require('./bootstrap')

import { createRoot } from 'react-dom/client'
import ClientsPage from './components/ClientsPage'

const root = createRoot(document.getElementById('root'))

root.render(<ClientsPage />)
