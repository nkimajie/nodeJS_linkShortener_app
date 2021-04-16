const Sequelize = require('sequelize');
const shortId = require('shortid');

const sequelize = require('../util/database');

const Shorturls = sequelize.define('shorturls', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    full: {
        type: Sequelize.STRING,
        allowNull: false
    },
    short: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: shortId.generate
    },
    clicks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Shorturls;