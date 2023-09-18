import { useAuth } from "@/context/authContext";
import React from "react";

type ProfilePageProps = {};

export default function ProfilePage(props: ProfilePageProps) {
  const { currentUser } = useAuth();

  return (
    <>
      <div>My profile</div>
      <p>username: {currentUser?.username}</p>
      <p>id: {currentUser?.id}</p>
      <p>email: {currentUser?.email}</p>
    </>
  );
}
