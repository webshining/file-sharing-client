import { useAppSelector } from "@/actions/hooks/redux";
import { useDeleteLinkMutation, useGetLinksQuery } from "@/storage/reducers/links";
import { useEffect } from "react";
import LinksCreateContent from "./LinksCreateContent";

const LinksContent = () => {
	const { user } = useAppSelector((state) => state.user);
	const { data, refetch } = useGetLinksQuery();
	const [deleteLink] = useDeleteLinkMutation();
	const deleteHandler = (id: number) => {
		deleteLink({ id: id });
	};
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(`${window.location.host}/${text}`);
	};
	useEffect(() => {
		refetch();
	}, [user]);
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
									<span className="material-symbols-outlined">edit</span>
									<span className="material-symbols-outlined" onClick={() => deleteHandler(l.id)}>
										delete
									</span>
								</div>
							</div>
						))}
				</div>
				<LinksCreateContent />
			</div>
		</div>
	);
};

export default LinksContent;
