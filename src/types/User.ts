import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export type UserLogin = {
  email: string,
  password: string
}

export type UserCredential = firebase.auth.UserCredential
export type User = firebase.User