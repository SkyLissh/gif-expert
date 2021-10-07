import { RefObject, useEffect } from "react";

let listenerCallbacks = new WeakMap<object, () => void>();

function handleIntersection(
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver
) {
	entries.forEach((entry) => {
		if (listenerCallbacks.has(entry.target)) {
			let cb = listenerCallbacks.get(entry.target);

			if (entry.isIntersecting || entry.intersectionRatio > 0) {
				observer.unobserve(entry.target);
				listenerCallbacks.delete(entry.target);
				cb!();
			}
		}
	});
}

export default function useIntersection(ref: RefObject<Element>, callback: () => void) {
	useEffect(() => {
		const target = ref?.current;
		const observer = new IntersectionObserver(handleIntersection, {
			rootMargin: "0%",
			threshold: 0
		});

		if (!target) return;

		listenerCallbacks.set(target, callback);
		observer.observe(target);

		return () => {
			listenerCallbacks.delete(target);
			observer.unobserve(target);
		};
	}, [ref, callback]);
}
