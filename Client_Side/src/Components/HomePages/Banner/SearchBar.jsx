import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
const SearchBar = () => {

  return (
    <div>
      <h2 className="text-gray-900 font-bold mb-4 text-center">
        Search your college name ?{" "}
      </h2>
      <div className="flex items-center gap-4 w-96  mx-auto rounded-full ">
        <input
          type="text"
          placeholder="Search..."
          // value={searchuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-gray-900 rounded-full focus:outline-none shadow-slate-400"
        />
        <button
          // onClick={handleSearch}
          className="flex  items-center justify-center w-20 h-10 text-white bg-[#F50963] rounded-md   "
        >
          
          <IoSearch size={22}/>
        </button>
      </div>

  

    </div>
  );
};

export default SearchBar;