const key = require("./keys");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PG Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: key.pgUser,
  host: key.pgHost,
  database: key.pgDatabase,
  password: key.pgPassword,
  port: key.pgPort,
});

pgClient.on("error", () => console.log("Lost PG connection"));

// Redis Client Setup
const redis = require("redis");
const redisClient = redis.createClient({
  host: key.redisHost,
  port: key.redisPort,
  retry_strategy: () => 1000, // if connection is lost, try to reconnect every 1000ms
});
const redisPublisher = redisClient.duplicate();

// Express route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

// Get all values from Postgres
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");
  res.send(values.rows);
});

// Get all values from Redis
app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

// Post a new value
app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 100) {
    return res.status(422).send("Index too high");
  }
  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index); // insert event
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  res.send({ working: true });
});

pgClient.connect()
  .then(() => pgClient.query("SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_name = 'values')"))
  .then((result) => {
    if (!result.rows[0].exists) {
      return pgClient.query("CREATE TABLE values (number INT)");
    }
  })
  .catch((err) => console.log(err))
  .finally(() => {
    app.listen(5000, (err) => {
      console.log("Listening");
    });
  });
