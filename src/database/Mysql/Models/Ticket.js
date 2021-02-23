const { DataTypes, Model } = require('sequelize');

module.exports = class Ticket extends Model {
    static init(sequelize) {
        return super.init({
            ticketId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            guildId: {
                type: DataTypes.STRING
            },
            channelId: {
                type: DataTypes.STRING
            },
            resolved: {
                type: DataTypes.BOOLEAN
            },
            closedMessageId: {
                type: DataTypes.STRING
            },
            authorId: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'Tickets',
            sequelize
        })
    }
}