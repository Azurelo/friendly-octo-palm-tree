const User = require('./User');
const Pet = require('./Pet');
const Appointment = require('./Appointment');

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Appointment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Appointment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Pet, Appointment };
