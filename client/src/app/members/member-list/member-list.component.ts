import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams | undefined;
  user?: User | null;
  genderList = [{ value: 'all', display: 'All' },{ value: 'male', display: 'Boys' }, { value: 'female', display: 'Girls' }]

  ngOnInit(): void {
    this.loadMembers();
  }

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  loadMembers() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      // we'll not worry about piping this and taking one in this case as this is a HTTP response and HTTP responses typically complete
      this.memberService.getMembers(this.userParams).subscribe(response => {
        this.members = response.result;
        this.pagination = response.pagination;
      })
    }
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }
}
