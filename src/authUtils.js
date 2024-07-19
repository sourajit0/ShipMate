
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig'; // Make sure this path is correct

// Sign up function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Return the user object from the credential
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Return the user object from the credential
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Additional utility function to handle sign-out
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};
