import { getMovies } from "./movieService";
import { getShows } from "./showsService";
import { getTheatres } from "./theatreService";
import { getUsers } from "./userService";
import { getBookings } from "./bookingService";

export const getReportData = async () => {
  const movies = await getMovies();
  const shows = await getShows();
  const theatres = await getTheatres();
  const users = await getUsers();
  const bookings = await getBookings();

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.amount || 0),
    0
  );

  return {
    totalMovies: movies.length,
    totalShows: shows.length,
    totalTheatres: theatres.length,
    totalUsers: users.length,
    totalBookings: bookings.length,
    totalRevenue,
  };
};
