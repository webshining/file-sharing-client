import LinkContent from '@/components/LinkContent'

type Props = {
	params: { href: string }
}

export function generateMetadata({ params }: Props) {
	return {
		title: params.href
	}
}

const Link = async ({ params }: Props) => {
	return <LinkContent {...params} />
}

export default Link
