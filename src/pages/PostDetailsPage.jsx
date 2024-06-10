import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '../firebase/firebaseDB';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

function PostDetailsPage() {
  const theme = useSelector(state => state.themeReducer.theme);
  const [loading,setLoading ] = useState(true);
  const [post, setPost] = useState(null); 
  const { slug } = useParams();
  

  useEffect(() => {
    const reciveData = async () => {
      try {
        let post = await getPost(slug);
        let dateFormat = new Date(post.date);
        let formatPost = {
          ...post,
          date: dateFormat.toLocaleDateString(),
        };
        setPost(formatPost);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    reciveData();
  }, [slug]);


  if (loading) {
    return (
      <>
        <Loader loaderTittle={'Fetching'}/>
      </>
    )
  }

  return (
    <>
      <div className='container' style={{ minHeight: '100vh' }} data-bs-theme={theme}>
        <h1>Post details</h1>
        <div className=''>
          <img className='rounded d-block img-fluid object-fit-contain mx-auto' src={post.image} style={{minWidth:'60vw',maxHeight:'70vh'}} />
        </div>
        <div className='text-'>
          <p className='text-muted fs-5 m-0'>{ post.date }</p>
        </div>
      <h1>{post.tittle}</h1>
        <div className=''>
          <h6>{ post.description }</h6>
        </div>
        <hr />
        <div className='content pb-5'>
           {parse(post.content)}
        </div>
      </div>
    </>
  )
}
export default PostDetailsPage

