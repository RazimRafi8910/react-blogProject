import React from 'react';
import useTheme from '../context/themeContext';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function PostForm() {
  const { theme } = useTheme();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }
    return (
      <>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-md-10 px-5 d-flex flex-row justify-content-center">
              <h4 className="my-2">New Blog</h4>
            </div>
          </div>
        </div>
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-8 col-10">
              <hr className="mt-0 mb-3" />
              <Form onSubmit={handleSubmit(onSubmit)} data-bs-theme={theme}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tittle</Form.Label>
                  <Form.Control type="text" {...register("tittle")} />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={8} {...register("description")} />
                </Form.Group>
                <Form.Group controlId="formFileLg" className="mb-3 w-50">
                  <Form.Label>Choose Thumpnale</Form.Label>
                  <Form.Control type="file" size="md" />
                </Form.Group>
                <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" type='submit' className="px-5">Post</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
}

export default PostForm