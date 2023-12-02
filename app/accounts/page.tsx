// app/classes/page.tsx
'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
//import { authOptions } from "@/lib/auth";
//import { getServerSession } from "next-auth";
import AccountCard from "../components/accountCard";
import AccountTableHeader from "../components/accountTableHeader";
import SearchBarAccounts from "../components/searchBarAccounts";
// Assuming you have a type for your class data
interface Account {
  userID: string;
  username: string;
  name: string;
  email: string;
  telephone: string;
  membershipStatus: boolean;
  membershipDuration: number;
  address: string;
  image: string;
}

const AccountsPage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<Account[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (session && session.user.role === 'Admin') {
      setIsAdmin(true);
    }

    // Fetch users data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/customers');
        if (!response.ok) {
          throw new Error(`Failed to fetch accounts. Status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data)
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchData();

  }, [session]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="container mx-auto mt-8 p-10">
      <div className=" grid grid-cols-2 gap-8">
        <h1 className="text-5xl font-bold text-white">Customer Accounts</h1>
        <SearchBarAccounts />
      </div>
      <AccountTableHeader />
      <div className="grid gap-10 mt-4">
        {userData.map((classInfo) => (
          <AccountCard key={classInfo.userID} {...classInfo} />
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
