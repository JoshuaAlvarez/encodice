import { useState, useEffect } from "react";

interface User {
  uid: string;
  email: string;
  displayName: string;
}

const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/user-profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>UID: {userData.uid}</p>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.displayName}</p>
    </div>
  );
};

export default UserProfile;
