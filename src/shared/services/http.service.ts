import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONST} from './shared.constants';
@Injectable({
  providedIn: 'root'
})
// This Class will allow the user to use the HttpClient Services easily without writing the full URl everytime
export class HttpService {

  // Class Constructor
  // Services Injected: HttpClient
  constructor(private httpClient: HttpClient) {
  }

  // Function to send the GET Method
  // 1 Parameter: Action (Destination of the request)
  public get(action: string): any {
    return this.httpClient.get(`${API_CONST.BASE_URL}${action}`);
  }

  // Function to send the POST Method
  // 2 Parameters: Action (Destination of the request), Data: payload of the request
  public post(action: string, data: any): any {
    return this.httpClient.post(`${API_CONST.BASE_URL}${action}`, data);
  }

  // Function to send the PUT Method
  // 2 Parameters: Action (Destination of the request), Data: payload of the request
  public put(action: string, data: any): any {
    return this.httpClient.put(`${API_CONST.BASE_URL}${action}`, data);
  }

  // Function to send the DELETE Method
  // 1 Parameter: Action (Destination of the request)
  public delete(action: string): any {
    return this.httpClient.delete(`${API_CONST.BASE_URL}${action}`);
  }
}
