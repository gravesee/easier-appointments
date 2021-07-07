import { Appointment, User } from "../db/models";
import { DateTime } from "luxon";

const checkAvailability = async (provider: User, date: DateTime) => {
  date.toISODate();
}

// const createAppointment = async (
//   start_time: Date,
//   provider: User,
//   patient: User): Appointment => {
//   // check availability for the users

//   // const availability = await Promise.all([provider.getAvailability(), patient.getAvailability()])


// }