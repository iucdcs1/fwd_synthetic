<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';

	async function handleFormSubmit(event: Event) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const reviewData = {
			name: formData.get('name') as string,
			score: parseInt(formData.get('score') as string),
			text: formData.get('text') as string,
			short_text: formData.get('short_text') as string
		};

		try {
			// Make a POST request to the backend API to add the new review
			const response = await axios.post('http://localhost:5000/api/addReview', reviewData);
			const newReview = response.data;
			console.log('New review added:', newReview);
			goto('/pagehome');
			// You can update the UI or show a success message here
		} catch (error) {
			console.error('Error adding review:', error);
			// Handle error, show error message, etc.
		}
	}

	interface Review {
		name: string;
		score: number;
		short: string;
		text: string;
	}
</script>

<div class="addreview">
	<h2 class="addreview__title">Add review</h2>
	<form class="addreview__form" on:submit={handleFormSubmit}>
		<input type="text" name="name" placeholder="Name" />
		<div class="addreview__grade">
			<p class="addreview__gradetext">Grade</p>
			<select name="score" class="addreview__gradelist">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</div>
		<input type="text" name="short_text" placeholder="Short text" />
		<input type="text" name="text" placeholder="Review" />
		<button type="submit" id="add" class="addreview__submit">Submit</button>
	</form>
</div>
