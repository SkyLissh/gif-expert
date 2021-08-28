import Gif from "./Gif";
import Pagination from "./Pagination";
import Meta from "./Meta";

export default interface GifResponse {
	data: Gif[];
	pagination: Pagination;
	meta: Meta;
}
