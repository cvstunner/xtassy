import dotenv from "dotenv"
dotenv.config({ path: "./.env" });

console.log("URI: ", process.env.MONGODB_URI)
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 1026,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET_KEY",
  braintreeId: process.env.BRAINTREE_MERCHANT_ID,
  braintreePublicKey: process.env.BRAINTREE_PUBLIC_KEY,
  braintreePrivateKey: process.env.BRAINTREE_PRIVATE_KEY,
};

module.exports = config;
