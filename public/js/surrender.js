async function newFormHandler(event) {
    event.preventDefault();
  
    const pet_name = document.querySelector('input[name="pet-name"]').value;
    const pet_desc = document.querySelector('input[name="pet-desc"]').value;
    const pet_picture = document.querySelector('input[name="pet-picture"]').files[0];
  
    const formData = new FormData();
    formData.append('name', pet_name);
    formData.append('description', pet_desc);
    formData.append('picture', pet_picture);
  
    try {
      const response = await fetch('/api/newpet', {
        method: 'POST',
        body: formData,
      });
      console.log('Response:', response);
      if (!response.ok) {
        throw response;
      }
      document.location.replace('/profile');
    } catch (err) {
      console.error('Error:', err);
      alert(err.statusText);
    }
  }
  
  
  document
    .querySelector('.new-pet-form')
    .addEventListener('submit', newFormHandler);

  
  