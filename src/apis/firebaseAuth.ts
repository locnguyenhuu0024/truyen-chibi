import { message } from 'antd';
import { auth, facebookProvider, googleProvider } from '../firebase/firebase-config';
import { UserCredential, UserLogin } from '../types/User';
import * as local from '../utils/localStorage';

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
    local.setUserLocal(userCredential.user!)
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
    local.removeLocal('user')
  } catch (error) {
    message.error('Đăng xuất lỗi.');
    return null;
  }
}