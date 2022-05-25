// Function for adding a new comment to a blog
const newFormHandler = async (event) => {
  event.preventDefault();

  const blog_id = event.target.getAttribute('data-id');
  const detail = document.querySelector('#comment-desc').value.trim();

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

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newFormHandler);
