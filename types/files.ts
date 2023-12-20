export interface File {
	id: number;
	name: string;
}

export interface FilesDelete {
	id: number;
	data: { files: number[] };
}

export interface FilesAdd {
	id: number;
	data: FormData;
}
