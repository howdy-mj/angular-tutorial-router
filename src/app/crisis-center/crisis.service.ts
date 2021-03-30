import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {
  static nextCrisisId = 100;
  private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES)

  constructor(private messageService: MessageService) { }

  getCrises() {
    return this.crises$
  }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      // `id` 앞에 사용된 `+`는 문자열을 숫자로 변환합니다.
      map((heroes: Crisis[]) => heroes.find(hero => hero.id === +id))
    );
  }

  addCrisis(name: string) {
    name = name.trim();
    if (name) {
      const crisis = { id: CrisisService.nextCrisisId++, name };
      CRISES.push(crisis);
      this.crises$.next(CRISES);
    }
  }
}
