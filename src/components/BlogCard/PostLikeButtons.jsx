import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PostLikeButtons({ likes }) {
    return (
        <>
            <div>
                <Link className="mx-2 text-decoration-none text-dark" to={'/'} >
                    <i className="text-secondary me-1 fs-4 fa-solid fa-thumbs-up"></i>
                    {likes}
                </Link>
                <Link className="mx-2 text-decoration-none text-dark" to={'/'}>
                    <i style={{ transform: "rotate(180deg)" }} className="text-secondary fs-4 fa-solid fa-thumbs-up"></i>
                </Link>
            </div>
        </>
    )
}

export default PostLikeButtons