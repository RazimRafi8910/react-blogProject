import { collection, addDoc, getDocs, orderBy, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { uploadBytes,ref as storageRef, getDownloadURL } from "firebase/storage";


// add new Posts to firestore
export const addPost = async (data) => {
    try {
        const docRefId = await addDoc(collection(db, "posts"), data);
    
        return docRefId.id;
    } catch (error) {
        throw error;
    }
};

// get all the posts in firestore
export const getAllPosts = async () => {
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

// get single post
export const getPost = async (slug) => {
    try {
        const postRef = query(collection(db, 'posts'), where('slug', '==', slug));
        const post = await getDocs(postRef);
        const data = post.docs[0].data();
        data.id = post.docs[0].id;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const UpdatePost = async (postId,data)=>{
    try {
        const docRefId = await updateDoc(doc(db, 'posts', postId), data);
        return docRefId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// get user post
export const getUserPosts = async (userId) => {
    try {
        const postRef = query(collection(db, 'posts'), where('userId', '==', userId));
        const post = await getDocs(postRef);
        const data = post.docs.map((doc) => {
            return doc.data();
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// delete post for user
export const deletePost = async (slug) => {
    try {
        const { id:postId  } = await getPost(slug);
        await deleteDoc(doc(db, 'posts', postId));
        console.log('deleted');
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// add post image to firebase storage and return image url
export const addPostImage = async (image) => {
    try {
        
        if (image === null) {
            throw new Error('image is needed');
        }
        
        if (image[0].type !== 'image/png') {
            throw new Error('file Format not supported');
        }

        if (image[0].size > 5 * 1024 * 1024) {
            throw new Error('file Size is too large');
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

// Todo Image validation:-
// image: yup
//     .mixed()
//     .test('fileSize', 'file Size is too large', value => value && value[0] && value[0].size <= 5 * 1024 * 1024)
//     .test('fileFormat', 'file Format not supported', value => value && value[0] && ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type))
