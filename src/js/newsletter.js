
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function displayThankYouMessage() {
  const form = document.getElementById("newsletter-form");
    form.innerHTML = "<h1>Thank you for subscribing!</h1>";
}

function displayErrorMessage() {
  const form = document.getElementById("newsletter-form");
  form.innerHTML = "<h1>Sorry, that is not a valid email address</h1>";
}

function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;

  if (emailIsValid(email)) {
    displayThankYouMessage();
  } else {
    displayErrorMessage();
  }
}

document.getElementById("newsletter-form").addEventListener("submit", handleSubmit);
























    