// 1️⃣ Object to store form data (must exist outside functions)
const formData = {
  email: '',
  message: '',
};

// 2️⃣ Get form element
const form = document.querySelector('.feedback-form');

// 3️⃣ Access form fields via elements
const emailField = form.elements.email;
const messageField = form.elements.message;

// 4️⃣ LocalStorage key (must be exactly this name)
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// 5️⃣ Try to read saved data from localStorage
const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

// 6️⃣ If data exists in localStorage → restore it
if (savedData) {
  const parsedData = JSON.parse(savedData);

  // Fill form fields
  emailField.value = parsedData.email ?? '';
  messageField.value = parsedData.message ?? '';

  // Update formData object
  formData.email = parsedData.email ?? '';
  formData.message = parsedData.message ?? '';
}

// 7️⃣ Listen for input events on the form (event delegation)
form.addEventListener('input', event => {
  // Update object values (trim removes spaces from start/end)
  formData.email = emailField.value.trim();
  formData.message = messageField.value.trim();

  // Save updated object to localStorage
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(formData)
  );
});

// 8️⃣ Handle form submission
form.addEventListener('submit', event => {
  event.preventDefault(); // stop page reload

  // 9️⃣ Validate fields
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  // 🔟 If everything is filled → log result
  console.log(formData);

  // 1️⃣1️⃣ Clear localStorage
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  // 1️⃣2️⃣ Reset object values
  formData.email = '';
  formData.message = '';

  // 1️⃣3️⃣ Reset form fields
  form.reset();
});
