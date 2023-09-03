"use client";
import React from 'react'
import UserData from "@/utils/userData";
import { useEffect, useState } from "react";
type Props = {}

const Login = (props: Props) => {

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('/api/auth/');
    }
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div>login</div>
  )
}

export default Login
