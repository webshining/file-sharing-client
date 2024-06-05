import { host } from '@/actions/fetch'
import Link from 'next/link'

const LinkContent = async ({ href }: { href: string }) => {
	const data = await getData(href)
	return (
		<div className='link'>
			<div className='link__href'>/{data.link && data.link.href}</div>
			<div className='link__items'>
				{data.link &&
					data.link.files.map((f: any) => (
						<Link href={`${process.env.API_URL}/files/${href}/${f.id}`}>{f.name}</Link>
					))}
			</div>
		</div>
	)
}

const getData = async (href: string): Promise<any> => {
	const { data } = await host.get(`/links/${href}`)
	return data
}

export default LinkContent
