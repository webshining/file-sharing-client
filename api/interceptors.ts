import { authService } from '@/services'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'

const options: CreateAxiosDefaults = {
	baseURL: process.env.API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
}

const host = axios.create(options)
const hostAuth = axios.create(options)

hostAuth.interceptors.request.use(config => {
	const accessToken = authService.getAccessToken()
	config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

hostAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return hostAuth.request(originalRequest)
			} catch (e) {
				if (errorCatch(e) === 'jwt expired') authService.removeAccessToken()
			}
		}

		return error
	}
)

export { host, hostAuth }
