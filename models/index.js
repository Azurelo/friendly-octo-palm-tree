const User = require('./user');
const Pet = require('./pet');
const Appointment = require('./appointment');

User.hasMany(pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

pet.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Appointment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Appointment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, pet, Appointment };
