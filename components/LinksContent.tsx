import { useGetLinksQuery } from "@/storage/reducers/links";
import { Link } from "@/types/links";
import { useEffect, useState } from "react";
import LinksCreateContent from "./LinksCreateContent";
import LinksEditContent from "./LinksEditContent";

const LinksContent = () => {
	const { data } = useGetLinksQuery();
	const [active, setActive] = useState<Link | null>(null);
	useEffect(() => {
		// if (!active && data?.links[0]) {
		// 	setActive(data.links[0]);
		// } else if (active && data?.links[0] && !data.links.filter((l) => l.id === active.id)[0]) {
		// 	setActive(data.links[0]);
		// }
		console.log(!active, active && data?.links.filter((l) => l.id === active!.id)[0]);
	}, [data]);
	return (
		<div className="links">
			<div className="links__list">
				{data?.links &&
					data.links.map((l) => (
						<div key={l.id} className={active == l ? "active" : ""} onClick={() => setActive(l)}>
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
