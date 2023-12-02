// components/AccountCard.tsx
'use client';
import React, { useState } from 'react';
import AccountDetailsModal from './accountDetailsModal';
import Image from 'next/image';

interface AccountCardProps {
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

const AccountCard: React.FC<AccountCardProps> = ({
  userID,
  username,
  name,
  email,
  telephone,
  membershipStatus,
  membershipDuration,
  address,
  image
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="card bg-neutral rounded-lg hover:shadow-lg p-4 grid grid-cols-6 gap-4 items-center">
      <div className="col-span-1">
      <Image src={image} alt={`Image for ${username}`} width={96} height={96}/>
      </div>
      <div className="col-span-1 text-center text-neutral-content">{username}</div>
      <div className="col-span-1 text-center text-neutral-content">{email}</div>
      <div className="col-span-1 text-center text-neutral-content">{`${membershipStatus}`}</div>
      <div className="col-span-1 text-center text-neutral-content">{`${membershipDuration} day(s)`}</div>
      <div className="col-span-1 text-center text-neutral-content">
        <button onClick={toggleModal} className="btn btn-primary text-white rounded px-4 py-2">
          VIEW
        </button>
      </div>

      {isModalOpen && (
        <AccountDetailsModal
          userID={userID}
          username={username}
          name={name}
          email={email}
          telephone={telephone}
          membershipStatus={membershipStatus.toString()}
          membershipDuration={membershipDuration}
          address={address}
          image={image}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default AccountCard;
