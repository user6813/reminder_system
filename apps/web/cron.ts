import cron from 'node-cron';
import Reminder from './models/reminder';
import User from './models/user';
import { sendReminderMail } from './utils/mail';
import { Op } from 'sequelize';

// Cron job: runs every 2 minutes
cron.schedule('*/2 * * * *', async () => {
  const now = new Date();
  const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

  // Fetch reminders due in the next 10 minutes and not reminded
  const reminders = await Reminder.findAll({
    where: {
      dateTime: {
        [Op.between]: [now, tenMinutesLater],
      },
      reminded: false,
    },
  });

  for (const reminder of reminders) {
    // Find the user for this reminder
    const user = await User.findByPk(reminder.userId);
    if (user && user.email) {
      try {
        await sendReminderMail(
          user.email,
          `Reminder: ${reminder.title}`,
          `<p>${reminder.description}</p><p>Date & Time: ${reminder.dateTime}</p>`
        );
        // Update reminded to true
        reminder.reminded = true;
        await reminder.save();
      } catch (err) {
        console.error(`Failed to send reminder to ${user.email}:`, err);
      }
    }
  }
});

console.log('Reminder cron job started.'); 