import { FilesAdd, FilesDelete } from "@/types/files";
import { LinkCreate, LinkDelete, LinksState } from "@/types/links";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LinkUpdate } from "./../../types/links";
import { axiosBaseQuery } from "./base";

export const linksApi = createApi({
	reducerPath: "linksApi",
	baseQuery: axiosBaseQuery(),
	tagTypes: ["Links"],
	endpoints: (build) => ({
		getLinks: build.query<LinksState, void>({
			query: () => ({
				url: "/links",
			}),
			providesTags: () => ["Links"],
		}),
		createLink: build.mutation<any, LinkCreate>({
			query: ({ data }) => ({
				url: "/links",
				method: "post",
				data,
			}),
			invalidatesTags: ["Links"],
		}),
		updateLink: build.mutation<any, LinkUpdate>({
			query: ({ id, data }) => ({
				url: `/links/${id}`,
				method: "put",
				data,
			}),
			invalidatesTags: ["Links"],
		}),
		deleteLink: build.mutation<any, LinkDelete>({
			query: ({ id }) => ({
				url: `/links/${id}`,
				method: "delete",
			}),
			invalidatesTags: ["Links"],
		}),
		addFiles: build.mutation<any, FilesAdd>({
			query: ({ id, data }) => ({
				url: `/files/${id}`,
				method: "post",
				data,
			}),
			invalidatesTags: ["Links"],
		}),
		deleteFiles: build.mutation<any, FilesDelete>({
			query: ({ id, data }) => ({
				url: `/files/${id}`,
				method: "delete",
				data,
			}),
			invalidatesTags: ["Links"],
		}),
	}),
});

export const {
	useGetLinksQuery,
	useCreateLinkMutation,
	useUpdateLinkMutation,
	useDeleteLinkMutation,
	useAddFilesMutation,
	useDeleteFilesMutation,
} = linksApi;
