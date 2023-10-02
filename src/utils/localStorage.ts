import { User } from "../types/User"

export const setUserLocal = (user: User) => {
  if(user)
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUserLocal = () => {
  const storedUser = localStorage.getItem("user")

  if (storedUser) {
    const user : User = JSON.parse(storedUser)
    return user
  }
  return null
}

export const removeLocal = (key: string) => {
  localStorage.removeItem(key)
}