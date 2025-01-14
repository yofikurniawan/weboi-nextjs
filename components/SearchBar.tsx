import React, { useState, useEffect } from "react";

interface SearchBarProps {
  initialSearch?: string;
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialSearch = "",
  onSearch,
  onReset,
}) => {
  const [tempSearchTerm, setTempSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setTempSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(tempSearchTerm);
  };

  const handleReset = () => {
    setTempSearchTerm("");
    onReset();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="input-group" style={{ marginBottom: "20px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Silahkan cari..."
        value={tempSearchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          borderRadius: "30px 0 0 30px",
          border: "1px solid #ced4da",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "10px 20px",
        }}
      />
      <button
        className="btn btn-primary"
        onClick={handleSearchClick}
        style={{
          borderRadius: "0",
          border: "1px solid #007bff",
          backgroundColor: "#007bff",
          padding: "10px 20px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Cari
      </button>
      <button
        className="btn btn-secondary"
        onClick={handleReset}
        style={{
          borderRadius: "0 30px 30px 0",
          border: "1px solid #6c757d",
          backgroundColor: "#6c757d",
          padding: "10px 20px",
          fontWeight: "bold",
          marginLeft: "5px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#5a6268")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")}
      >
        Reset
      </button>
    </div>
  );
};

export default SearchBar;