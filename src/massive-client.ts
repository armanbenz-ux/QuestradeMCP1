import axios, { AxiosInstance } from 'axios';

export class MassiveClient {
  private http: AxiosInstance;

  constructor(apiKey: string) {
    this.http = axios.create({
      baseURL: 'https://api.massive.com',
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  // ── Stocks ────────────────────────────────────────────────────────────────

  async getStockSnapshot(ticker: string) {
    const { data } = await this.http.get(
      `/v2/snapshot/locale/us/markets/stocks/tickers/${ticker.toUpperCase()}`
    );
    return data;
  }

  async getStockBars(
    ticker: string,
    multiplier: number,
    timespan: string,
    from: string,
    to: string,
    adjusted = true
  ) {
    const { data } = await this.http.get(
      `/v2/aggs/ticker/${ticker.toUpperCase()}/range/${multiplier}/${timespan}/${from}/${to}`,
      { params: { adjusted } }
    );
    return data;
  }

  async getStockPrevDay(ticker: string) {
    const { data } = await this.http.get(
      `/v2/aggs/ticker/${ticker.toUpperCase()}/prev`
    );
    return data;
  }

  async getTickerDetails(ticker: string) {
    const { data } = await this.http.get(
      `/v3/reference/tickers/${ticker.toUpperCase()}`
    );
    return data;
  }

  async getTechnicalIndicator(
    indicator: 'sma' | 'ema' | 'rsi' | 'macd',
    ticker: string,
    params: Record<string, unknown> = {}
  ) {
    const { data } = await this.http.get(
      `/v1/indicators/${indicator}/${ticker.toUpperCase()}`,
      { params }
    );
    return data;
  }

  async getNews(params: Record<string, unknown> = {}) {
    const { data } = await this.http.get('/v2/reference/news', { params });
    return data;
  }

  async getMarketStatus() {
    const { data } = await this.http.get('/v1/marketstatus/now');
    return data;
  }

  async getDividends(params: Record<string, unknown> = {}) {
    const { data } = await this.http.get('/v3/reference/dividends', { params });
    return data;
  }

  async getSplits(params: Record<string, unknown> = {}) {
    const { data } = await this.http.get('/v3/reference/splits', { params });
    return data;
  }

  async getRelatedCompanies(ticker: string) {
    const { data } = await this.http.get(
      `/v1/related-companies/${ticker.toUpperCase()}`
    );
    return data;
  }

  // ── Options ───────────────────────────────────────────────────────────────

  async getOptionsChain(underlying: string, params: Record<string, unknown> = {}) {
    const { data } = await this.http.get(
      `/v3/snapshot/options/${underlying.toUpperCase()}`,
      { params }
    );
    return data;
  }

  async getOptionSnapshot(underlying: string, optionTicker: string) {
    const { data } = await this.http.get(
      `/v3/snapshot/options/${underlying.toUpperCase()}/${optionTicker}`
    );
    return data;
  }

  async getOptionsContracts(params: Record<string, unknown> = {}) {
    const { data } = await this.http.get('/v3/reference/options/contracts', { params });
    return data;
  }

  async getOptionBars(
    optionTicker: string,
    multiplier: number,
    timespan: string,
    from: string,
    to: string
  ) {
    const { data } = await this.http.get(
      `/v2/aggs/ticker/${optionTicker}/range/${multiplier}/${timespan}/${from}/${to}`
    );
    return data;
  }

  async getOptionPrevDay(optionTicker: string) {
    const { data } = await this.http.get(`/v2/aggs/ticker/${optionTicker}/prev`);
    return data;
  }
}
