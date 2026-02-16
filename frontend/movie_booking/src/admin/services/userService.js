let users = [
  {
    _id: "1",
    name: "Faiz",
    email: "faiz@gmail.com",
    role: "USER",
  },
  {
    _id: "2",
    name: "Admin",
    email: "admin@gmail.com",
    role: "SUPER_ADMIN",
  },
];

export const getUsers = () => Promise.resolve([...users]);

export const createSuperUser = (data) => {
  const newUser = {
    _id: Date.now().toString(),
    ...data,
    role: "ADMIN",
  };
  users.push(newUser);
  return Promise.resolve(newUser);
};

export const deleteUser = (id) => {
  users = users.filter((u) => u._id !== id);
  return Promise.resolve({ success: true });
};
