import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { uploadBytes,ref as storageRef, getDownloadURL } from "firebase/storage";


// add new Posts to firestore
export const addData = async (data) => {
    try {
        const docRefId = await addDoc(collection(db, "posts"), data);
    
        return docRefId.id;
    } catch (error) {
        throw error;
    }
};

// get all the posts in firestore
export const getData = async () => {
    try {
        const queryValue = query(collection(db, 'posts'), orderBy('date', 'desc'));
        const result = await getDocs(queryValue);
        const data = result.docs.map((doc) => doc.data());
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// add post image ot firebase storage return image url
export const addPostImage = async (image) => {
    try {
        
        if (image === null) {
            throw new Error('image is needed');
        }
        const imageName = `postImage/image${Date.now()}`;
        const metaData = {
            contentType:'image/png'
        }
        const imageRef = storageRef(storage, imageName);
        await uploadBytes(imageRef, image[0], metaData);
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        throw error;
    }
}
