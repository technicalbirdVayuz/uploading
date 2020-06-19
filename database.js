var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Connection URL
// const uristring = 'mongodb://localhost:27017/cracker_db';mongodb://<dbuser>:<dbpassword>@.mlab.com:61415/socket_ce5
const uristring = 'mongodb://password1:password1@ds349628.mlab.com:49628/ce5';
// const uristring = 'mongodb://localhost/ce5-meteor';
var mongoOptions = { };mongodb:
 
mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) { 
        console.log('Error when connecting to: ' + uristring + '. ' + err);
    } 
    else {
        console.log('Successfully connected to: ' + uristring);
    }
});
const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

var UserInfo = new mongoose.Schema({
            _id:{type: mongoose.Schema.Types.ObjectId},
            user_id:{ type: String },
            name:{ type: String },
            email:{ type: String },
            phone:{ type: Number },
            password:{ type: String }, // user_password
            profile_pic:{ type: String }, // user_password
            last_chatroom_id:{type: String},
            is_active:{ type: Boolean },
            email_status:{ type: Boolean },
            user_token:{ type: String },
            point: {
                type: pointSchema,
                required: true
            },
            online_status: {type : Boolean},
            is_notification_active: {type : Boolean},
            created_at:{type: Date},
}, { collection : 'user' });
var UserInfo = mongoose.model('user', UserInfo);


var Chatroom = new Schema({
 "chatroom_id":String,
 "chat_room_log_id":String,
 "user_id": String,
 "other_user_id": String,
 "is_active":Boolean,
 "is_blocked":Boolean,
 "created_at":Date,
 "updated_at":Date,
"last_message":String
},{collection: 'chatRoom'});

var Chatroom = mongoose.model('chatRoom', Chatroom);

var ChatroomLogs = new Schema({
    "chat_room_log_id": { type: String},
    "user_id": { type: String},
    "chat_room_id": { type: String},
    "is_active": {type: Boolean},
    "is_active": {type: Boolean},
    "is_creator": {type: String},
    "created_at":{type: Date},
    "updated_at":{type: Date},
    "unread_messages":{type: Number},
},{collection: 'chatRoomLog'});

var ChatroomLogs = mongoose.model('chatRoomLog', ChatroomLogs);


var BlockedUsers = new Schema({
    "block_user_id": { type: String},
    "user_id": { type: String},
    "blocked_user_id": { type: String},
    "blocked_chatroom_id": {type: String},
    "created_at":{type: Date},
    "updated_at":{type: Date},
    "is_active":{type: Boolean},
},{collection: 'blocked_users'});

var BlockedUsers = mongoose.model('blocked_users', BlockedUsers);


module.exports = {
    UserInfo:UserInfo,
   Chatroom:Chatroom,
   ChatroomLogs:ChatroomLogs,
   BlockedUsers:BlockedUsers
}
