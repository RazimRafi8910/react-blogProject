import React from "react";
import { Card } from "react-bootstrap";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function BlogCard({data}) {
    const theme = useSelector(state => state.themeReducer.theme);
    //test image link
    //https://firebasestorage.googleapis.com/v0/b/reactblog-d4990.appspot.com/o/postImage?alt=media&token=b195b579-47a3-409c-a8f6-0ae25546540c
    return (
        <div className="d-flex justify-content-center col-lg-4 col-md-6 my-3">
            <Card style={{ width: "auto", maxWidth: "30rem"}} className="shadow-lg" data-bs-theme={theme}>
                <Link to={'/post/details'} className="text-decoration-none">
                    <Card.Img                 
                        variant="top"                        
                        src={data.image}
                        style={{maxHeight:"18rem", minHeight:"14rem"}}
                    />
                    </Link>
                <div className="d-flex justify-content-between pt-2 ps-3">
                    <div className="profile d-flex align-items-center">
                        <div className="bg-secondary rounded-circle px-3 py-1">
                            <img className="m-0 p-0" src="" alt="" />
                        </div>
                        <div>
                            <p className="m-0 ms-1 text-muted" style={{ fontWeight: 500 }}>
                                {data.username}
                            </p>
                        </div>
                    </div>
                    <div className="date me-2">
                        <p className="m-0" style={{ fontWeight: 500 }}>
                            10/10/2020
                        </p>
                    </div>
                </div>
                <Card.Body style={{height:"auto"}}>
                    <Card.Title className="fs-3 fw-bold ">
                        {data.tittle}
                        {/* test Tittle :- Tittle of the blog and sort discription some news papar */}
                    </Card.Title>
                    <Card.Text className="blogDesc">
                        { data.description }
                        {/* test Description :- Some quick example text to build on the card title and make up the
                        bulk of the card's content.quick example text to build on the card
                        title and make up the bulk of the card's */}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="">
                <a className="mx-2" href="">
                        <i class="text-secondary fs-4 fa-solid fa-thumbs-up"></i>
                       {data.likes} Likes
                    </a>
                    <a className="mx-2" href="">
                        <i style={{transform:"rotate(180deg)"}} class="text-secondary fs-4 fa-solid fa-thumbs-up"></i>
                    </a>
                    </div>
                </Card.Footer>
            </Card>
            </div>
    );
}

export default BlogCard;
