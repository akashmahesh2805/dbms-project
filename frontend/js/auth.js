const apiUrl = 'http://localhost:5000/api/auth';

document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirect based on role
    if (data.user.role === 'student') window.location.href = 'student.html';
    else if (data.user.role === 'coordinator') window.location.href = 'coordinator.html';
    else if (data.user.role === 'faculty') window.location.href = 'faculty.html';
  } else {
    alert(data.error);
  }
});

document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const role = document.getElementById('register-role').value;

  const res = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();
  if (res.ok) {
    alert('Registered successfully. Please login.');
  } else {
    alert(data.error || 'Registration failed');
  }
});
