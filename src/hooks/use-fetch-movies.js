import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../utils/base";

const useFetchMovies = (page, start_date, end_date) => {
  const isInitialRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (page) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${baseUrl}?primary_release_date.gte=${start_date}&page=${page}&primary_release_date.lte=${end_date}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            "Content-Type": "application/json", // You can set other headers as needed
          },
        }
      );
      if (!res) {
        throw new Error("Something went wrong");
      }
      const response = await res.json();

      setData((prev) => [...prev, ...response?.results]);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    fetchData(page);
  }, [page]);

  return { data, loading, error };
};

export default useFetchMovies;
