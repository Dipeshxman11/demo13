// Get DOM elements
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const btn = document.querySelector('.btn');

// Event listeners
myForm.addEventListener('submit', onSubmit);
btn.addEventListener('mouseover', onButtonHover);
btn.addEventListener('click', onButtonClick);

function onSubmit(e) {
  e.preventDefault();
  
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  if (name === '' || email === ''|| phone === '') {
    showMessage('Please enter all fields.', 'error');
    return;
  }

  // Create a new user object
  const newUser = {
    name,
    email,
    phone
  };

  // Store updated data in local storage
  localStorage.setItem(newUser.email, JSON.stringify(newUser));
  showUsersOnScreen(newUser)

  // Clear fields
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';

  // Display success message
  showMessage('Form submitted successfully!');
}



function showUsersOnScreen(newUser){
    const parentEle= document.getElementById("listOfItems")
    const childEle= document.createElement("li")
    childEle.textContent= newUser.name + "-" + newUser.email + "-" + newUser.phone 
    parentEle.appendChild(childEle);

    // adding delete button and functionality 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
    deleteUser(newUser.email, childEle);
  });

  childEle.appendChild(deleteButton);
  parentEle.appendChild(childEle);
}

function deleteUser(email, listItem) {
    localStorage.removeItem(email);
    listItem.remove();
  }

  

function onButtonHover() {
  console.log('Button hovered');
 
}

function onButtonClick() {
  console.log('Button clicked');
  
}

function showMessage(message, type = 'success') {
  const msg = document.querySelector('.msg');
  msg.classList.remove('error', 'success');
  msg.classList.add(type);
  msg.innerHTML = message;

  // Remove message after 3 seconds
  setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);
}
