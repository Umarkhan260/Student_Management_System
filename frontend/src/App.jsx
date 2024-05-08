import React, { useState, useEffect } from "react";
import axios from "axios";

import { CgCloseO } from "react-icons/cg";

function App() {
  const [formData, setFormData] = useState({
    Name: "",
    RollNumber: "",
    Department: "",
    Mobile: "",
    Address: "",
  });
  const [editData, setEditData] = useState({
    Name: "",
    RollNumber: "",
    Department: "",
    Mobile: "",
    Address: "",
    _id:""
  });
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setData(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any of the form fields are empty
    if (!formData.Name || !formData.RollNumber || !formData.Department || !formData.Mobile || !formData.Address) {
        alert('Please fill in all fields');
        return;
    }
    try {
        const response = await axios.post(
            "http://localhost:8080/create",
            formData
        );
        console.log(response.data);
        // Reset the form after successful submission
        setFormData({
            Name: "",
            RollNumber: "",
            Department: "",
            Mobile: "",
            Address: "",
        });
        fetchData();
        alert('Data Add successfully');
        setShowForm(false);
    } catch (error) {
        console.error("Error occurred:", error);
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleEditForm = async (e) => {
    e.preventDefault();
    
      const data = await axios.put(
        "http://localhost:8080/update",
        editData)
      
     if (data.data.success) {
      fetchData()
      alert(data.data.message)
      setShowEditForm(false)
     }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEdit =  (item) => {
    setShowEditForm(true)
    setEditData(item)
  };
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${_id}`);
      fetchData(); // Refresh data after delete
      alert('Data Delete successfully');
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className="main w-full h-[100vh]   relative p-10 ">
      <button
          onClick={() => setShowForm(true)}
          className=" animate-bounce bg-blue-500 hover:text-black  duration-200 transition-all hover:bg-blue-300 self-center  text-white px-2 py-1 cursor-pointer rounded-md ml-10 mb-5"
        >
          Add Details
        </button>
          {showForm && (
                 
            <form
              onSubmit={handleSubmit}
              className=" absolute left-[30%] top-[20%] pt-10 space-y-3 rounded-2xl px-5 py-6 w-[450px] border-[.5px] bg-transparent shadow-xl backdrop-blur-md  "
            >
              <div className="closebtn right-5 top-3 absolute  w-[40px] h-[40px] rounded-full self-end flex items-center justify-center"
                      onClick={() => setShowForm(false)}>
      
                <CgCloseO className="text-3xl text-red-700 cursor-pointer" />
              </div>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Name"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="RollNumber"
                value={formData.RollNumber}
                onChange={handleChange}
                placeholder="Roll Number"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                placeholder="Department"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                placeholder="Mobile"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="Address"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
              >
                Submit
              </button>
            </form>

          )}
          {showEditForm && (
                 
            <form
              onSubmit={handleEditForm}
              className=" absolute left-[30%] top-[20%] pt-10 space-y-3 rounded-2xl px-5 py-6 w-[450px] border-[.5px] bg-transparent shadow-xl backdrop-blur-md"
            >
              <div className="closebtn right-5 top-3 absolute  w-[40px] h-[40px] rounded-full self-end flex items-center justify-center"
                      onClick={() =>  setShowEditForm(false)}>
      
                <CgCloseO className="text-3xl text-red-700 cursor-pointer" />
              </div>
              <input
                type="text"
                name="Name"
                value={editData.Name}
                onChange={handleEditChange}
                placeholder="Name"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none "
              />
              <input
                type="text"
                name="RollNumber"
                value={editData.RollNumber}
                onChange={handleEditChange}
                placeholder="Roll Number"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="Department"
                value={editData.Department}
                onChange={handleEditChange}
                placeholder="Department"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="Mobile"
                value={editData.Mobile}
                onChange={handleEditChange}
                placeholder="Mobile"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <input
                type="text"
                name="Address"
                value={editData.Address}
                onChange={handleEditChange}
                placeholder="Address"
                className="block w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
              >
                Edit
              </button>
            </form>

          )}

        <div className="dataContainer shadow-2xl shadow-grey-400 rounded-xl  pt-4 h-auto py-5 w-[100%] flex flex-col px-20   ">
        <h1 className=" text-2xl font-bold self-center ">Students Details</h1>
          {Array.isArray(data) && data.length > 0 ? (
            <table className="w-full mt-3 rounded-xl  ">
              <thead>
                <tr className=" bg-yellow-100 ">
                  <th className="border-[.5px] border-gray-800 px-3 py-1">
                    Name
                  </th>
                  <th className="border-[.5px] border-gray-800 px-3 py-1">
                    Roll Number
                  </th>
                  <th className="border-[.5px] border-gray-800 px-3 py-1">
                    Department
                  </th>
                  <th className="border-[.5px] border-gray-800 px-3 py-1">
                    Mobile
                  </th>
                  <th className="border-[.5px] border-gray-800 px-3 py-1">
                    Address
                  </th>
                  <th className="border-[.5px] border-gray-800 px-3 py-1">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className=" ">
                    <td className="border-[.5px] border-gray-800 px-2 py-[.5px] font-medium text-lg">
                      {item.Name}
                    </td>
                    <td className="border-[.5px] border-gray-800 px-2 py-[.5px] font-medium text-lg">
                      {item.RollNumber}
                    </td>
                    <td className="border-[.5px] border-gray-800 px-2 py-[.5px] font-medium text-lg">
                      {item.Department}
                    </td>
                    <td className="border-[.5px] border-gray-800 px-2 py-[.5px] font-medium text-lg">
                      {item.Mobile}
                    </td>
                    <td className="border-[.5px] border-gray-800 px-2 py-[.5px] font-medium text-lg">
                      {item.Address}
                    </td>
                    <td className="border-[.5px] border-gray-800  ">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-2 py-[.5px] rounded-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-green-500 ml-2  text-white px-2 py-[.5px] rounded-md"
                      >
                        Edit
                      </button>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
