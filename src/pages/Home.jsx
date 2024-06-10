import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard/BlogCard';
import { getAllPosts } from '../firebase/firebaseDB';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [isLodding, setIsLodding] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const receiveData = async () => {
            try {
                let data = await getAllPosts()
                setBlogs(data);
            } catch (error) {
                console.log(error)
                setError(error.message);
            } finally {
                setIsLodding(false);
            }
        }
        receiveData();
        return () => {
            receiveData()
        };
    }, []);

    if (isLodding) {
        return (
            <>
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row justify-content-center h-75 align-items-center">
                        <div className="spinner-border text-primary align-items-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }



    return (
        <>
            
            <div className='container mt-5' style={{minHeight:"100vh"}}>
                <div className='text-center'>
                    <h2>Recent Blogs</h2>
                </div>
                <div className='row d-flex'>
                    {blogs.map((blog,index) => {
                       return <BlogCard key={index} data={blog} />
                    })}                    
                </div>
            </div>
        </>
    )
}

export default Home