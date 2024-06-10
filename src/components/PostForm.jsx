import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdatePost, addPost, addPostImage } from '../firebase/firebaseDB';
import AlertBox from './AlertBox';
import RTE from './RTE';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import ImagePreview from './ImagePreview';

//yup schema for validation
const schema = yup.object().shape({
  tittle: yup.string().min(2).required(),
  description: yup.string().min(2).required(),
  slug: yup.string(),
  content: yup.string().required(),
  });

function PostForm({ post }) {
  const theme = useSelector(state => state.themeReducer.theme);
  const user = useSelector(state => state.userReducer.user);
  const [isLodding, setIsLodding] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      tittle: post?.tittle || '',
      description: post?.description || '',
      image: post?.image || '',
      slug: post?.slug || '',
      content: post?.content || '',
    },
    resolver: yupResolver(schema),
  });

  //watch tittle for creating slug
  const tittleWatch = watch('tittle');

  useEffect(() => {
    setValue('slug', slugFiy(tittleWatch), { shouldValidate: true });
  }, [tittleWatch])

  const onSubmit = async (data) => {
    try {
      if (!user) {
        throw Error("Login to upload the post");
      }
      setIsLodding(true);
      if (post) {
        const updatedData = {
          ...data,
          userId: user.uid,
          username: user.displayName,
          likes: 0,
          date: Date.now(),
          image: post.image,
        }
        let result = await UpdatePost(post.id,updatedData);
        console.log(result);
      } else {
        // post image upload to storage return image url
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
        const refId = await addPost(newData);
        navigate(`/post/${data.slug}`);
      }

    } catch (error) {
      setSubmitError(error.message);
      console.log(error);
    } finally {
      setIsLodding(false);
    }
  }

  const slugFiy = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z/d/s]+/g, '-').replace(/\s+/g, '-');
    }
  }, []);

  if (isLodding) {
    return (
      <>
        <Loader loaderTittle={"Uploading..."} message={"Takes few seconds"} />
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
              <Form.Group className="mb-3" controlId="tittleInput">
                <Form.Label>Tittle</Form.Label>
                <Form.Control type="text" {...register("tittle")} />
                {errors?.tittle ? <p className='text-danger'>{errors.tittle.message}</p> : <p className='text-muted'>slug: http://localhost:3001/post/{getValues('slug')}</p>}
              </Form.Group>
              <Form.Group className="mb-3 d-none" controlId="slugInput">
                <Form.Label>Slug</Form.Label>
                <Form.Control type="text" {...register("slug")} readOnly />
                {errors?.slug && <p className='text-danger'>{errors.slug.message}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="descriptionInput">
                <Form.Label>Short Description</Form.Label>
                <Form.Control as="textarea" rows={4} {...register("description")} />
                {errors?.description && <p className='text-danger'>{errors.description.message}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Content</Form.Label>
                <RTE name={'content'} control={control} defaultValue={getValues('content')} />
                {errors?.content && <p className='text-danger'>{errors.content.message}</p>}
              </Form.Group>
              {
                post ?
                  <ImagePreview imageUrl={post.image} />
                  :
                  <Form.Group controlId="imageInput" className="my-3 col-lg-6">
                    <Form.Label>Cover Image</Form.Label>
                    <Form.Control type="file" size="md" {...register("image")} />
                    {errors?.image && <p className='text-danger'>{errors.image.message}</p>}
                  </Form.Group>
              }
              <div className="d-flex justify-content-center mt-4 my-5">
                <Button variant="primary" type='submit' className="px-5">{post ? "Update" : "Post"}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostForm