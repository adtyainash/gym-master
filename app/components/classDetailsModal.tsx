import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from 'next/router';
// Add a type definition for your component's props
export interface Equipment {
  name: string;
  weight?: number;
}

interface ClassDetailsModalProps {
  id: string;
  className: string;
  instructorName: string;
  instructorId: number;
  price: string;
  status: string;
  quota: string;
  image: string;
  equipments: Equipment[]; // Specify that equipments is an array of Equipment
  description: string;
  onClose: () => void;
}

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ id, className, instructorName, price, status, quota, image, equipments = [], description, onClose }) => {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    if (session && session.user.role === "Admin") {
      setIsAdmin(true);
    }

    if (session?.user?.id) {
      fetch(`/api/users/${session.user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          setIsMember(userData.membershipStatus);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
    if (status == "Available") {
      setIsStatus(true);
    }
  }, [session]);

  const handleEnroll = async () => {
    // Check if the user has a valid session and a user ID
    if (!session?.user?.id) {
      console.error("User is not authenticated.");
      return;
    }
    const classId = parseInt(id.split('_')[1]);
    // Define the enrollment details
    const enrollmentDetails = {
      gymClassId: classId
    };
    console.log(enrollmentDetails);
    try {
      // Send a PATCH request to update the user's membership status
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentDetails),
      });

      // Handle the response
      if (!response.ok) {
        throw new Error(`Failed to enroll. Status: ${response.status}`);
      }

      // Parse the JSON response (if needed)
      const result = await response.json();

      console.log(result.message);
      // Close the modal and refresh the page to reflect the changes
      onClose();
    } catch (error) {
      console.error("Error enrolling in class:", error);
    }
  };

  const handleDelete = () => {
    // Extract the numeric part from the id and parse it into an integer
    const classIdToDelete = parseInt(id.split('_')[1]);
  
    if (isNaN(classIdToDelete)) {
      console.error("Invalid ID format for deletion");
      return;
    }
  
    console.log("Deleting class with ID:", classIdToDelete);
    fetch(`/api/classes/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: classIdToDelete }), // Pass the parsed integer ID
    })
    .then((response) => {
      if (response.status === 202) {
        // Handle success (status code 202)
        onClose(); 
      } else if (response.status === 404) {
        // Handle case where the class was not found (status code 404)
        console.error("Class not found");
      } else {
        // Handle other errors
        console.error("Error deleting class");
      }
    })
    .catch((error) => {
      console.error("Error deleting class", error);
    });
  };
  

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box bg-neutral">
        {/* Image */}
        <div className="flex justify-center">
          <div className="avatar placeholder mb-8">
            <div className="w-24 h-24 rounded-full">
              <Image src={"/images/noimg.jpg"} alt={`Image for ${className}`} width={96} height={96} />
            </div>
          </div>
        </div>

        {/* Class Details */}
        <h3 className="text-lg font-bold text-center mb-4">Class Details</h3>

        {/* Form Fields */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input type="text" value={className} className="input input-bordered w-full" readOnly />

          <label className="label">
            <span className="label-text">Instructor Name</span>
          </label>
          <input type="text" value={instructorName} className="input input-bordered w-full" readOnly />

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Equipment</span>
            </label>
            <ul className="list-disc pl-8 bg-base-100 rounded-box">
              {equipments?.map((equipment, index) => (
                <li key={index} className="p-2">
                  {equipment.name} (Weight: {equipment.weight || "N/A"})
                </li>
              ))}
            </ul>
          </div>

          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea className="textarea textarea-bordered w-full" value={description} readOnly></textarea>
        </div>

        {/* Price, Quota, Status */}
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="form-control">
            <input type="number" value={price} className="input input-bordered" readOnly />
          </div>
          <div className="form-control">
            <input type="number" value={quota} className="input input-bordered" readOnly />
          </div>
          <div className="form-control">
            <input type="text" value={status} className="input input-bordered" readOnly />
          </div>
        </div>

        {/* Buttons */}
        <div className="modal-action justify-center border-t pt-4">
          <button className="btn btn-outline" onClick={onClose}>
            Go Back
          </button>
          {!isAdmin && isMember && isStatus && <button className="btn btn-primary text-white" onClick={handleEnroll}>Enroll</button>}
          {isAdmin && (
            <button className="btn btn-error text-white" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ClassDetailsModal;
