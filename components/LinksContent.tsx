import { useGetLinksQuery } from "@/storage/reducers/links";
import { Link } from "@/types/links";
import { useEffect, useState } from "react";
import LinksCreateContent from "./LinksCreateContent";
import LinksEditContent from "./LinksEditContent";

const LinksContent = () => {
	const { data } = useGetLinksQuery();
	const [active, setActive] = useState<Link | null>(null);
	useEffect(() => {
		if (data?.links) {
			const links = [...data.links].sort((a, b) => a.id - b.id);
			if (active) {
				const link = links.find((l) => l.id == active.id);
				if (!link) {
					setActive(links[0]);
				} else {
					setActive(link);
				}
			} else {
				setActive(links[0]);
			}
		} else setActive(null);
	}, [data]);
	return (
		<div className="links">
			<div className="links__items">
				{data?.links &&
					data.links.map((l) => (
						<div
							key={l.id}
							className={"links__items_item" + (active == l ? " active" : "")}
							onClick={() => setActive(l)}
						>
							{l.href}
						</div>
					))}
			</div>
			<LinksCreateContent />
			{active && <LinksEditContent {...active} />}
		</div>
	);
};

export default LinksContent;
