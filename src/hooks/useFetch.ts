import { Dispatch, useEffect, useReducer } from "react";

interface State<T> {
	data?: T;
	error?: Error;
}

type Action<T> =
	| { type: "loading" }
	| { type: "fetched"; payload: T }
	| { type: "error"; payload: Error };

type SateReducer<T> = (state: State<T>, action: Action<T>) => State<T>;

function useFetch<T>(url: string, options?: RequestInit): State<T> {
	const initialState: State<T> = {
		data: undefined,
		error: undefined
	};

	const [state, dispatch] = useReducer<SateReducer<T>>(fetchReducer, initialState);

	useEffect(() => {
		fetchData<T>(dispatch, url, options);
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
	options?: RequestInit
): Promise<void> {
	dispatch({ type: "loading" });

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = (await response.json()) as T;

		dispatch({ type: "fetched", payload: data });
	} catch (error) {
		dispatch({ type: "error", payload: error });
	}
}

export default useFetch;
