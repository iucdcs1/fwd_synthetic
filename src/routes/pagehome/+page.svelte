<script lang="ts">
	export let data;
	async function replacing(buttonId: string) {
		// Assuming '../review' is the base URL, append the buttonId as a URL parameter
		window.location.replace(`../review?button=${buttonId}`);
	}
	async function replacingbutton(buttonId: string) {
		// Assuming '../review' is the base URL, append the buttonId as a URL parameter
		window.location.replace(`../addreview?button=${buttonId}`);
	}
</script>

<div class="pagehome__main">
	<div class="pagehome__container1">
		<p class="pagehome__service">About service</p>
		<p id="about__service">
			Welcome to our website, where we specialize in generating synthetic data for various
			industries and applications. Our team of experts is dedicated to providing high-quality
			synthetic data that can be used for a wide range of purposes, including machine learning, data
			analysis, and testing.
		</p>
	</div>
	<div class="pagehome__container2">
		<div class="pagehome__container2header">
			<p class="pagehome__feedback">Review</p>
			<button class="pagehome__add" on:click={() => replacingbutton('Button')}>Add review</button>
		</div>
		<div class="slider-container">
			<div class="slider">
				<div class="slides">
					{#each data.reviews as review}
						<div id="slides__{review.number}" class="slide">
							<div class="slides__alltext">
								<div class="slide__header">
									<h3 class="slide__name">{review.name}</h3>
									<p class="slide__grade">{review.score}/5</p>
								</div>
								<a class="slide__button slides__text" href={'/pagehome/' + review.number}
									><p class="slide__name" style="font-size: 18px;">{review.short_text}</p></a
								>
							</div>
							<a class="slide__prev" href="#slides__{review.number - 1}" title="Prev" />
							<a class="slide__next" href="#slides__{review.number + 1}" title="Next" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
