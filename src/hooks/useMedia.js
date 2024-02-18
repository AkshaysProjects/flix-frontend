import { useState, useEffect } from "react";
import axios from "axios";

const useMedia = (id) => {
  const [media, setMedia] = useState(null);
  const [casts, setCasts] = useState([]);
  const [urls, setUrls] = useState({});
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const movieResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/${id}`
        );
        setType("Movie");
        setMedia(movieResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          try {
            const tvShowResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/tvshows/${id}`
            );
            setType("TVShow");
            setMedia(tvShowResponse.data);
          } catch (innerErr) {
            if (innerErr.response && innerErr.response.status === 404) {
              setError("Media not found");
            } else {
              setError("An unexpected error occurred");
              console.error("Error fetching TV show:", innerErr);
            }
          }
        } else {
          setError("An unexpected error occurred");
          console.error("Error fetching movie:", err);
        }
      }
    };

    if (id) {
      fetchMedia();
    }
  }, [id]);

  useEffect(() => {
    const fetchCastsAndUrls = async () => {
      if (!type) return;

      try {
        const [castsResponse, urlsResponse] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_API_URL}/${type.toLowerCase()}s/${id}/cast`
          ),
          axios.get(
            `${process.env.REACT_APP_API_URL}/${type.toLowerCase()}s/${id}/urls`
          ),
        ]);
        setCasts(castsResponse.data.cast);
        setUrls(urlsResponse.data);
      } catch (err) {
        setError(`Error fetching additional data: ${err.message}`);
        console.error("Error fetching casts/URLs:", err);
      }
    };

    fetchCastsAndUrls();
  }, [type, id]);

  if (error) {
    return { media: null, casts: [], urls: {}, type: null, error };
  }

  return { media, casts, urls, type };
};

export default useMedia;
