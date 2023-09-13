import { useActions } from "@/actions/hooks/redux";
import { useCreateLinkMutation } from "@/storage/reducers/links";
import { useState } from "react";

const LinksCreateContent = () => {
	const [href, setHref] = useState<string>("");
	const [createLink, {}] = useCreateLinkMutation();
	const { addNotification } = useActions();
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { data } = (await createLink({ data: { href } })) as any;
		if (data.error) addNotification({ text: data.error, type: "ERROR" });
		else setHref("");
	};
	return (
		<form className="links__create" onSubmit={onSubmit}>
			<input type="text" onChange={(e) => setHref(e.target.value)} value={href} placeholder="Href" required />
			<button type="submit">Create</button>
		</form>
	);
};

export default LinksCreateContent;
