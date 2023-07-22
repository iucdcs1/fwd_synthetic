<script lang="ts">
    import { page } from '$app/stores';
    import { logout } from '$lib/signout';
    import session from '$lib/session';
    import { derived } from 'svelte/store';

    const isLoggedIn = derived(session, ($sessionStore) => !!$sessionStore.user);

    const handleLogout = () => {
        logout();
    };

</script>


<link rel="stylesheet" href="../css/style.css">
<header class="header">
    <div class="container">
        <div class="header__inner">

            <div class="user">
                <div class="user__avatar">
                    <img src="../images/pokerfaceLogo.png" alt="Doggo">
                </div>
                <div class="user__content">
                    <div class="user__name">Pokerface team</div>
                    <div class="user__prof">Frontend Developers<br>IU Students</div>
                </div>
            </div>

            <nav class="nav">
                <a class="nav__link" href="../home/#">home</a>
                <a class="nav__link" href="../about/#">about</a>
                <a class="nav__link" href="../enter/#">gen</a>
                {#if $isLoggedIn}
                    <button class="nav__link nav__link--btn" on:click={handleLogout}>Logout</button>
                {:else}
                    {#if $page.url.pathname !== '/'}
                        <a href="../" class="nav__link" class:active={$page.url.pathname === '/register'}>Register</a>
                    {/if}
                    {#if $page.url.pathname !== '/login/'}
                        <a href="/login" class="nav__link" class:active={$page.url.pathname === '/login'}>Login</a>
                    {/if}
                {/if}
                
            </nav>

        </div>
    </div>
</header>
