require("dotenv").config();
class TokenBucket {
  constructor(capacity, fillPerSecond) {
    this.capacity = capacity;
    this.tokens = capacity;
    setInterval(
      () => this.addToken(),
      process.env.API_FARM_UNIT_FEED_INTERVAL / fillPerSecond
    );
  }

  addToken() {
    if (this.tokens < this.capacity) {
      this.tokens += 1;
    }
  }

  take() {
    if (this.tokens > 0) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }
}

module.exports = TokenBucket;
