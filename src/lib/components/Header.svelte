<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';
	import { authUser } from '$lib/authStore';

	const handleLogout = () => {
		signOut(firebaseAuth)
			.then(() => {
				// Remove user authentication status from localStorage
				localStorage.removeItem('authUser');
				$authUser = undefined;
				goto('/login');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<link rel="stylesheet" href="/css/style.css" />
<header class="header">
	<div class="container">
		<div class="header__inner">
			<div class="user">
				<div class="user__avatar">
					<img src="/images/pokerfaceLogo.png" alt="Doggo" />
				</div>
				<div class="user__content">
					{#if $authUser}
						<div class="user__name">{$authUser.email}</div>
						<div class="user__prof">You are<br />Logged in</div>
					{:else}
						<div class="user__name">Team Pokerface</div>
						<div class="user__prof">Frontend Developers<br />IU Students</div>
					{/if}
				</div>
			</div>

			<nav class="nav">
				<a class="nav__link" href="/pagehome">home</a>
				<a class="nav__link" href="/about">about</a>
				<a class="nav__link" href="/enter">gen</a>
				{#if $authUser}
					<button class="nav__link nav__link--btn" on:click={handleLogout}>Logout</button>
				{:else}
					{#if $page.url.pathname !== '/'}
						<a href="/" class="nav__link" class:active={$page.url.pathname === '/register'}
							>Register</a
						>
					{/if}
					{#if $page.url.pathname !== '/login/'}
						<a href="/login" class="nav__link" class:active={$page.url.pathname === '/login'}
							>Login</a
						>
					{/if}
				{/if}
			</nav>
		</div>
	</div>
</header>
