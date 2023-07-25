export const load = async ({ fetch }) => {
	const fetchReview = async () => {
		try {
			const res = await fetch(`http://localhost:5000/api/data/`);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error('Error fetching review:', error);
			return null;
		}
	};

	return {
		reviews: fetchReview()
	};
};
