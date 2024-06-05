import '@/styles/style.scss'
import type { Metadata } from 'next'
import React from 'react'
import Providers from './providers'

const SITE_NAME = 'FileSharing'

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
				<link
					href='https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
