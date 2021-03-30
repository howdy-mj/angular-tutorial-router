import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * 비동기 모달 팝업
 * window.confirm은 사용하지 않는 것이 좋음
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?')
    // message는 사용자에게 안내 할 문구

    return of(confirmation)
  }

  constructor() { }
}
