import { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

export default function Profile({ token, user }) {
  const [profile, setProfile] = useState(user);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      getProfile(token)
        .then((data) => setProfile(data))
        .catch(() => setError('Profile loading failed'));
    }
  }, [user, token]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {error && <div className="alert">{error}</div>}
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
    </div>
  );
}
