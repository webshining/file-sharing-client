import { useRouter } from "next/navigation";

const usePush = () => {
	const { push: p } = useRouter();
	const push = (to: string, element: any = null, timeout: number = 0) => {
		if (element) {
			if (element instanceof Array) element.forEach((e) => e.classList.add("disappearance"));
			else element.classList.add("disappearance");
		}
		setTimeout(() => {
			p(to);
		}, timeout);
	};
	return push;
};

export default usePush;
