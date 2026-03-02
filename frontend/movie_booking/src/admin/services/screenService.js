let screens = [
  {
    _id: "1",
    name: "Screen 1",
    theatre: { name: "PVR Phoenix Mall" },
    totalSeats: 120,
  },
  {
    _id: "2",
    name: "IMAX",
    theatre: { name: "Cinepolis Andheri" },
    totalSeats: 220,
  },
];

export const getScreens = async () => {
  return screens;
};

export const createScreen = async (screen) => {
  const newScreen = {
    _id: Date.now().toString(),
    ...screen,
    theatre: { name: screen.theatre },
  };
  screens.push(newScreen);
  return newScreen;
};

export const updateScreen = async (id, updatedData) => {
  screens = screens.map((screen) =>
    screen._id === id
      ? { ...screen, ...updatedData, theatre: { name: updatedData.theatre } }
      : screen
  );
};

export const deleteScreen = async (id) => {
  screens = screens.filter((screen) => screen._id !== id);
};