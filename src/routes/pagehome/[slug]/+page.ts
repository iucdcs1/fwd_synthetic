export function load({ params }) {
	return {
		title: params.slug,
		text: params.slug
	};
}
