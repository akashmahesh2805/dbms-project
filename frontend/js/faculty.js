const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || user.role !== 'faculty') {
  window.location.href = 'index.html';
}

document.getElementById('faculty-name').innerText = user.name;

document.getElementById('absent-form').addEventListener('submit', async e => {
  e.preventDefault();
  const date = document.getElementById('date').value;

  // You can send class info if applicable
  const res = await fetch(`http://localhost:5000/api/faculty/absent?date=${date}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const students = await res.json();

  const list = document.getElementById('absent-list');
  list.innerHTML = '';

  if (students.length === 0) {
    list.innerHTML = '<li>No absent students due to events on this date.</li>';
    return;
  }

  students.forEach(student => {
    const li = document.createElement('li');
    li.innerText = `${student.name} (${student.email}) - Event: ${student.event_title}`;
    list.appendChild(li);
  });
});

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}
