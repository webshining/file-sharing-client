import { useActions } from "@/actions/hooks/redux";
import { useAddFilesMutation, useDeleteFilesMutation, useUpdateLinkMutation } from "@/storage/reducers/links";
import { Link } from "@/types/links";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const LinksEditContent = (props: Link) => {
	const [href, setHref] = useState<string>(props.href);
	const { addNotification } = useActions();
	const [updateLink] = useUpdateLinkMutation();
	const [addFiles] = useAddFilesMutation();
	const [deleteFiles] = useDeleteFilesMutation();
	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setHref(e.target.value);
	};
	const changeFilesHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData();
		[...(e.target.files as any)].forEach((f) => {
			formData.append(f.name, f);
		});

		addFiles({ id: props.id, data: formData }).then(({ data }: any) => {
			if (data.error) addNotification({ text: data.error, type: "ERROR" });
		});
	};
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (props.href !== href) {
			updateLink({ id: props.id, data: { href } }).then(({ data }: any) => {
				if (data.error) addNotification({ text: data.error, type: "ERROR" });
			});
		}
	};
	useEffect(() => {
		setHref(props.href);
	}, [props.href]);
	return (
		<form className="links__edit" onSubmit={onSubmit}>
			<h1>Edit</h1>
			<div className="links__edit_form">
				<div className="links__edit_form wrap">
					<input type="text" value={href} onChange={changeHandler} />
					<button type="submit">
						<span className="material-symbols-outlined">save</span>
					</button>
				</div>
				<ul>
					{props.files.map((f, i) => (
						<li key={i} onClick={() => deleteFiles({ id: props.id, data: { files: [f.id] } })}>
							{f.name}
						</li>
					))}
				</ul>
				<label htmlFor="upload-files">Select files</label>
				<input id="upload-files" type="file" onChange={changeFilesHandler} multiple />
			</div>
			<span className="material-symbols-outlined close" onClick={(props as any).onClose}>
				close
			</span>
		</form>
	);
};

export default LinksEditContent;
