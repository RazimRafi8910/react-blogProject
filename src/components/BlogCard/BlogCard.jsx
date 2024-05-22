import React from "react";
import { Card } from "react-bootstrap";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function BlogCard() {
    const theme = useSelector(state => state.themeReducer.theme);

    return (
        <div className="d-flex justify-content-center col-lg-4 col-md-6 my-3">
            <Card style={{ width: "auto", maxWidth: "30rem" }} data-bs-theme={theme}>
                <Link to={'/post/details'} className="text-decoration-none">
                <Card.Img
                    variant="top"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMG-uuOx17ulED662t2HU1EOFHL8gEUqrewxMWf1IxQ&s"
                    />
                    </Link>
                <div className="d-flex justify-content-between pt-2 ps-3">
                    <div className="profile d-flex align-items-center">
                        <div className="bg-secondary rounded-circle px-3 py-1">
                            <img className="m-0 p-0" src="" alt="" />
                        </div>
                        <div>
                            <p className="m-0 ms-1 text-muted" style={{ fontWeight: 500 }}>
                                username
                            </p>
                        </div>
                    </div>
                    <div className="date me-2">
                        <p className="m-0" style={{ fontWeight: 500 }}>
                            10/10/2020
                        </p>
                    </div>
                </div>
                <Card.Body>
                    <Card.Title className="fs-3 fw-bold ">
                        Tittle of the blog and sort discription some news papar
                    </Card.Title>
                    <Card.Text className="blogDesc">
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.quick example text to build on the card
                        title and make up the bulk of the card's
                    </Card.Text>
                    <a className="mx-2" href="">
                        <i class="text-secondary fs-4 fa-solid fa-thumbs-up"></i>
                       0 Likes
                    </a>
                    <a className="mx-2" href="">
                        <i style={{transform:"rotate(180deg)"}} class="text-secondary fs-4 fa-solid fa-thumbs-up"></i>
                    </a>
                    </Card.Body>
            </Card>
        </div>
    );
}

export default BlogCard;
