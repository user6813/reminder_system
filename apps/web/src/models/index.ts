import User from './user'
import Reminder from './reminder'

// Set up associations
User.hasMany(Reminder, { foreignKey: 'userId', as: 'reminders' })
Reminder.belongsTo(User, { foreignKey: 'userId', as: 'user' })

export { User, Reminder }
