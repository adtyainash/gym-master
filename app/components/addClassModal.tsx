import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/router';

interface Instructor {
  id: number;
  name: string;
}
interface Equipment {
  name: string;
  weight: string; // Use string if the input returns string type
}

interface FormData {
  className: string;
  instructorName: string;
  instructorId: string
  price: string;
  status: string;
  quota: string;
  equipments: Equipment[];
  description: string;
  image: string;
}

interface AddClassModalProps {
  onClose: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AddClassModal: React.FC<AddClassModalProps> = ({ onClose, formData, setFormData }) => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    fetch("/api/instructors")
      .then((response) => response.json())
      .then((data: Instructor[]) => setInstructors(data))
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("equipmentName") || name.startsWith("equipmentWeight")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedEquipments = formData.equipments.map((equipment, eqIndex) =>
        index === eqIndex
          ? {
              ...equipment,
              [name.includes("equipmentName") ? "name" : "weight"]: value,
            }
          : equipment
      );
      setFormData({ ...formData, equipments: updatedEquipments });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddEquipment = () => {
    setFormData({
      ...formData,
      equipments: [...formData.equipments, { name: "", weight: "" }],
    });
  };

  const handleRemoveEquipment = (index: number) => {
    const newEquipments = formData.equipments.filter((_, eqIndex) => eqIndex !== index);
    setFormData({ ...formData, equipments: newEquipments });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Find the selected instructor's name
    const selectedInstructor = instructors.find((instructor) => instructor.id === parseInt(formData.instructorId, 10));
    const instructorName = selectedInstructor ? selectedInstructor.name : "";

    // Prepare the payload
    const payload = {
      className: formData.className,
      status: formData.status,
      description: formData.description,
      image: formData.image,
      price: parseInt(formData.price, 10),
      quota: parseInt(formData.quota, 10),
      instructorId: parseInt(formData.instructorId, 10),
      instructorName: instructorName,
      equipments: formData.equipments.map((equip) => ({
        name: equip.name,
        weight: equip.weight ? parseInt(equip.weight, 10) : null,
      })),
    };

    try {
      const response = await fetch("/api/classes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to add class. Status: ${response.status}`);
      }

      setMessage("Class added successfully.");
      onClose();
      const router = useRouter();
      router.reload();
    } catch (error) {
      console.error("Error adding class:", error);
      setMessage("Failed to add class. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box bg-neutral">
        <h3 className="text-lg font-bold text-center mb-4">Add Class</h3>
        {message && <div className="text-center text-red-500">{message}</div>}
        <form onSubmit={handleSubmit}>
          {/* Add input fields for class details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input type="text" name="className" value={formData.className} onChange={handleChange} className="input input-bordered w-full" required />
            {/* Add input fields for other class details */}
            <label className="label">
              <span className="label-text">Instructor</span>
            </label>
            <select name="instructorId" value={formData.instructorId} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Select Instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" required />
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select name="status" value={formData.status} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
              <span className="label-text">Quota</span>
            <input type="number" name="quota" value={formData.quota} onChange={handleChange} className="input input-bordered w-full" required />
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="input input-bordered w-full" />
            <label className="label">
              <span className="label-text">Equipments</span>
            </label>
            {formData.equipments.map((equipment, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <input type="text" name={`equipmentName-${index}`} value={equipment.name} onChange={handleChange} className="input input-bordered w-full col-span-1" placeholder="Equipment Name" />
                <input type="number" name={`equipmentWeight-${index}`} value={equipment.weight} onChange={handleChange} className="input input-bordered w-full col-span-1" placeholder="Weight (optional)" />
                <button type="button" onClick={() => handleRemoveEquipment(index)} className="btn btn-error btn-xs col-span-2 mt-2">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddEquipment} className="btn btn-primary btn-xs mb-4">
              Add Equipment
            </button>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" rows={4}></textarea>
            <div className="modal-action justify-center border-t pt-4">
              <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary text-white" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Class"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddClassModal;
