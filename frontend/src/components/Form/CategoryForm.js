import React from "react";

const CategoryForm = ({ inputValue, setInputValue, handleSubmit }) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="form-container">
      <h2>Submit Your Input</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          autoComplete="off"
          name="inputValue"
          onChange={handleInputChange}
          placeholder="Enter something..."
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
