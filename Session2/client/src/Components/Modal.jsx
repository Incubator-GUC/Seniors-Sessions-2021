import axios from 'axios';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Modal = () => {
  const titleRef = useRef('');
  const bodyRef = useRef('');
  const submitPost = async () => {
    const newPost = {
      id: uuidv4().toString(),
      title: titleRef.current.value,
      body: bodyRef.current.value,
      createdAt: Date.now(),
    };
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/posts',
      data: { post: newPost },
    });
    if (res.status === 201) {
      console.log('Post created successfully');
      titleRef.current.value = '';
      bodyRef.current.value = '';
    } else {
      console.error(res.message);
    }
  };
  return (
    <div>
      <div
        className='modal fade'
        id='addModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add Post
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label htmlFor='exampleInputEmail1' className='form-label'>
                  Title
                </label>
                <input
                  type='text'
                  ref={titleRef}
                  className='form-control'
                  id='title'
                  aria-describedby='title'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='exampleInputPassword1' className='form-label'>
                  Body
                </label>
                <textarea
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  ref={bodyRef}
                ></textarea>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={submitPost}
                data-bs-dismiss='modal'
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
