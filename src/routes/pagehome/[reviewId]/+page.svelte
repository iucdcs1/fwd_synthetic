<script lang="ts">
	export let data;
	const { review } = data;
</script>

<h1>{review.name} {review.score}/5</h1>
<p>{review.text}</p>
<a href="/pagehome">Back to Home</a>
