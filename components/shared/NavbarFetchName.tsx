"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type UserState =
  | { loggedIn: false }
  | { loggedIn: true; first_name: string };

export default function NavbarFetchName() {
  const [user, setUser] = useState<UserState>({ loggedIn: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          setUser({ loggedIn: false });
          return;
        }

        const data = await res.json();

        if (data?.loggedIn) {
          setUser({ loggedIn: true, first_name: data.first_name });
        } else {
          setUser({ loggedIn: false });
        }
      } catch (err) {
        setUser({ loggedIn: false });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Loading state → show login (don't block layout)
  if (loading) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium hover:text-red-500 transition-colors"
      >
        Login
      </Link>
    );
  }

  // ✅ Logged in → clickable name
  if (user.loggedIn) {
    return (
      <Link
        href="/user"
        className="text-sm font-medium hover:text-red-500 transition-colors"
      >
        Hi, {user.first_name}
      </Link>
    );
  }

  // ❌ Not logged in
  return (
    <Link
      href="/login"
      className="text-sm font-medium hover:text-red-500 transition-colors"
    >
      Login
    </Link>
  );
}
