import Image from 'next/image';
import React, { FC } from 'react';


interface AccountDetailsModalProps {
    userID: string;
    username: string;
    name: string;
    email: string;
    telephone: string;
    membershipStatus: string;
    membershipDuration: number;
    address: string;
    image: string;
    onClose: () => void;
}

const AccountDetailsModal:FC<AccountDetailsModalProps> = ({
    userID,
    username,
    name,
    email,
    telephone,
    membershipStatus,
    membershipDuration,
    address,
    image,
    onClose
}) => {
    return (
        <dialog id={userID} className='modal modal-bottom sm:modal-middle' open>
            <div className='modal-box bg-neutral'>
                {/* Image */}
                <div className='flex justify-center'>
                    <div className='avatar placeholder mb-8'>
                        <div className='w=24 h-24 rounded-full'>
                            <Image src={image} alt={`Image for ${username}`} width={96} height={96} />
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <h3 className="text-lg font-bold text-center mb-4">Account Details</h3>
                
                {/* Form Fields*/}
                <div className='form-controll w-full'>
                    <label className='label'>
                        <span className='label-text'>Username</span>
                    </label>
                    <input type='text' value={username} className='input input-bordered w-full' readOnly />

                    <label className='label'>
                        <span className='label-text'>Name</span>
                    </label>
                    <input type='text' value={name} className='input input-bordered w-full' readOnly />

                    <label className='label'>
                        <span className='label-text'>Email</span>
                    </label>
                    <input type='text' value={email} className='input input-bordered w-full' readOnly />

                    <label className='label'>
                        <span className='label-text'>Telephone</span>
                    </label>
                    <input type='text' value={telephone} className='input input-bordered w-full' readOnly />

                    <label className='label'>
                        <span className='label-text'>Address</span>
                    </label>
                    <input type='text' value={address} className='input input-bordered w-full' readOnly />

                    <label className='label'>
                        <span className='label-text'>Status</span>
                    </label>
                    <input type='text' value={membershipStatus} className='input input-bordered w-full' readOnly />

                    <label className='label'>
                        <span className='label-text'>Membership Expiration Date</span>
                    </label>
                    <input type='text' value={`${membershipDuration} day(s)`} className='input input-bordered w-full' readOnly />
                    
                </div>

                {/* Buttons */}
                <div className='modal-action justify-center border-t pt-4'>
                <button className="btn btn-outline" onClick={onClose}>Go Back</button>
                </div>
            </div>
        </dialog>
    );
};

export default AccountDetailsModal;