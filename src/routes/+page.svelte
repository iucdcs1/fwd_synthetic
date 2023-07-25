<script lang="ts">
	import { goto } from '$app/navigation';

	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';
	import { authUser } from '$lib/authStore';

	const unsubscribe = authUser.subscribe((user) => {
		if (user) {
			goto('/about');
		}
	});

	unsubscribe();

	let email: string;
	let password: string;

	let success: boolean | undefined = undefined;

	const register = () => {
		createUserWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredentials) => {
				console.log(userCredentials);
				goto('/login');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);

				success = false;
			});
	};
</script>

<div class="form-container">
	<form on:submit|preventDefault={register}>
		<input
			type="email"
			placeholder="Email"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={email}
		/>

		<input
			type="password"
			placeholder="Password"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={password}
		/>

		<button type="submit" class="default-action">Register</button>

		{#if !success && success !== undefined}
			<div class="p-8 text-red-500 bg-red-100">
				There was an error registering. Please try again.
			</div>
		{/if}
	</form>
</div>

<style>
	.default-action {
		cursor: pointer;
		border: 0;
		border-radius: 4px;
		font-weight: 600;
		margin: 0 10px;
		margin-top: 15px;
		width: 200px;
		padding: 10px 0;
		box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
		transition: 0.4s;
		color: rgb(104, 85, 224);
		background-color: rgba(255, 255, 255, 1);
		border: 1px solid rgba(104, 85, 224, 1);
	}
</style>
