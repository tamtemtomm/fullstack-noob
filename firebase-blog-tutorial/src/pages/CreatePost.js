import React from "react";

const CreatePost = () => {
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGP">
          <label>Title</label>
          <input placeholder="Title..." />
        </div>
        <div className="inputGP">
          <label>Post</label>
          <textarea placeholder="Post..." />
        </div>
        <button>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
