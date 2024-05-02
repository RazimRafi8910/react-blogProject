import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, provider } from "./firebase";

export const googleLoging = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
  

export const emailLogin = async (email,password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const emailSignin = async(email, password, username) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: username });
    return result.user;
  } catch (error) {
    console.log(error)
    throw error;
  }
}