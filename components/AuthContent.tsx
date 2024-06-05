'use client'

import githubImg from '@/assets/github.png'
import googleImg from '@/assets/google.png'
import { authService } from '@/services'
import { Input } from '@/styles/styles'
import { AuthBody } from '@/types/user.types'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const AuthContent = () => {
	const { handleSubmit, register } = useForm<AuthBody>({ mode: 'onChange' })
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: AuthBody) => authService.main(isLogin ? 'login' : 'register', data),
		onSuccess: () => {
			push('/')
		}
	})

	const onSubmit: SubmitHandler<AuthBody> = data => {
		mutate(data)
	}
	const redirectOauth = (type: 'google' | 'github') => {
		push(`${process.env.API_URL}/auth/${type}?state=` + window.location.href)
	}

	return (
		<div className='auth'>
			<form className='auth__form' onSubmit={handleSubmit(onSubmit)}>
				<h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
				<span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Sign In'}</span>
				{!isLogin && (
					<Input
						className='auth__input'
						type='text'
						placeholder='Name'
						{...register('name', { required: 'Name required' })}
					/>
				)}
				<Input
					className='auth__input'
					type='email'
					placeholder='Email'
					{...register('email', { required: 'Email required' })}
				/>
				<Input
					className='auth__input'
					type='password'
					placeholder='Password'
					{...register('password', { required: 'Password required' })}
				/>
				<button className='auth__button' type='submit'>
					Submit
				</button>
				<div className='auth__social'>
					<Image
						src={googleImg}
						alt='google'
						onClick={() => redirectOauth('google')}
						width={30}
						height={30}
						priority
					/>
					<Image
						src={githubImg}
						alt='github'
						onClick={() => redirectOauth('github')}
						width={30}
						height={30}
						priority
					/>
				</div>
			</form>
		</div>
	)
}

export default AuthContent
