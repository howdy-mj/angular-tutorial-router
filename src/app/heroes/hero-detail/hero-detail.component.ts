import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { Hero } from '../hero';
import { HeroService } from './../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {
    // 옵저버블을 사용하지 않는 방식: snapshot
    // const id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.service.getHero(id);

    this.hero$ = this.route.paramMap.pipe(
      // 이전에 완료되지 않은 요청 취소하고 새로운 id로 히어로 데이터 요청
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id'))
      )
    )
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }])
  }

}