import aedes from 'aedes';
import { createServer } from 'net';

const broker = new aedes();
const port = 1883;

const server = createServer(broker.handle);

server.listen(port, () => {
  console.log(`MQTT broker is running on port ${port}`);
});

// Define the authentication logic
broker.authenticate = (client, username, password, callback) => {
  const validUsername = process.env.USER_NAME;
  const validPassword = process.env.PASSWORD;

  const isValid = username === validUsername && password?.toString() === validPassword;

  if (isValid) {
    console.log(`Client authenticated: ${client.id}`);
    callback(null, true); // Authentication successful
  } else {
    console.log(`Client failed authentication: ${client.id}`);
    callback(null, false); // Authentication failed
  }
};
