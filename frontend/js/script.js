const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || user.role !== 'student') {
  window.location.href = 'index.html';
}

document.getElementById('student-name').innerText = user.name;

fetch('http://localhost:5000/api/events/student', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#event-table tbody');
    data.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.date}</td>
        <td>${event.points}</td>
        <td>${event.status}</td>
      `;
      tbody.appendChild(row);
    });
  });

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}
