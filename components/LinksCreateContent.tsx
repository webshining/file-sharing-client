'use client'

import { linkService } from '@/services'
import { Input } from '@/styles/styles'
import { LinkCreate } from '@/types/link.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const LinksCreateContent = () => {
	const { handleSubmit, register, reset } = useForm<LinkCreate>({ mode: 'onChange' })
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['links'],
		mutationFn: (data: LinkCreate) => linkService.create(data),
		onSuccess: () => {
			reset()
		}
	})

	const onSubmit = async (data: LinkCreate) => {
		mutate(data)
	}

	return (
		<form className='links__create' onSubmit={handleSubmit(onSubmit)}>
			<Input type='text' placeholder='Href' {...register('href', { required: true })} />
			<button type='submit'>Create</button>
		</form>
	)
}

export default LinksCreateContent
