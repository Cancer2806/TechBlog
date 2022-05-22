// const { Comments } = require("../../models");


const newFormHandler = async (event) => {
  event.preventDefault();

    const blog_id = event.target.getAttribute('data-id');
  // const blog_id = 2;
  const detail = document.querySelector('#project-desc').value.trim();

  console.log(`details include ${detail}`);
  console.log(`long shot = ${blog_id}`);

  if (detail) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ detail, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blog_id}`);
    } else {
      alert('Failed to add comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('click', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
