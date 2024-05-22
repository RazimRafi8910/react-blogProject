import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addData, addPostImage, getImage } from '../firebase/firebaseDB';
import AlertBox from './AlertBox';

function PostForm() {
  const theme = useSelector(state => state.themeReducer.theme);
  const user = useSelector(state => state.userReducer.user);
  const [isLodding, setIsLodding] = useState(false);
  const [submitError, setSubmitError] = useState('');

  //yup schema for validation
  const schema = yup.object().shape({
    tittle: yup.string().required(),
    description: yup.string().min(2).required(),
    image: yup
      .mixed()
      .required()
      .test('fileExist', 'image is needed', value =>  value && value[0] )
      .test('fileSize', 'file Size is too large', value => value && value[0] && value[0].size <= 5 * 1024 * 1024)
      .test('fileFormat', 'file Format not supported', value => value && value[0] && ['image/png', 'image/jpeg','image/jpg'].includes(value[0].type))
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => { 
    try {
      if (!user) {
        throw Error("Login to upload the post");
      }
      setIsLodding(true);
      // post image upload to storage
      const imageUrl = await addPostImage(data.image);
      const newData = {
        ...data,
        userId: user.uid,
        username: user.displayName,
        likes: 0,
        date: Date.now(),
        image: imageUrl,
      };
      //add post data to firestore
        const refId = await addData(newData);
        console.log(refId);
    } catch (error) {
      setSubmitError(error.message);
        console.log(error);
      } finally {
        setIsLodding(false);
      }
    }

  if (isLodding) {
    return (
      <>
        <div className="container" style={{ height: "100vh" }}>
          <div className="row justify-content-center align-items-center">
            <div class="spinner-border text-primary mt-3" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    )
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
            {submitError && <AlertBox errorMessage={submitError} />}
              <Form onSubmit={handleSubmit(onSubmit)} data-bs-theme={theme}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tittle</Form.Label>
                  <Form.Control type="text" {...register("tittle")} />
                  {errors?.tittle && <p className='text-danger'>{errors.tittle.message }</p>}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={8} {...register("description")} />
                  {errors?.description && <p className='text-danger'>{errors.description.message }</p>}
                </Form.Group>
                <Form.Group controlId="formFileLg" className="mb-3 col-lg-6">
                  <Form.Label>Choose Thumpnale</Form.Label>
                  <Form.Control type="file" size="md" {...register("image")} />
                  {errors?.image && <p className='text-danger'>{errors.image.message }</p> }
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