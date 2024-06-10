import React, { useEffect,useState } from 'react';
import PostForm from '../components/PostForm';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getPost } from '../firebase/firebaseDB';

function PostEditPage() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();

    useEffect(() => {
        const getPostData = async () => {
            try {
                let postData = await getPost(slug);
                setPost(postData);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        getPostData();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Loader/>
            </>
        )
    }

  return (
      <>
          <div>
              <h1>Edit Post</h1>
        <PostForm post={post}/>        
          </div>
      </>
  )
}

export default PostEditPage