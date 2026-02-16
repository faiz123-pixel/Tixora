let movies = [
  {
    _id: "1",
    name: "Avengers: Endgame",
    language: "English",
  },
  {
    _id: "2",
    name: "KGF Chapter 2",
    language: "Kannada",
  },
  {
    _id: "3",
    name: "Jawan",
    language: "Hindi",
  },
];

/* Get all movies */
export const getMovies = () => {
  return Promise.resolve([...movies]);
};

/* Get movie by ID */
export const getMovieById = (id) => {
  const movie = movies.find((m) => m._id === id);
  return Promise.resolve({ ...movie });
};

/* Create movie */
export const createMovie = (newMovie) => {
  const movie = {
    _id: Date.now().toString(),
    ...newMovie,
    createdAt: new Date().toISOString(),
  };

  movies.push(movie);

  return Promise.resolve(movie);
};

/* Update movie */
export const updateMovie = (id, updatedData) => {
  movies = movies.map((m) =>
    m._id === id ? { ...m, ...updatedData } : m
  );
  return Promise.resolve({ success: true });
};

/* Delete movie */
export const deleteMovie = (id) => {
  movies = movies.filter((m) => m._id !== id);
  return Promise.resolve({ success: true });
};
