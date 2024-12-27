import { NavLink } from 'react-router'
import Card from '../components/card'
import { useQuery } from '@tanstack/react-query'

export default function HomePage() {
	async function fetchUsers() {
		const response = await fetch('https://dummyjson.com/users')
		const data = await response.json()

		return data
	}

	async function fetchProducts() {
		const response = await fetch('https://dummyjson.com/products')
		const data = await response.json()

		return data
	}

	const {
		data: usersData,
		isLoading: isUsersLoading,
		error: usersError,
		refetch: usersRefetch,
		isRefetching: isUsersRefetching,
	} = useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
		staleTime: Infinity,
	})

	const {
		data: productsData,
		isLoading: isProductsLoading,
		error: productsError,
		refetch: productsRefetch,
		isRefetching: isProductsRefetching,
	} = useQuery({
		queryKey: ['products'],
		queryFn: fetchProducts,
		staleTime: Infinity,
	})

	return (
		<div className='home-page flex items-center justify-center h-screen'>
			<div className='cards grid grid-cols-2 gap-6 w-[1000px] h-[700px] bg-slate-300 rounded-xl p-6'>
				<Card refetchFn={usersRefetch} title='Users'>
					{isUsersLoading && <div>Loading...</div>}
					{isUsersRefetching && <div>Refetching...</div>}
					{usersError && <div>{usersError.message}</div>}
					{usersData && (
						<ul>
							<li>{usersData.users[0].firstName}</li>
						</ul>
					)}
				</Card>
				<Card title='Products' refetchFn={productsRefetch}>
					{isProductsLoading && <div>Loading...</div>}
					{isProductsRefetching && <div>Refetching...</div>}
					{productsError && <div>{productsError.message}</div>}
					{productsData && (
						<ul>
							<li>{productsData.products[0].title}</li>
						</ul>
					)}
				</Card>
			</div>
		</div>
	)
}
