import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      this.preloadModules.push(route.path) // 사전 로딩할 모듈의 라우팅 규칙 추가
      console.log('Preloaded: ', + route.path)
      return load();
    } else {
      return of(null)
    }
  }

  constructor() { }
}
