import { HttpClient, HttpParams } from "@angular/common/http";
import { BillDTO } from "../../components/bill/bill/bilDTO";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BillApiService {
  private readonly API_URL = `${environment.apiUrl}/v1/bill`;

  constructor(private http: HttpClient) {}

  getBillsByDate(date?: string) {
    let params = date ? new HttpParams().set('dueDate', date) : new HttpParams().set('dueDate', new Date().toISOString().split('T')[0]);

    return this.http.get<BillDTO[]>(this.API_URL, {params: params})
  }

  addBill(bill: BillDTO) {
    return this.http.post<BillDTO>(this.API_URL, bill);
  }

  updateBillStatus(bill: BillDTO) {
    const params = {
      payed: bill.payed
    }
    return this.http.patch<void>(`${this.API_URL}/${bill.id}`, null, { params });
  }
}