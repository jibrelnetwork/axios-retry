import * as axios from 'axios'

export interface IAxiosRetryConfig {
  /**
   * The number of times to retry before failing
   * default: 3
   *
   * @type {number}
   */
  retries?: number,
  /**
   * Defines if the timeout should be reset between retries
   * default: false
   *
   * @type {boolean}
   */
  shouldResetTimeout?: boolean,
  /**
   * A callback to further control if a request should be retried. By default, it retries if the result did not have a response.
   * default: error => !error.response
   *
   * @type {Function}
   */
  retryCondition?: (error: axios.AxiosError | axios.AxiosResponse) => boolean,
  /**
   * A callback to further control the delay between retry requests. By default there is no delay.
   *
   * @type {Function}
   */
  retryDelay?: (retryCount: number, error: axios.AxiosError | axios.AxiosResponse) => number
}

export interface IAxiosRetry {
  (
    axios: axios.AxiosStatic | axios.AxiosInstance,
    axiosRetryConfig?: IAxiosRetryConfig
  ): void
}

export interface AxiosExtendedConfig extends axios.AxiosRequestConfig {
  'axios-retry'?: IAxiosRetryConfig;
}

export interface AxiosExtendedInstance extends axios.AxiosInstance {
  (config: AxiosExtendedConfig): axios.AxiosPromise;
  (url: string, config?: AxiosExtendedConfig): axios.AxiosPromise;
  defaults: AxiosExtendedConfig;
  interceptors: {
    request: axios.AxiosInterceptorManager<AxiosExtendedConfig>;
    response: axios.AxiosInterceptorManager<axios.AxiosResponse>;
  };
  getUri(config?: AxiosExtendedConfig): string;
  request<T = any, R = axios.AxiosResponse<T>> (config: AxiosExtendedConfig): Promise<R>;
  get<T = any, R = axios.AxiosResponse<T>>(url: string, config?: AxiosExtendedConfig): Promise<R>;
  delete<T = any, R = axios.AxiosResponse<T>>(url: string, config?: AxiosExtendedConfig): Promise<R>;
  head<T = any, R = axios.AxiosResponse<T>>(url: string, config?: AxiosExtendedConfig): Promise<R>;
  options<T = any, R = axios.AxiosResponse<T>>(url: string, config?: AxiosExtendedConfig): Promise<R>;
  post<T = any, R = axios.AxiosResponse<T>>(url: string, data?: any, config?: AxiosExtendedConfig): Promise<R>;
  put<T = any, R = axios.AxiosResponse<T>>(url: string, data?: any, config?: AxiosExtendedConfig): Promise<R>;
  patch<T = any, R = axios.AxiosResponse<T>>(url: string, data?: any, config?: AxiosExtendedConfig): Promise<R>;
}

declare const axiosRetry: IAxiosRetry;

export default axiosRetry

export function isNetworkError(error: Error): boolean;
export function isRetryableError(error: Error): boolean;
export function isSafeRequestError(error: Error): boolean;
export function isIdempotentRequestError(error: Error): boolean;
export function isNetworkOrIdempotentRequestError(error: Error): boolean;
export function exponentialDelay(retryNumber: number): number;
