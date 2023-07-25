<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { authUser } from '$lib/authStore';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let sendAnonymously = false;

	async function handleFormSubmit(event: Event) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		let user_email = null;
		if (!sendAnonymously) {
			user_email = $authUser?.email;
		}
		const reviewData = {
			name: formData.get('name') as string,
			score: parseInt(formData.get('score') as string),
			text: formData.get('text') as string,
			short_text: formData.get('short_text') as string,
			email: user_email
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
			goto('/pagehome');
			// Handle error, show error message, etc.
		}
	}

	interface Review {
		name: string;
		score: number;
		short: string;
		text: string;
		email: string;
	}

	let charsLeftShortText = 50;
	let charsLeftShortText2 = 250;

	// Function to update character counters for both input fields
	function updateCharacterCounters() {
		if (browser) {
			const shortTextInput = document.querySelector('input[name="short_text"]') as HTMLInputElement;
			const reviewInput = document.querySelector('input[name="text"]') as HTMLInputElement;

			if (shortTextInput) {
				charsLeftShortText = 50 - shortTextInput.value.length;
				if (charsLeftShortText < 0) {
					shortTextInput.value = shortTextInput.value.slice(0, 50);
					charsLeftShortText = 0;
				}
			}

			if (reviewInput) {
				charsLeftShortText2 = 250 - reviewInput.value.length;
				if (charsLeftShortText2 < 0) {
					reviewInput.value = reviewInput.value.slice(0, 250);
					charsLeftShortText2 = 0;
				}
			}
		}
	}

	// Initialize the character counters on DOMContentLoaded
	onMount(() => {
		updateCharacterCounters();
	});

	// Listen for input events on both input fields
	if (browser) {
		document.addEventListener('input', () => {
			updateCharacterCounters();
		});
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
		<span id="charsLeftShortText">Remaining characters: {charsLeftShortText}</span>&nbsp;
		<input type="text" name="text" placeholder="Review" />
		<span id="charsLeftShortText2">Remaining characters: {charsLeftShortText2}</span>&nbsp;
		<div class="addreview__lowerblock">
			<div class="checkbox-container">
				<input
					name="check"
					type="checkbox"
					id="custom-checkbox"
					class="hidden-checkbox"
					bind:checked={sendAnonymously}
				/>
				<label for="custom-checkbox" class="checkbox-label">
					<span class="checkmark" />
					Send Anonymously
				</label>
			</div>
			<button type="submit" id="add" class="addreview__submit">Submit</button>
		</div>
	</form>
</div>
