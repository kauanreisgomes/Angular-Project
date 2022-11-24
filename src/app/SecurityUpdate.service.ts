import { Injectable } from "@angular/core";
import { Observable, observable  } from "rxjs";
import { SecurityUpdate } from "./SecurityUpdate";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environments";

@Injectable({providedIn: 'root'})
export class SecurityUpdateService{
    private apiURL = environment.apiBaseURL;

    constructor(private http: HttpClient) { }

    public getSecurityUpdates(): Observable<SecurityUpdate[]>{
        
        return this.http.get<SecurityUpdate[]>(`${this.apiURL}/all`);
       
    }
}
