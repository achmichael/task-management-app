import EventRepository from "../Repositories/EventRepository.js";
import { ResponseError } from "../Config/Error.js";
import sendMail from "../Utils/SendMail.js";
class EventNotification {
  
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async execute(req) {
    try {
      const userId = req.user.data.user_id;

      const events = await this.eventRepository.getAllEvents(userId); // Tunggu events

      const now = new Date();

      const email = req.user.data.email;

      events.forEach((event) => {
        const eventDeadline = new Date(event.endDate);

        // Jika event deadline mendekati, kirim notifikasi
        if (eventDeadline > now && eventDeadline - now <= 24 * 60 * 60 * 1000) {
          // 24 jam sebelum deadline
          sendMail(
            email,
            event.title + " Akan Segera tiba, Semangat yaaa😍😍😍",
            "Acara yang anda rencanakan akan segera datang, awas jangan sampai terlewatkan, stay tune teruss yaaa..."
          ); // Pastikan fungsi ini mengirim email sesuai kebutuhan Anda
        }

        // Jika event sudah tiba, kirim notifikasi
        if (eventDeadline <= now) {
          sendMail(
            email,
            event.title + " Telah Tiba",
            "Semangat menjalani acara yaa, semangat terusss wkwkww"
          ); 
        }
      });
    } catch (error) {
      throw new ResponseError(500, "An error occurred while processing events");
    }
  }
}

export default EventNotification;
