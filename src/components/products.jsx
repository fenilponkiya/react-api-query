import { Box, Button, Grid2, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { fetchData } from "../fetchProduct";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Pagination from "./pagination";
export const Products = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skipItem, setSkipItem] = useState(0);
  const [inputQuery, setInputQuery] = useState("");
  const [SearchQuery, setSearchQuery] = useState("");
  const [pageLength, setPageLength] = useState();
  const [sortbyData, setSortbyData] = useState("asc");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const params = {
          q: SearchQuery,
          limit: 10,
          skip: skipItem,
          sortBy: "title",
          order: sortbyData,
        };

        const data = await fetchData(
          `https://dummyjson.com/products/search`,
          params
        );
        setPageLength(data?.total);
        setProductData(data?.products);
        console.log("reredner");
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchAllData();
  }, [skipItem, SearchQuery, sortbyData]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error?.message}</h1>;
  }
  const searchQueryDataFunc = (e) => {
    e.preventDefault();
    setInputQuery(e.target.value);
  };
  const onSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputQuery);
    setSkipItem(0);
  };
  return (
    <>
      <form onSubmit={onSearch}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            value={inputQuery}
            sx={{ mr: 2 }}
            type="text"
            onChange={searchQueryDataFunc}
            placeholder="Write to search..."
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
          <SwapVertIcon
            onClick={() => setSortbyData(sortbyData === "asc" ? "desc" : "asc")}
          />
        </Box>
      </form>
      <Grid2 container spacing={3}>
        {productData?.map((data, index) => {
          return (
            <Grid2 size={{ xs: 12, md: 3 }} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 300, objectFit: "contain" }}
                  image={data?.thumbnail}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data?.description}
                  </Typography>
                  <Typography variant="subtitle1">
                    Price:-{data?.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
      <Pagination
        pageLength={pageLength}
        skipItem={skipItem}
        setSkipItem={setSkipItem}
      />
    </>
  );
};
