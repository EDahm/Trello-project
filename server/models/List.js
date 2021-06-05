const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String,
        default: '진행중',
        maxlength: 30
    },
    description: {
        type: String,
    }
}, { timestamps: true })




const List = mongoose.model('List', listSchema)

module.exports = { List }     //위에 User를 다른 곳에서도 쓸 수 있도록 exports