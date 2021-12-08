import { useState, useEffect, useRef } from 'react';
import PostCard from './Components/PostCard';
import axios from 'axios';
import Modal from './Components/Modal';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4000/posts',
    });
    if (response.status === 200) {
      setPosts(response.data);
    } else {
      console.error('Error');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='App'>
      <div className='container m-auto pt-5 d:flex'>
        <h1 className='display-3 text-center mb-3'>Blog Gamed</h1>
        <header className='text-center p-3'>
          <a href='/html/'>Home</a> | <a href='/html/post.html'>Post</a>
        </header>
        <div className='m-auto text-center'>
          <button
            type='button'
            className='btn btn-success'
            data-bs-toggle='modal'
            data-bs-target='#addModal'
          >
            Add Post
          </button>
        </div>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
      <Modal />
    </div>
  );
}

export default App;
