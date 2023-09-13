import { File } from "./files";

export interface Link {
	id: number;
	href: string;
	files: File[];
}

export interface LinksState {
	links: Link[];
}

export interface LinkCreate {
	data: { href: string };
}

export interface LinkUpdate {
	id: number;
	data: { href: string };
}

export interface LinkDelete {
	id: number;
}
