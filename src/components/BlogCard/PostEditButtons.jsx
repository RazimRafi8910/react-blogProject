import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function PostEditButtons({ slug, handleDelete }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-">
      <Button
        variant="primary"
        className="mx-3 px-4"
        onClick={() => {
          navigate(`/post/edit/${slug}`);
        }}
      >
        <i className="fa-solid fa-pen"></i>
      </Button>
      
      <Button
        variant="danger"
        className="mx-3 px-4"
        onClick={() => {
          handleDelete(slug);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </Button>
    </div>
  );
}

export default PostEditButtons;
