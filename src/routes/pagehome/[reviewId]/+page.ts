export async function load({ fetch: any, params }) {
	const fetchReview = async (reviewId: any) => {
		try {
			const res = await fetch(`http://localhost:5000/api/data/${reviewId}`);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error('Error fetching review:', error);
			return null;
		}
	};

	return {
		review: await fetchReview(params.reviewId)
	};
}
