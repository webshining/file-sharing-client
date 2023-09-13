import { useActions } from "@/actions/hooks/redux";
import {
	useAddFilesMutation,
	useDeleteFilesMutation,
	useDeleteLinkMutation,
	useUpdateLinkMutation,
} from "@/storage/reducers/links";
import { Link } from "@/types/links";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const LinksEditContent = (link: Link) => {
	const [href, setHref] = useState<string>(link.href);
	const [addedFiles, setAddedFiles] = useState<File[]>([]);
	const [deletedFiles, setDeletedFiles] = useState<number[]>([]);
	const { addNotification } = useActions();
	const [updateLink] = useUpdateLinkMutation();
	const [addFiles] = useAddFilesMutation();
	const [deleteFiles] = useDeleteFilesMutation();
	const [deleteLink] = useDeleteLinkMutation();
	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setHref(e.target.value);
	};
	const changeFilesHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setAddedFiles([...addedFiles, ...(e.target.files as any)]);
		e.target.value = "";
	};
	const removeAdded = (file: File) => {
		setAddedFiles(addedFiles.filter((f) => f !== file));
	};
	const setDeleted = (e: any, id: number) => {
		if (e.target.classList.contains("deleted")) setDeletedFiles(deletedFiles.filter((f) => f !== id));
		else setDeletedFiles([...deletedFiles, id]);
		e.target.classList.toggle("deleted");
	};
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (link.href !== href) {
			const { data } = (await updateLink({ id: link.id, data: { href } })) as any;
			if (data.error) addNotification({ text: data.error, type: "ERROR" });
		}
		if (addedFiles[0]) {
			const formdata = new FormData();
			addedFiles.forEach((f, i) => formdata.append(String(i), f));
			addFiles({ id: link.id, data: formdata });
		}
		if (deletedFiles[0]) {
			deleteFiles({ id: link.id, data: { files: deletedFiles } });
		}
		setAddedFiles([]);
		setDeletedFiles([]);
	};
	useEffect(() => {
		setHref(link.href);
	}, [link]);
	return (
		<form className="links__edit" onSubmit={onSubmit}>
			<h1>Edit</h1>
			<div className="links__edit_form">
				<input type="text" value={href} onChange={changeHandler} />
				<ul>
					{link.files.map((f, i) => (
						<li key={i} onClick={(e: any) => setDeleted(e, f.id)}>
							{f.name}
						</li>
					))}
				</ul>
				<ul>
					{addedFiles.map((f, i) => (
						<li key={i} onClick={() => removeAdded(f)}>
							{f.name}
						</li>
					))}
				</ul>
				<label htmlFor="upload-files">Select files</label>
				<input id="upload-files" type="file" onChange={changeFilesHandler} multiple />
			</div>
			<div className="links__edit_buttons">
				<button type="button" onClick={() => deleteLink({ id: link.id })}>
					Delete
				</button>
				<button type="submit">Save</button>
			</div>
		</form>
	);
};

export default LinksEditContent;
