import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function UsersPage() {
	const [randomId] = useState(Math.floor(Math.random() * 30))

	async function fetchUser() {
		const response = await fetch(`https://dummyjson.com/users/${randomId}`)
		const data = await response.json()

		return data
	}

	const { data, isLoading, error, isRefetching, refetch } = useQuery({
		queryKey: ['user', randomId],
		queryFn: fetchUser,
		staleTime: Infinity,
	})
	return (
		<div className='user'>
			<h1>Single user: {randomId}</h1>
			{isRefetching && <p>Refetching...</p>}
			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!isLoading && !error && (
				<div>
					<h2>{data.firstName}</h2>
					<h2>{data.lastName}</h2>
					<h2>{data.email}</h2>
					<h2>{data.phone}</h2>
					<h2>{data.address.address}</h2>
				</div>
			)}
			<button
				disabled={isRefetching}
				onClick={() => refetch()}
				className='bg-gray-200 p-2 disabled:opacity-50'
			>
				Refetch
			</button>
		</div>
	)
}
