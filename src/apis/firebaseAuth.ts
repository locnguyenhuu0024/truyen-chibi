import { message } from 'antd';
import { auth, facebookProvider, googleProvider } from '../firebase/firebase-config';
import { UserCredential, UserLogin } from '../types/User';

export const signUpByEmailPassword = async () => {
  try {
    message.success('Đăng nhập thành công!');
    // const userCredential: UserCredential | null = await auth.createUserWithEmailAndPassword();
    return null;
  } catch (error) {
    message.error('Lỗi đăng nhập. Vui lòng kiểm tra email và mật khẩu.');
    return null;
  }
}

export const signInWithEmailPassword = async (user: UserLogin) => {
  try {
    const userCredential: UserCredential | null = await auth.signInWithEmailAndPassword(user.email, user.password);
    message.success('Đăng nhập thành công!');
    return userCredential;
  } catch (error) {
    message.error('Lỗi đăng nhập. Vui lòng kiểm tra email và mật khẩu.');
    return null;
  }
}

export const signInWithGoogle = async () => {
  try {
    const userCredential: UserCredential | null = await auth.signInWithPopup(googleProvider);
    message.success('Đăng nhập thành công!');
    return userCredential;
  } catch (error) {
    console.log(error)
    message.error('Lỗi đăng nhập. Vui lòng kiểm tra email và mật khẩu.');
    return null;
  }
}

export const signInWithFacebook = async () => {
  try {
    const userCredential: UserCredential | null = await auth.signInWithPopup(facebookProvider);
    message.success('Đăng nhập thành công!');
    return userCredential;
  } catch (error) {
    message.error('Lỗi đăng nhập. Vui lòng kiểm tra email và mật khẩu.');
    return null;
  }
}

export const signOut = async () => {
  try {
    await auth.signOut();
    message.success('Đăng xuất thành công!');
  } catch (error) {
    message.error('Đăng xuất lỗi.');
    return null;
  }
}