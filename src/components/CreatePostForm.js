import React from 'react';

const CreatePostForm = (props) => {
  return (
    <form onSubmit={props.newPost}>
        <label>
          Title
          <input 
            type="text"
            name="title"
            value={props.title}
            onChange={props.handleFieldChange}
          />
        </label>
        <br />
        <label>
          Author
          <input 
            type="text"
            name="author"
            value={props.author}
            onChange={props.handleFieldChange}
          />
        </label>
        <br />
        <label>
          URL
          <input 
            type="text"
            name="url"
            value={props.url}
            onChange={props.handleFieldChange}
          />
        </label>
        <br />
        <button type="submit">Create post</button>
      </form>
  );
};

export default CreatePostForm;