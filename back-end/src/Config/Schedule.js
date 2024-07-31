import cron from 'node-cron';
import { sendNotifications } from '../Controllers/EventController.js';

cron.schedule('0 * * * *', async () => {
    try {
        await sendNotifications();
        console.log('Event notification check executed successfully');
    } catch (error) {
        console.error('Error executing event notification check', error);
    }
});
