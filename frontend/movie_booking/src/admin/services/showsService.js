let shows = [
  {
    _id: "1",
    movie: { name: "Avengers: Endgame" },
    theatre: "PVR Cinemas",
    showTime: "10:00 AM",
    price: 250,
  },
  {
    _id: "2",
    movie: { name: "KGF Chapter 2" },
    theatre: "INOX",
    showTime: "1:30 PM",
    price: 220,
  },
];

export const getShows = () => {
  return Promise.resolve([...shows]);
};

export const getShowById = (id) => {
  return Promise.resolve(shows.find(s => s._id === id));
};

export const createShow = (data) => {
  const newShow = { ...data, _id: Date.now().toString() };
  shows.push(newShow);
  return Promise.resolve(newShow);
};

export const updateShow = (id, updatedData) => {
  shows = shows.map(s =>
    s._id === id ? { ...s, ...updatedData } : s
  );
  return Promise.resolve({ success: true });
};

export const deleteShow = (id) => {
  shows = shows.filter(s => s._id !== id);
  return Promise.resolve({ success: true });
};
