<script lang="ts">
	export let data;
	const { review } = data;
</script>

<div class="slug__container">
	<div class="slug__container2">
		<h1 class="slug__title">{review.name}</h1>
		<h1 class="slug__title">{review.score}/5</h1>
	</div>
	<p class="slug__text">{review.text}</p>
	<div class="slug__back"><a href="/pagehome" class="slug__buttontext">Back to Home</a></div>
</div>
