import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  //view memberTabs elememt in html as memberTabs
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  member: Member;
  activeTab?: TabDirective;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  messages: Message[] = [];
  user?: User;

  constructor(private memberService: MembersService, private toastr: ToastrService,private route: ActivatedRoute, public presenceService: PresenceService,
    private messageService: MessageService, private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    })
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  //we have resolvers we don't need load members in ngoninit
  ngOnInit(): void {
    //resolvers fetching data
    this.route.data.subscribe(data => this.member = data['member'])
    // this.route.queryParams.subscribe(params =>params['tab']? this.selectTab(params['tab']):this.selectTab('About '+this.member.knownAs));
    //we can use route params outside this component to access things in this component
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
    // this.route.queryParams.subscribe(params => params['tab'] && this.selectTab(params['tab']))

    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      })
    }
    return imageUrls;
  }

  // loadMember() {
  //   // access username in routing
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
  //     this.member = member;

  //   })
  // }

  loadMessages() {
    this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
      this.messages = messages;
    })
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  selectTab(heading: string) {
    this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
  }


  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(() => this.toastr.success('You have liked ' + member.knownAs));
  }
}
