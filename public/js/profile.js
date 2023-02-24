const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#appointment-name').value.trim();
  const needed_funding = document.querySelector('#appointment-funding').value.trim();
  const description = document.querySelector('#appointment-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create appointment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete appointment');
    }
  }
};

document
  .querySelector('.new-appointment-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.appointment-list')
  .addEventListener('click', delButtonHandler);

