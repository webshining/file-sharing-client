import LinkContent from "@/components/LinkContent";

const Link = async ({ params }: { params: { href: string } }) => {
	return <LinkContent {...params} />;
};

export default Link;
