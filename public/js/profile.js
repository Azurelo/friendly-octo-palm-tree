const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#appointment-name').value.trim();
  const time = document.querySelector('#appointment-time').value.trim();

  if (name && time) {
    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify({ name, time }),
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

