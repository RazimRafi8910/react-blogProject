import React from 'react';
import BlogCard from '../components/BlogCard/BlogCard';

function Home() {
    return (
        <>
            
            <div className='container mt-3'>
                <div className='text-center'>
                    <h2>Recent Blogs</h2>
                </div>
                <div className='row d-flex '>
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    
                </div>
            </div>
        </>
    )
}

export default Home