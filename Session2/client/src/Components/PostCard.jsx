import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className='card w-50 m-auto mt-4' key={post.id}>
      <div className='card-body p-4'>
        <h4 className='card-title'>{post.title}</h4>
        <p className='card-text'>{post.body}</p>
        <a href='/' className='btn btn-primary'>
          View post
        </a>
      </div>
      <div className='card-footer text-muted d-flex justify-content-between'>
        <p className='m-0'>{post.createdAt}</p>
      </div>
    </div>
  );
};

export default PostCard;
