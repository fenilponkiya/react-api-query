import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import React, { useEffect, useState } from "react";

const Pagination = ({ pageLength, skipItem, setSkipItem }) => {
  const prodcutPerPage = Math.ceil(pageLength / 10);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setCurrentIndex(Math.floor(skipItem / 10) + 1);
  }, [skipItem]);

  const goTopage = (i) => {
    setSkipItem((i - 1) * 10);
  };

  // Helper function to create pagination with dots
  const createPagination = () => {
    const pages = [];
    const pageRange = 2; // Number of pages to show around the current page

    // Always show the first page
    if (currentIndex > 0) {
      pages.push(1);
    }

    if (currentIndex - pageRange > 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentIndex - pageRange);
      i <= Math.min(prodcutPerPage - 1, currentIndex + pageRange);
      i++
    ) {
      pages.push(i);
    }

    if (currentIndex + pageRange < prodcutPerPage - 1) {
      pages.push("...");
    }

    if (currentIndex <= prodcutPerPage) {
      pages.push(prodcutPerPage);
    }

    return pages;
  };

  return (
    <ul
      style={{
        display: "flex",
        listStyle: "none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ArrowBackIosOutlinedIcon
        sx={{
          pointerEvents: currentIndex === 1 ? "none" : "auto",
          cursor: currentIndex === 1 ? "not-allowed" : "pointer",
          color: currentIndex === 1 ? "gray" : "black",
        }}
        onClick={() => goTopage(currentIndex - 1)}
      />
      {createPagination().map((page, index) => (
        <li
          key={index}
          onClick={() => typeof page === "number" && goTopage(page)} // Handle click only for page numbers
          style={{
            cursor: typeof page === "number" ? "pointer" : "default",
            border:
              page === currentIndex ? "2px solid black" : "1px solid gray",
            borderRadius: "50%",
            padding: "10px 15px",
            margin: "0 5px",
            fontWeight: page === currentIndex ? "bold" : "normal",
          }}
        >
          {page}
        </li>
      ))}
      <ArrowForwardIosOutlinedIcon
        sx={{
          pointerEvents: currentIndex === prodcutPerPage ? "none" : "auto",
          cursor: currentIndex === prodcutPerPage ? "not-allowed" : "pointer",
          color: currentIndex === prodcutPerPage ? "gray" : "black",
        }}
        onClick={() => goTopage(currentIndex + 1)}
      />
    </ul>
  );
};

export default Pagination;
