import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserPosts } from '../firebase/firebaseDB';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard/BlogCard';
import { deletePost } from '../firebase/firebaseDB';

function UserPostPage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let getPost = async () => {
            try {
                let post = await getUserPosts(userId);
                setPosts(post);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getPost();
    }, [userId]);

    const handleDelete = async (slug) => {
        try {
            setLoading(true);
             await deletePost(slug);
            navigate(`/post/user/${userId}`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!posts.length) {
        return (
            <>
                <div className='container mt-5 pt-5' style={{ minHeight: "100vh" }}>
                    <figure className='d-flex justify-content-center'>
                        <img src="https://clipart-library.com/img/2061672.png" className='img-fluid' style={{ maxHeight: "400px", maxWidth: "200px" }} />
                    </figure>
                    <div className="text-center">
                        <h1>Opps!. You don't have any Posts yet....</h1>
                        <p className='fs-5'>Create a new Post</p>
                        <div className='d-flex justify-content-center'>
                            <Link to={'/post/new'} className='btn btn-primary'>Create Post</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='container mt-5 pt-3' style={{ minHeight: "100vh" }}>
                <div className='text-center mt-1'>
                    <h2>Your post</h2>
                    <hr className='m-0' />
                </div>
                <div className="row d-flex">
                    {posts.map((post, index) => (
                        <BlogCard key={index} data={post} editCard={true} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserPostPage