// app/classes/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ClassCard from "../components/classCard";
import TableHeader from "../components/tableHeader";
import SearchBar from "../components/searchBar";
import AddClassModal from "../components/addClassModal";

interface Equipment {
  name: string;
  weight?: number;
}

interface GymClass {
  id: number;
  className: string;
  instructorName: string;
  instructorId: number;
  price: string;
  status: string;
  quota: string;
  equipments: Equipment[];
  description: string;
  image: string;
}

const ClassesPage = () => {
  const { data: session, status } = useSession();
  const [classesData, setClassesData] = useState<GymClass[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newClassData, setNewClassData] = useState({
    className: "",
    instructorName: "",
    price: 0,
    status: "",
    quota: 0,
    equipments: [],
    description: "",
    image: "",
  });
  useEffect(() => {
    if (session && session.user.role === "Admin") {
      setIsAdmin(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/classes/");
        if (!response.ok) {
          throw new Error(`Failed to fetch classes. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setClassesData(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, [session]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto mt-8 p-10">
      <div className="grid grid-cols-2 gap-8">
        <h1 className="text-5xl font-bold text-neutral-content">Gym Classes</h1>
        <SearchBar />
      </div>
      <TableHeader />
      <div className="grid gap-10 mt-4">
        {classesData.map((classInfo) => (
          <ClassCard key={classInfo.id} {...classInfo} />
        ))}
      </div>
      {isAdmin && (
      <div className="flex mt-8 justify-end">
        <button onClick={toggleModal} className="btn btn-primary text-white w-full">
          Add Class
        </button>
      </div>
      )}
      {isModalOpen && <AddClassModal formData={newClassData} onClose={toggleModal} setFormData={setNewClassData} />}
    </div>
  );
};

export default ClassesPage;
