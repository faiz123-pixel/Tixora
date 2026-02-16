let theatres = [
  {
    _id: "1",
    name: "PVR Cinemas",
    city: "Delhi",
  },
  {
    _id: "2",
    name: "INOX",
    city: "Mumbai",
  },
];

/* Get all theatres */
export const getTheatres = () => {
  return Promise.resolve([...theatres]);
};

/* Get theatre by ID */
export const getTheatreById = (id) => {
  const theatre = theatres.find((t) => t._id === id);
  return Promise.resolve({ ...theatre });
};

/* Create theatre */
export const createTheatre = (theatreData) => {
  theatres.push({
    _id: Date.now().toString(),
    ...theatreData,
  });
  return Promise.resolve({ success: true });
};

/* Update theatre */
export const updateTheatre = (id, updatedData) => {
  theatres = theatres.map((t) =>
    t._id === id ? { ...t, ...updatedData } : t
  );
  return Promise.resolve({ success: true });
};

/* Delete theatre */
export const deleteTheatre = (id) => {
  theatres = theatres.filter((t) => t._id !== id);
  return Promise.resolve({ success: true });
};
