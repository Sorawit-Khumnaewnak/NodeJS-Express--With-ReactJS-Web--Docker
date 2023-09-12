const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const validator = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        isAsync: true,
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ['basic', 'admin'],
      default: 'basic'
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      trim: true,
      lowercase: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    phone: {
      type: String,
      required: false,
    },
    profile: {
      type: String,
      required: false
    },
    tokens: [
      {
        access: {
          type: String
        },
        token: {
          type: String
        },
        type: { type: String },
        expiredAt: { type: Date, expires: '1h' }
      }
    ]
  },
  {
    timestamps: true,
    usePushEach: true,
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
};

module.exports = {
  userSchema
};