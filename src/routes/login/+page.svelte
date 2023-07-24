<script lang="ts">
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from '$app/navigation';
  import { firebaseAuth } from '$lib/firebase';
  import { isLoggedIn } from '$lib/getAuthStatus';

  if (isLoggedIn) {
    goto('/about');
  }

	let email: string;
	let password: string;
	let success: boolean | undefined = undefined;

  const login = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        goto('/about');
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
	<form on:submit|preventDefault={login}>
		<input
			type="email"
			placeholder="Email"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={email}
		/>

        <input type="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required bind:value={password}/>
        
        <button type="submit" id="test" class="default-action">Login</button>
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
