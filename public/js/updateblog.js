
const newFormHandler = async (event) => {
  event.preventDefault();

  const blog_id = document.querySelector('.new-project-form').getAttribute('data-id');
  // const blog_id = 2;
  const title = document.querySelector('#project-name').value.trim();
  const contents = document.querySelector('#project-desc').value.trim();

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

const delCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const comment_id = event.target.getAttribute('data-id');
    // const blog_id = event.target.getAttribute('data-blog');
    const blog_id = document.querySelector('.new-project-form').getAttribute('data-id');

    console.log(`comment id is ${comment_id}`);
    console.log(`blog id is ${blog_id}`);
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