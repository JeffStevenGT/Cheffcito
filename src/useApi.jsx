import { useEffect, useState } from "react";
import axios from "axios";

export default function useApi(url, dataPath = "data") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(url)
      .then((res) => {
        const dataValue = dataPath
          .split(".")
          .reduce((obj, key) => obj && obj[key], res.data);
        setData(dataValue || []);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar los datos");
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [url, dataPath]);

  return { data, loading, error };
}
