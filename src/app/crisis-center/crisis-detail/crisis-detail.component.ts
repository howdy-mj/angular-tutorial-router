import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
  ) { }

  ngOnInit() {
    this.crisis$ = this.route.paramMap.pipe(
      // 이전에 완료되지 않은 요청 취소하고 새로운 id로 히어로 데이터 요청
      switchMap((params: ParamMap) =>
        this.service.getCrisis(params.get('id'))
      )
    )
  }

  gotoCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // this.router.navigate(['/crises', { id: crisisId, foo: 'foo' }])
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route }); // 상대주소로 이동
  }

}