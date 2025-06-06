const admin = require("firebase-admin");

// Replace with the path to your Firebase service account key file
const serviceAccount = {
  type: "service_account",
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://finedine-5974a-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

module.exports = admin;
