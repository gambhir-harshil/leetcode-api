"use client";
import { useAuth } from "@/context/authContext";
import React from "react";

type ProfilePageProps = {};

export default function ProfilePage(props: ProfilePageProps) {
  const { currentUser } = useAuth();

  return (
    <>
      <div>My profile</div>
      <p>username: {currentUser?.session?.user?.username}</p>
      <p>email: {currentUser?.session?.user?.email}</p>
    </>
  );
}
