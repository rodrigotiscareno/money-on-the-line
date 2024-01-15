import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import SERVER_URL from "../server_url";

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const [detailedUserData, setDetailedUserData] = React.useState();

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/get_user?user_id=${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDetailedUserData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      } else {
        setUser(undefined);
        setDetailedUserData(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
    detailedUserData,
  };
}
