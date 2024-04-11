import { ResolveFn } from '@angular/router';
import { Member } from '../_models/member';
import { inject } from '@angular/core';
import { MembersService } from '../_services/members.service';

//a resolver is a service that is used to pre-fetch data before a route is activated.
export const memberDetailedResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MembersService);
  //non-null assertion operator
  return memberService.getMember(route.paramMap.get('username')!)
};
