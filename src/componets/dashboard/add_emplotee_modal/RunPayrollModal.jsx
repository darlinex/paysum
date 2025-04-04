import { authInstance } from "../../axios/axiosinstance";
import { XIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Bulk.css';

function BulkUploadModal({ setIsOpen }) {
  async function uploadBulk(e) {
    e.preventDefault();
    const fileInput = e.target.querySelector("input[type=file]");
    const file = fileInput.files?.[0];
    
    if (!file) {
        toast.warning("Please choose a file.");
      return;
    }

    // Create FormData and append file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await authInstance.post("/employee/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      toast.success("Employees uploaded successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload employees.");
    }
  }

  return (
    <div className="h-screen w-screen backdrop-blur-sm fixed inset-0 grid place-content-center ">
      <XIcon className="absolute top-10 right-4 z-[40000000] cursor-pointer" color="black" size={30} onClick={() => setIsOpen(false)} />
      <form className=" form-bulk w-full md:w-[40%] bg-white flex flex-col gap-4 p-4 rounded-md shadow-md items-center justify-center mx-auto" onSubmit={uploadBulk}>
        <input type="file" accept=".csv" />
        <button type="submit" className= "addemp bg-[#00294A] text-white px-4 py-2 rounded-md text-center">
          Add Employees
        </button>
      </form>
    </div>
  );
}

export default BulkUploadModal;
