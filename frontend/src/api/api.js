const API_URL = 'http://174.16.0.110:3000'; 

// Register a new user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Login a user
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Get all teams
export const getTeams = async () => {
  const res = await fetch(`${API_URL}/teams`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Create a new team
export const createTeam = async (name) => {
  const res = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};


export const joinTeam = async ({ userId, teamId, role }) => {
  const res = await fetch(`${API_URL}/team-members/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, teamId, role }),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}; // ✅ this is the correct closing of the function

