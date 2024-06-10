import React from "react";
import { Card } from "react-bootstrap";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostLikeButtons from "./PostLikeButtons";
import PostEditButtons from "./PostEditButtons";

function BlogCard({ data, editCard = false, handleDelete }) {
    const theme = useSelector(state => state.themeReducer.theme);
    const user = useSelector(state => state.userReducer.user);
    //test image link
    //https://firebasestorage.googleapis.com/v0/b/reactblog-d4990.appspot.com/o/postImage?alt=media&token=b195b579-47a3-409c-a8f6-0ae25546540c
    return (
        <div className="d-flex justify-content-center col-lg-4 col-md-6 my-3">
            <Card style={{ width: "auto", maxWidth: "30rem" }} className="shadow-lg" data-bs-theme={theme}>
                <Link to={`/post/${data.slug}`} className="text-decoration-none" style={{ color: "inherit" }}>
                    <Card.Img
                        variant="top"
                        src={data.image}
                        style={{ maxHeight: "18rem", minHeight: "14rem" }}
                    />
                </Link>
                <div className="d-flex justify-content-between pt-2 ps-3">
                    <div className="profile d-flex align-items-center">
                        <div className="bg-secondary rounded-circle border">
                            <img className="m-0 rounded-circle p-0"
                                style={{ maxHeight: "30px", maxWidth: "30px" }}
                                src={
                                    "https://media.istockphoto.com/id/1316947194/vector/messenger-profile-icon-on-white-isolated-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=1iQ926GXQTJkopoZAdYXgU17NCDJIRUzx6bhzgLm9ps="
                                } />
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
                <Card.Body style={{ height: "auto" }}>
                    <Link to={`/post/${data.slug}`} className="text-decoration-none" style={{ color: "inherit" }}>
                        <Card.Title className="fs-3 fw-bold ">
                            {data.tittle}
                            {/* test Tittle :- Tittle of the blog and sort discription some news papar */}
                        </Card.Title>
                        <Card.Text className="blogDesc">
                            {data.description}
                            {/* test Description :- Some quick example text to build on the card title and make up the
                        bulk of the card's content.quick example text to build on the card
                        title and make up the bulk of the card's */}
                        </Card.Text>
                    </Link>
                </Card.Body>

                <Card.Footer>
                    {editCard ? <PostEditButtons slug={data.slug} handleDelete={ handleDelete } /> : <PostLikeButtons likes={data.likes} />}
                </Card.Footer>

            </Card>
        </div>
    );
}

export default BlogCard;
