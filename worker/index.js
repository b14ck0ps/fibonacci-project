const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000, // if connection is lost, try to reconnect every 1000ms
});

const sub = redisClient.duplicate();

// fib function
function fib(index) {
  if (index <= 0) {
    return 0;
  } else if (index === 1) {
    return 1;
  } else {
    let fibPrevPrev = 0;
    let fibPrev = 1;
    let fibCurrent = 0;

    for (let i = 2; i <= index; i++) {
      fibCurrent = fibPrev + fibPrevPrev;
      fibPrevPrev = fibPrev;
      fibPrev = fibCurrent;
    }

    return fibCurrent;
  }
}

sub.on("message", (_, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
