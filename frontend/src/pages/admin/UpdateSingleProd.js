import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateSingleProd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("");
  const [name, setName] = useState();
  const [catid, setCatId] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [photo, setPhoto] = useState();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${id}`);
      console.log(data);
      if (data?.success) {
        setName(data?.product?.name);
        setPrice(data?.product?.price);
        setQuantity(data?.product?.quantity);
        setStatus(data?.product?.name);
        setCatId(data?.product?._id);
        setDescription(data?.product?.description);
        setStatus(data?.product?.status);
        console.log(data?.product);
      }
    } catch (error) {
      console.log(error);
      alert("error");
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
    getProduct();
    getAllCategories();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/change-product/${catid}`,
        productData
      );
      if (data?.success) {
        alert(data?.message);
      } else {
        alert("Product updated Successfully");
        setName("");
        setDescription("");
        setQuantity("");
        setPrice("");
        setPhoto("");
        setStatus("");
        setCategory("");
        navigate("/panel/admin/products");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      await axios.delete(`/api/v1/product/delete-product/${catid}`);
      alert("Product Deleted Succfully");
      navigate("/panel/admin/products");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <Layout title={"Add new product page"}>
      <div className="container-fluid m-3 p-4 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="m-2 pb-2">Update Product</h3>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/get-product-photo/${catid}`}
                      alt={name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  name="name"
                  autoComplete="off"
                  placeholder="write a name"
                  className="form-control shadow-none "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  name="description"
                  autoComplete="off"
                  placeholder="write a description"
                  className="form-control shadow-none "
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  autoComplete="off"
                  placeholder="write a Price"
                  name="price"
                  className="form-control shadow-none "
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  name="quantity"
                  autoComplete="off"
                  className="form-control shadow-none"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  name="shipping"
                  showSearch
                  className="form-select shadow-none  mb-3"
                  onChange={(value) => {
                    setStatus(value);
                  }}
                  value={status ? "yes" : "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-outline-secondary my-2 col-md-12 "
                  onClick={handleClick}
                >
                  UPDATE PRODUCT
                </button>
                <button
                  className="btn btn-outline-secondary my-2 col-md-12 "
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UpdateSingleProd;
