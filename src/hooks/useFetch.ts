import { Dispatch, MutableRefObject, useEffect, useReducer, useRef } from "react";

interface State<T> {
	data?: T;
	error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
	| { type: "loading" }
	| { type: "fetched"; payload: T }
	| { type: "error"; payload: Error };

type SateReducer<T> = (state: State<T>, action: Action<T>) => State<T>;

function useFetch<T>(url: string, options?: RequestInit): State<T> {
	const cache = useRef<Cache<T>>({});

	// Used to prevent state update if the component is mounted
	const cancelRequest = useRef<boolean>(false);

	const initialState: State<T> = {
		data: undefined,
		error: undefined
	};

	const [state, dispatch] = useReducer<SateReducer<T>>(fetchReducer, initialState);

	useEffect(() => {
		// Do nothing if the url is not given
		if (!url) return;

		fetchData<T>(dispatch, url, cache, cancelRequest, options);

		return () => {
			cancelRequest.current = true;
		};
	}, [url, options]);

	return state;
}

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
	switch (action.type) {
		case "loading":
			return { ...state };
		case "fetched":
			return { ...state, data: action.payload };
		case "error":
			return { ...state, error: action.payload };
		default:
			return state;
	}
}

async function fetchData<T>(
	dispatch: Dispatch<Action<T>>,
	url: string,
	cache: MutableRefObject<Cache<T>>,
	cancelRequest: MutableRefObject<boolean>,
	options?: RequestInit
): Promise<void> {
	dispatch({ type: "loading" });

	// If a cache exists for this, url return it
	if (cache.current[url]) {
		dispatch({ type: "fetched", payload: cache.current[url] });
		return;
	}

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = (await response.json()) as T;
		cache.current[url] = data;
		if (cancelRequest.current) return;

		dispatch({ type: "fetched", payload: data });
	} catch (error: any) {
		if (cancelRequest.current) return;

		dispatch({ type: "error", payload: error });
	}
}

export default useFetch;
