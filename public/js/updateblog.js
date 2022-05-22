
const newFormHandler = async (event) => {
  event.preventDefault();

  const blog_id = document.querySelector('.new-project-form').getAttribute('data-id');
  // const blog_id = 2;
  const title = document.querySelector('#project-name').value.trim();
  const contents = document.querySelector('#project-desc').value.trim();

  console.log(`title is now ${title}`);
  console.log(`contents include ${contents}`);
  console.log(`long shot = ${blog_id}`);

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
console.log(`am i gong super crazy?`)

document
  .querySelector('#updateBtn')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);
