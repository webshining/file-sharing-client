import { host, hostAuth } from '@/api/interceptors'
import { LinkCreate } from '@/types/link.types'

export const linkService = {
	async create(data: LinkCreate) {
		return await hostAuth.post(`/links`, data)
	},

	async get() {
		return await hostAuth.get(`/links`)
	},

	async getOne(href: string) {
		return await host.get(`/links/${href}`)
	},

	async delete(id: number) {
		return await hostAuth.delete(`/links/${id}`)
	}
}
