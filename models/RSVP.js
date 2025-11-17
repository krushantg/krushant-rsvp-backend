const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RSVP = sequelize.define('RSVP', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  numberOfGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    },
    field: 'number_of_guests'
  },
  rsvpStatus: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['Yes', 'No']]
    },
    field: 'rsvp_status'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: 'rsvps',
  timestamps: false
});

module.exports = RSVP;