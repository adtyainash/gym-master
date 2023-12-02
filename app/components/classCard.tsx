'use client';
import React, { useState } from 'react';
import ClassDetailsModal from './classDetailsModal';
import Image from 'next/image';

interface Equipment {
  name: string;
  weight?: number;
}
interface ClassCardProps {
  id: number;
  className: string;
  instructorName: string;
  instructorId: number;
  price: string;
  status: string;
  quota: string;
  image: string;
  // Assuming you have these additional props
  equipments: Equipment[];
  description: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  className,
  instructorName,
  instructorId,
  price,
  status,
  quota,
  image,
  equipments,
  description
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="card bg-neutral rounded-lg hover:shadow-lg p-4 grid grid-cols-7 gap-4 items-center">
      <div className="col-span-1">
        <Image src={'/images/noimg.jpg'} alt={`Image for ${className}`} className="w-full h-auto rounded" width={153} height={114}/>
      </div>
      <div className="col-span-1 text-center text-neutral-content">{className}</div>
      <div className="col-span-1 text-center text-neutral-content">{instructorName}</div>
      <div className="col-span-1 text-center text-neutral-content">{price}</div>
      <div className="col-span-1 text-center text-neutral-content">{status}</div>
      <div className="col-span-1 text-center text-neutral-content">{`${quota} members`}</div>
      <div className="col-span-1 text-center">
        <button onClick={toggleModal} className="btn btn-primary text-white rounded px-4 py-2">
          VIEW
        </button>
      </div>

      {isModalOpen && (
        <ClassDetailsModal
          id={`modal_${id}`}
          className={className}
          instructorName={instructorName}
          instructorId={instructorId}
          price={price}
          status={status}
          quota={quota}
          image={image}
          equipments={equipments}
          description={description}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default ClassCard;