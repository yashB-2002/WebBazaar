import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const AddCategory = () => {
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState();
  const [newVal, setNewVal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selcategory, setNewSel] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/add-category", {
        name: inputValue,
      });
      if (data.success) {
        // setCategories([...categories, data.category]);
        alert("new category added successfully.");
        getAllCategories();
      }
      setInputValue("");
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  const updateDetails = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/change-category/${selcategory._id}`,
        {
          name: newVal,
        }
      );
      if (data.success) {
        alert("category details updated successfully.");
        setNewVal("");
        setNewSel(null);
        handleCancel();
        getAllCategories();
      }
      setInputValue("");
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${selcategory._id}`
      );
      if (data.success) {
        alert("category deleted successfully.");
        setNewSel(null);
        getAllCategories();
      }
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Add new category of products"}>
      <div className="container-fluid m-3 p-4 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center mt-4 ">Manage Your Categories</h3>
            <div className="p-3">
              <CategoryForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="w-75 mt-2 mx-auto">
              <table className="table  ">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((c) => {
                      return (
                        <tr key={c._id}>
                          <td className="text-center">{c.name}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => {
                                showModal();
                                setNewVal(c.name);
                                setNewSel(c);
                              }}
                              className="btn btn-info ms-2 "
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewSel(c);
                                handleDelete();
                              }}
                              className="btn btn-danger ms-2 my-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Modal
              title="Change Category Details"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <CategoryForm
                inputValue={newVal}
                setInputValue={setNewVal}
                handleSubmit={updateDetails}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
