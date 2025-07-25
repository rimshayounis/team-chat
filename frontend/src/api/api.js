const API_URL = 'http://174.16.0.110:3000';

// =========================
// ✅ USER AUTH
// =========================

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// =========================
// ✅ TEAMS
// =========================

export const fetchTeams = async () => {
  const res = await fetch(`${API_URL}/teams`);
  if (!res.ok) throw new Error('Failed to fetch teams');
  return res.json();
};

export const createTeam = async ({ name, userId }) => {
  const res = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, userId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteTeam = async ({ teamId, userId }) => {
  const res = await fetch(`${API_URL}/teams?teamId=${teamId}&userId=${userId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// =========================
// ✅ TEAM MEMBERS
// =========================

export const joinTeam = async ({ userId, teamId }) => {
  const res = await fetch(`${API_URL}/team-members/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, teamId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getJoinedTeams = async (userId) => {
  const res = await fetch(`${API_URL}/team-members/user/${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // [{ teamId, role }]
};

// =========================
// ✅ CHANNELS
// =========================

export const fetchChannels = async (teamId) => {
  const res = await fetch(`${API_URL}/channels/${teamId}`);
  if (!res.ok) throw new Error('Failed to fetch channels');
  return res.json(); // [{ _id, name, teamId }]
};

export const createChannel = async ({ name, teamId }) => {
  const res = await fetch(`${API_URL}/channels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, teamId }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
