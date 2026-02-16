/* =========================
   DUMMY SHOWS DATA
========================= */

let dummyShows = [
  {
    _id: "1",
    movie: { name: "Avengers: Final War" },
    theatre: { name: "PVR Cinemas" },
    date: "2026-02-20",
    time: "10:00 AM",
    price: 150,
  },
  {
    _id: "2",
    movie: { name: "Pathaan 2" },
    theatre: { name: "INOX" },
    date: "2026-02-21",
    time: "2:30 PM",
    price: 180,
  },
  {
    _id: "3",
    movie: { name: "KGF Chapter 3" },
    theatre: { name: "Cinepolis" },
    date: "2026-02-22",
    time: "6:00 PM",
    price: 200,
  },
];

/* =========================
   GET ALL SHOWS
========================= */
export const getShows = async () => {
  return dummyShows;
};

/* =========================
   GET SHOW BY ID
========================= */
export const getShowById = async (id) => {
  return dummyShows.find((show) => show._id === id);
};

/* =========================
   CREATE SHOW
========================= */
export const createShow = async (showData) => {
  const newShow = {
    _id: Date.now().toString(),
    ...showData,
  };

  dummyShows.push(newShow);
  return newShow;
};

/* =========================
   UPDATE SHOW
========================= */
export const updateShow = async (id, updatedData) => {
  dummyShows = dummyShows.map((show) =>
    show._id === id ? { ...show, ...updatedData } : show
  );

  return dummyShows.find((show) => show._id === id);
};

/* =========================
   DELETE SHOW
========================= */
export const deleteShow = async (id) => {
  dummyShows = dummyShows.filter((show) => show._id !== id);
  return { message: "Show deleted successfully" };
};
