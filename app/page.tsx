"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Landing Page</h1>

      <button
        onClick={login}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}