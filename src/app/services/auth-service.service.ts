import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { UserModelLogin, responseAccesModels } from '../login/user.models'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient);

  private apiUrl = `http://143.198.224.159:8001/api/token/`



  constructor() { }

  login(data : UserModelLogin){
    return this.http.post<responseAccesModels>(this.apiUrl, data)
  }


}