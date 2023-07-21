<script lang="ts">
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from '$app/navigation';
  import { firebaseAuth } from '$lib/firebase';
  import { authUser } from "$lib/authStore";

  let email: string;
  let password: string;
  let success: boolean | undefined = undefined;

  const login = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        $authUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || ''
        };
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
        <input type="email" placeholder="Email" class="px-4 py-2 border border-gray-300 rounded-md" required bind:value={email}/>

        <input type="password" placeholder="Password" class="px-4 py-2 border border-gray-300 rounded-md" required bind:value={password}/>
        
        <button type="submit" class="default-action">Login</button>
      </form>
  </div>