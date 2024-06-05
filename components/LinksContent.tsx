'use client'

import { Link } from '@/types/link.types'
import { ClipboardCopyIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import LinksCreateContent from './LinksCreateContent'

const LinksContent = () => {
	const [links] = useState<Link[]>([])
	return (
		<div className='links'>
			<div className='links__content'>
				<div className='links__items'>
					{links.map(l => (
						<div key={l.id} className='links__items_item'>
							{l.href}
							<div className='links__items_item-buttons'>
								<ClipboardCopyIcon />
								<PencilIcon />
								<Trash2Icon />
							</div>
						</div>
					))}
				</div>
				<LinksCreateContent />
			</div>
		</div>
	)
}

export default LinksContent
