import { message } from "antd"
import { firestore } from "../firebase/firebase-config"
import { FavoriteComic } from "../types/Comic"
import { messageSuccess, messageFailed } from "../styles/message"

export const addFavoriteComics = async (userId: string, favoriteComic: FavoriteComic) => {
  const {comicId, comicName} = favoriteComic
  try {
    if (!userId) {
      message.open(messageFailed(`Bạn chưa đăng nhập.`))
      return
    }

    // Kiểm tra xem người dùng có tồn tại trong Firestore hay không
    const userRef = firestore.collection("users").doc(userId)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      // Nếu người dùng chưa tồn tại, thêm người dùng mới
      await userRef.set({ /* Thông tin người dùng */ })
    }

    // Kiểm tra xem truyện yêu thích đã tồn tại hay chưa
    const favoriteComicRef = userRef.collection("favoriteComics").doc(comicId)
    const favoriteComicDoc = await favoriteComicRef.get()

    if (!favoriteComicDoc.exists) {
      // Nếu truyện chưa được thêm vào yêu thích, thêm nó vào
      await favoriteComicRef.set(favoriteComic)
      message.open(messageSuccess(`Đã theo dõi truyện ${comicName}`))
    } else {
      // Nếu truyện đã tồn tại trong yêu thích, có thể xử lý tùy ý
      // Ví dụ: thông báo rằng truyện đã tồn tại trong yêu thích
      message.open(messageFailed(`Truyện ${comicName} đã được theo dõi trước đó`))
    }
  } catch (error) {
    message.open(messageFailed(`Không thể thêm truyện ${comicName} vào yêu thích`))
  }
}


export const getFavoriteComics = async (userId: string): Promise<FavoriteComic[]> => {
  try {
    if (!userId) {
      message.open(messageFailed(`Bạn chưa đăng nhập.`))
      return []
    }

    const favoriteComicsRef = firestore.collection(`users/${userId}/favoriteComics`)
    const querySnapshot = await favoriteComicsRef.get()

    const favoriteComics: FavoriteComic[] = []

    querySnapshot.forEach((doc) => {
      const favoriteComicData = doc.data() as FavoriteComic
      favoriteComics.push(favoriteComicData)
    })
    return favoriteComics
  } catch (error) {
    message.open(messageFailed(`Không thể lấy danh sách truyện yêu thích`))
    return []
  }
}

export const removeFavoriteComics = async (userId: string, comicId: string) => {
  try {
    if (!userId) {
      message.open(messageFailed(`Bạn chưa đăng nhập.`));
      return;
    }

    // Kiểm tra xem người dùng có tồn tại trong Firestore hay không
    const userRef = firestore.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Người dùng không tồn tại, không cần thực hiện bất kỳ thao tác nào
      message.open(messageFailed(`Người dùng không tồn tại.`));
      return;
    }

    // Kiểm tra xem truyện yêu thích đã tồn tại hay chưa
    const favoriteComicRef = userRef.collection("favoriteComics").doc(comicId);
    const favoriteComicDoc = await favoriteComicRef.get();

    if (favoriteComicDoc.exists) {
      // Truyện yêu thích tồn tại, xóa nó khỏi danh sách yêu thích
      await favoriteComicRef.delete();
      message.open(messageSuccess(`Đã bỏ theo dõi truyện có ID ${comicId}`));
    } else {
      // Truyện không tồn tại trong yêu thích, có thể xử lý tùy ý
      // Ví dụ: thông báo rằng truyện không tồn tại trong yêu thích
      message.open(messageFailed(`Truyện có ID ${comicId} không tồn tại trong danh sách yêu thích`));
    }
  } catch (error) {
    message.open(messageFailed(`Không thể bỏ truyện có ID ${comicId} khỏi danh sách yêu thích`));
  }
};

