<script lang="ts">
  import { auth, createUserWithEmailAndPassword } from '../firebase';
  import type { UserCredential } from 'firebase/auth';
  import { getDatabase, ref, set } from 'firebase/database';

  let username: string = '';
  let email: string = '';
  let password: string = '';
  let confirmPassword: string = '';

  async function register(): Promise<void> {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (response.user) {
        const user = response.user;
        const database = getDatabase();
        await set(ref(database, `users/${user.uid}`), {
          displayName: username,
        });
      }

      console.log(response);
      // Registration successful, you can redirect or show a success message
    } catch (error) {
      console.error(error);
      // Registration failed, you can show an error message
    }
  }
</script>
    
    
    <div class="form-container">
        <h2>Register</h2>
        <form on:submit|preventDefault={register}>
          <input type="text" bind:value={username} id="username" name="username" placeholder="Username" required>
          <input type="email" bind:value={email} id="email" name="email" placeholder="Email" required>
          <input type="password" bind:value={password} id="password" name="password" placeholder="Password" required>
          <input type="password" bind:value={confirmPassword} id="confirm_password" name="confirm_password" placeholder="Confirm Password" required>
          <input type="submit" value="Register">
        </form>
      </div>