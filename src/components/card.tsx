import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import React from 'react'
import { NavLink } from 'react-router'

export default function Card({
	title,
	children,
	refetchFn,
}: {
	title: string
	children?: React.ReactNode
	refetchFn: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}) {
	return (
		<div className='card bg-white p-4 overflow-y-hidden flex flex-col justify-between'>
			<div className='titles flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<button onClick={() => refetchFn()} className='bg-gray-200 p-2'>
					R
				</button>
			</div>
			{children}
			<div className='links pb-2'>
				<NavLink className='bg-gray-200 p-2' to={`/${title.toLowerCase()}`}>
					Show one {title.slice(0, -1).toLowerCase()}
				</NavLink>
			</div>
		</div>
	)
}
