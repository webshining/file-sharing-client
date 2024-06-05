import { host } from '@/api/interceptors'
import { AuthBody } from '@/types/user.types'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'

export const authService = {
	async main(type: 'login' | 'register', data: AuthBody) {
		const response = await host.post(`/auth/${type}`, data)
		if (response.data.accessToken) this.saveAccessToken(response.data.accessToken)
		return response
	},

	async getNewTokens() {
		const response = await host.get('/auth/refresh')
		if (response.data.accessToken) this.saveAccessToken(response.data.accessToken)
		return response
	},

	async logout() {
		const response = await host.get('/auth/logout')
		if (response.data) this.removeAccessToken()
		return response
	},

	getAccessToken() {
		const accessToken = Cookies.get('accessToken')
		return accessToken || null
	},

	saveAccessToken(accessToken: string) {
		const data = decodeToken<any>(accessToken)
		Cookies.set('accessToken', accessToken, {
			sameSite: 'none',
			secure: true,
			expires: new Date(data.exp * 1000)
		})
	},

	removeAccessToken() {
		Cookies.remove('accessToken')
	}
}
