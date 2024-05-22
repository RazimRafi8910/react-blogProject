import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { uploadBytes,ref as storageRef, getDownloadURL } from "firebase/storage";


export const addData = async (data) => {
    try {
        const docRefId = await addDoc(collection(db, "posts"), data);
    
        return docRefId.id;
    } catch (error) {
        throw error;
    }
};

// add post image ot firebase storage return image url
export const addPostImage = async (image) => {
    try {
        if (image === null) {
            throw new Error('image is needed');
        }
        const imageName = `postImage/${image[0].name}`;
        const metaData = {
            contentType:'image/png'
        }
        const imageRef = storageRef(storage, imageName);
        const snapShot = await uploadBytes(imageRef, image[0], metaData);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        throw error;
    }
}
