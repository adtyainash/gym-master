'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AccountCard from "../components/accountCard";
import SearchBarAccounts from '../components/searchBarAccounts';
import TableHeader from '../components/tableHeader';

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
  

const SearchAccountPage = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<Account[]>([]);
    const searchAccount = useSearchParams();
    const searchQuery = searchAccount ? searchAccount.get("q") : null;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
      
    useEffect(() => {
        if (session && session.user.role === "Admin") {
            setIsAdmin(true);
          }
        if (searchQuery) {
            fetch(`/api/searchAccount?${new URLSearchParams({ q: searchQuery }).toString()}`)
                .then(response => response.json())
                .then(data => setUserData(data))
                .catch(error => console.error('Error fetching search results:', error));
        }
    }, [searchQuery, session]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };

    return (
      <div className="container mx-auto mt-8 p-10">
        <div className="grid grid-cols-2 gap-8">
          <h1 className="text-5xl font-bold text-neutral-content">Account Manager</h1>
          <SearchBarAccounts />
        </div>
        <TableHeader />
        <div>
            {userData.map((classInfo, index) => (
                <AccountCard key={index} {...classInfo} />
            ))}
        </div>
      </div>
    );
};

export default SearchAccountPage;