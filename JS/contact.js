emailjs.init({
  publicKey: "6rART4JVrrTT00w9x"
});

document.getElementById("callBackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // ==============CLEAR PREVIOUS ERROR===============

  document.querySelectorAll(".error").forEach(err => err.innerHTML = "");

  const name  = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const city  = document.getElementById("city").value;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const phonePattern = /^[0-9]{10}$/;

  if (name === "" || name.length < 3) {
    document.getElementById("nameError").innerHTML = "Name must be at least 3 characters.";
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerHTML = "Enter a valid email address.";
    isValid = false;
  }

  if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").innerHTML = "Phone number must be 10 digits.";
    isValid = false;
  }

  if (city === "") {
    document.getElementById("cityError").innerHTML = "Please select your city.";
    isValid = false;
  }

  if (!isValid) return;

  emailjs.sendForm(
    "service_ln3xe3n",
    "template_y2hun7s",
    this
  ).then(() => {
    alert("Thank you! We will call you back soon.");
    this.reset();
  }).catch(() => {
    alert("Unable to send now. Please try again later.");
  });
});
