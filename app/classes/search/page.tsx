'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ClassCard from "../../components/classCard";
import AddClassModal from '../../components/addClassModal';
import SearchBar from '../../components/searchBar';
import TableHeader from '../../components/tableHeader';

interface Equipment {
    name: string;
    weight?: number;
  }
  
  interface GymClass {
    classID: number;
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
  

const SearchPage = () => {
    const { data: session } = useSession();
    const [classesData, setClassesData] = useState<GymClass[]>([]);
    const search = useSearchParams();
    const searchQuery = search ? search.get("q") : null;
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
        if (searchQuery) {
            fetch(`/api/classes/search?${new URLSearchParams({ q: searchQuery }).toString()}`)
                .then(response => response.json())
                .then(data => setClassesData(data))
                .catch(error => console.error('Error fetching search results:', error));
        }
    }, [searchQuery]);

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
            {classesData.map((classInfo, index) => (
                <ClassCard key={index} {...classInfo} />
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

export default SearchPage;