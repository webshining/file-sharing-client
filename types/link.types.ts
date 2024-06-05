import {File} from './file.types'

export interface Link {
    id: number;
    href: string;
    files: File[];
}

export interface LinksState {
    links: Link[];
}

export interface LinkCreate {
    href: string
}

export interface LinkUpdate {
    id: number;
    data: { href: string };
}

export interface LinkDelete {
    id: number;
}
