const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || user.role !== 'coordinator') {
  window.location.href = 'index.html';
}

document.getElementById('coordinator-name').innerText = user.name;

// Add Event
document.getElementById('event-form').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const points = document.getElementById('points').value;

  const res = await fetch('http://localhost:5000/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, date, points })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Event created!');
    loadEvents(); // reload list
  } else {
    alert(data.error || 'Failed to create event');
  }
});

// Load Events
async function loadEvents() {
  const res = await fetch('http://localhost:5000/api/events/created', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const events = await res.json();
  const tbody = document.querySelector('#event-table tbody');
  tbody.innerHTML = '';

  events.forEach(event => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.title}</td>
      <td>${event.date}</td>
      <td>${event.points}</td>
      <td><button onclick="viewParticipants(${event.id})">View</button></td>
    `;
    tbody.appendChild(row);
  });
}

async function viewParticipants(eventId) {
  const res = await fetch(`http://localhost:5000/api/events/${eventId}/participants`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const participants = await res.json();
  const list = document.getElementById('participants-list');
  list.innerHTML = '';
  participants.forEach(p => {
    const li = document.createElement('li');
    li.innerText = `${p.name} (${p.email})`;
    list.appendChild(li);
  });

  document.getElementById('participants-section').style.display = 'block';
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

loadEvents();
