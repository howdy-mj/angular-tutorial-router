import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';

import { Crisis } from '../crisis';
import { DialogService } from 'src/app/dialog.service';


@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      })
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  // 특정 컴포넌트 전용 가드
  canDeactivate(): Observable<boolean>|boolean {
    if (!this.crisis || this.crisis.name === this.editName) {
      // 위기목록이 없거나 변경되지 않았으면 True
      return true;
    }
    // 내용이 변경된 경우, 사용자에게 팝업
    return this.dialogService.confirm('Discard changes?')
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route }); // 상대주소로 이동
  }
}