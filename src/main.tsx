import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { lazy } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const HomePage = lazy(() => import('./pages/home-page'))
const UsersPage = lazy(() => import('./pages/users-page'))
const ProductsPage = lazy(() => import('./pages/products-page'))

const routes = [
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/products',
		element: <ProductsPage />,
	},
	{
		path: '/users',
		element: <UsersPage />,
	},
]

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Routes>
				{routes.map((route, index) => (
					<Route key={index} path={route.path} element={route.element} />
				))}
			</Routes>
		</BrowserRouter>
	</QueryClientProvider>
)
