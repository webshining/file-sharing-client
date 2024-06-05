import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get('refreshToken')?.value
	const isAuthPage = url.includes('/auth')

	if (isAuthPage && refreshToken) return NextResponse.redirect(new URL('/', url))
	if (isAuthPage) return NextResponse.next()
	if (!refreshToken) return NextResponse.redirect(new URL('/auth', url))

	return NextResponse.next()
}

export const config = { matcher: ['/auth/:path*', '/'] }
