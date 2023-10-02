import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export type UserLogin = {
  email: string,
  password: string
}

export type SnapshotDocumentData = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>

export type UserCredential = firebase.auth.UserCredential
export type User = firebase.User