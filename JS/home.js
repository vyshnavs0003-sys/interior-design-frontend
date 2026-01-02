// =====CONSULTAION FORM VALIDATION + LOCAL STORAGE=============
  
document.addEventListener('DOMContentLoaded', function () {

// ========OPEN MODAL IF URL HASH MATCHES===================

  function openModalIfHash() {
    if (window.location.hash === '#consultation-modal') {
      const el = document.getElementById('consultation-modal');
      if (el) {
        const modal = new bootstrap.Modal(el);
        modal.show();
      }
    }
  }
  openModalIfHash();
  window.addEventListener('hashchange', openModalIfHash);

  const form = document.getElementById('consultationForm');
  if (!form) return;
  // if the form does not exist on the page the 
  // script stops executing further code

  const nameEl  = document.getElementById('cName');
  const emailEl = document.getElementById('cEmail');
  const phoneEl = document.getElementById('cPhone');
  const passEl  = document.getElementById('cPassword');
  const passE2  = document.getElementById('cConfirmPassword');
  const dateEl  = document.getElementById('cDate');

// =======PREFILL FROM LOCALSTORAGE====================

  const saved = JSON.parse(localStorage.getItem('consultationData') || '{}');
  if (saved.name)  nameEl.value  = saved.name;
  if (saved.email) emailEl.value = saved.email;
  if (saved.phone) phoneEl.value = saved.phone;

  function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.text-danger');
    if (errorDiv) errorDiv.textContent = message;
  }

  function clearErrors() {
    form.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name     = nameEl.value.trim();
    const email    = emailEl.value.trim();
    const phone    = phoneEl.value.trim();
    const password = passEl.value.trim();
    const confirmPassword = passE2.value.trim();
    const date     = dateEl.value;

    let valid = true;

    const namePattern  = /^[a-zA-Z\s]{2,50}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,14}$/;
    const passPattern  = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!namePattern.test(name)) {
      showError(nameEl, 'Enter a valid name (2-50 letters).');
      valid = false;
    }

    if (!emailPattern.test(email)) {
      showError(emailEl, 'Enter a valid email address.');
      valid = false;
    }

    if (!phonePattern.test(phone)) {
      showError(phoneEl, 'Enter a valid phone number.');
      valid = false;
    }

    if (!passPattern.test(password)) {
      showError(passEl, 'Password must be at least 6 characters and include a number.');
      valid = false;
    }

    if (password !== confirmPassword) {
      showError(passE2, "Passwords don't match.");
      valid = false;
    }

    if (!date) {
      showError(dateEl, 'Please choose a preferred consultation date.');
      valid = false;
    }

    if (!valid) return;

  // =========SAVE TO LOCALSTORAGE======================

    localStorage.setItem('consultationData', JSON.stringify({
      name: name,
      email: email,
      phone: phone
    }));

    alert('Consultation account created successfully!');
    form.reset();
  });

});

// =================== NAVBAR SCROLL ======================
 
      const nav = document.getElementById('mainNav');

      function handleScroll() {
        if (window.scrollY > 80) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      handleScroll();
      window.addEventListener('scroll', handleScroll);
