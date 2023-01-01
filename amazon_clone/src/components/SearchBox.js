import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox(props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setName(e.target.value === "all");
    }
    navigate(`/search/name/${name !== "" ? name : "all"}`);
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row top">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className=" fa fa-search "></i>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
