import axios, { AxiosInstance } from 'axios';

export class MassiveClient {
  private http: AxiosInstance;

  constructor(apiKey: string) {
    this.http = axios.create({
      baseURL: 'https://api.massive.com',
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  }

  // ── Stocks (all available on free Stocks Basic plan) ──────────────────────

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

  async getStockOpenClose(ticker: string, date: string) {
    const { data } = await this.http.get(
      `/v1/open-close/${ticker.toUpperCase()}/${date}`
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

  // ── Options (all available on free Options Basic plan) ────────────────────

  async getOptionsContracts(params: Record<string, unknown> = {}) {
    const { data } = await this.http.get('/v3/reference/options/contracts', { params });
    return data;
  }

  async getOptionContractDetails(optionTicker: string) {
    const { data } = await this.http.get(
      `/v3/reference/options/contracts/${optionTicker}`
    );
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

  async getOptionOpenClose(optionTicker: string, date: string) {
    const { data } = await this.http.get(`/v1/open-close/${optionTicker}/${date}`);
    return data;
  }
}
