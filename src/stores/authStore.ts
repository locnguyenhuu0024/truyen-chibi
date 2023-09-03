import { makeAutoObservable } from 'mobx';
import { User, UserLogin } from '../types/User';
import { 
  signInWithEmailPassword, 
  signInWithFacebook, 
  signInWithGoogle, 
  signOut 
} from '../apis/firebaseAuth';

export class AuthStore {
  user: User | null = null; // Sử dụng type firebase.User

  constructor() {
    makeAutoObservable(this);
  }

  loginWithEmailAndPassword = async (userLogin: UserLogin) => {
    const userCredential = await signInWithEmailPassword(userLogin);
    this.setUser(userCredential?.user || null);
  };

  loginWithGoogle = async () => {
    const userCredential = await signInWithGoogle();
    this.setUser(userCredential?.user || null);
  };

  loginWithFacebook = async () => {
    const userCredential = await signInWithFacebook();
    this.setUser(userCredential?.user || null);
  };

  setUser = (user: User | null) => {
    this.user = user;
  };

  logout = async () => {
    await signOut();
    this.setUser(null);
  };
}