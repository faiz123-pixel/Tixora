let theatres = [
  { _id: "1", name: "PVR Cinemas", city: "Hyderabad" },
  { _id: "2", name: "INOX", city: "Mumbai" },
];

export const getTheatres = () => Promise.resolve([...theatres]);

export const createTheatre = (data) => {
  const newTheatre = { ...data, _id: Date.now().toString() };
  theatres.push(newTheatre);
  return Promise.resolve(newTheatre);
};

export const updateTheatre = (id, updatedData) => {
  theatres = theatres.map((t) =>
    t._id === id ? { ...t, ...updatedData } : t
  );
  return Promise.resolve({ success: true });
};

export const deleteTheatre = (id) => {
  theatres = theatres.filter((t) => t._id !== id);
  return Promise.resolve({ success: true });
};
