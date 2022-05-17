interface Ticker {
  currency: string;
  price: number;
}

export class Helper {
  static async getStockPrice(ticker: string): Promise<Ticker> {
    return fetch(`http://localhost:3005/ticker?ticker=${ticker}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
