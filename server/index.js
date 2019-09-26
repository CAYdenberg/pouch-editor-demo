require("dotenv").config();

const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  COUCH_URI,
  KOALA_URI,
  SESSION_SECRET,
  JWT_SECRET,
  APP_ORIGIN,
  AUTH_PARTY,
  TWITTER_KEY,
  TWITTER_SECRET,
  APP_NAME
} = process.env;

const Koala = require("koala-server");

Koala({
  PORT,
  NODE_ENV,
  MONGO_URI,
  COUCH_URI,
  KOALA_URI,
  SESSION_SECRET,
  JWT_SECRET,
  APP_ORIGIN,
  AUTH_PARTY,
  TWITTER_KEY,
  TWITTER_SECRET,
  APP_NAME
});
