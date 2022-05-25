// Function for updating an existing blog
const newFormHandler = async (event) => {
  event.preventDefault();

  const blog_id = document.querySelector('.new-blog-form').getAttribute('data-id');
  const title = document.querySelector('#blog-name').value.trim();
  const contents = document.querySelector('#blog-desc').value.trim();

  if (contents) {
    const response = await fetch(`/api/blogs`, {
      method: 'PUT',
      body: JSON.stringify({ title, contents, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to update blog');
    }
  }
};

// Function to allow deleting of blog
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

// Function to allow deletion of problematic comments
const delCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const comment_id = event.target.getAttribute('data-id');
    const blog_id = document.querySelector('.new-blog-form').getAttribute('data-id');

    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/update/${blog_id}`);
    } else {
      alert('Failed to delete comment');
}
  }
};

document
  .querySelector('#updateBtn')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#delcomm')
  .addEventListener('click', delCommentHandler);