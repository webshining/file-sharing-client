export const errorCatch = (error: any): string => {
	const detail = error?.response?.data?.detail
	return detail ? (typeof error.response.data.detail === 'object' ? detail[0] : detail) : error.message
}
