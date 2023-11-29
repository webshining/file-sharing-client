import { useAppSelector } from "@/actions/hooks/redux";
import { useDeleteLinkMutation, useGetLinksQuery } from "@/storage/reducers/links";
import { Link } from "@/types/links";
import { useEffect, useState } from "react";
import LinksCreateContent from "./LinksCreateContent";
import LinksEditContent from "./LinksEditContent";

const LinksContent = () => {
	const [active, setActive] = useState<Link | null>(null);
	const { user } = useAppSelector((state) => state.user);
	const { data, refetch } = useGetLinksQuery();
	const [deleteLink] = useDeleteLinkMutation();
	const deleteHandler = (e: any, id: number) => {
		e.target.parentElement.parentElement.classList.add("disappearance");
		setTimeout(() => {
			deleteLink({ id: id });
		}, 800);
	};
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(`${window.location.host}/${text}`);
	};
	useEffect(() => {
		refetch();
	}, [user]);
	useEffect(() => {
		if (active) {
			const links = data?.links.filter((l) => l.id === active.id);
			if (links) setActive(links[0]);
		}
	}, [data]);
	return (
		<div className="links">
			<div className="links__content">
				<div className="links__items">
					{data?.links &&
						data.links.map((l) => (
							<div key={l.id} className="links__items_item">
								{l.href}
								<div className="links__items_item-buttons">
									<span className="material-symbols-outlined" onClick={() => copyToClipboard(l.href)}>
										content_copy
									</span>
									<span className="material-symbols-outlined" onClick={() => setActive(l)}>
										edit
									</span>
									<span className="material-symbols-outlined" onClick={(e) => deleteHandler(e, l.id)}>
										delete
									</span>
								</div>
							</div>
						))}
				</div>
				{active && <LinksEditContent {...active} onClose={() => setActive(null)} />}
				<LinksCreateContent />
			</div>
		</div>
	);
};

export default LinksContent;
