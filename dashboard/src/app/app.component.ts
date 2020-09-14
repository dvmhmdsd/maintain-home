import { UserTypes } from './../../../CONSTANTS/enums/user-types.enum';
import { IUser } from './../../../CONSTANTS/interfaces/user.interface';
import { AuthenticationService } from './services/account/authentication.service';
import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Events } from './services/events.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sideNav') sideNav: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  user: IUser;

  isDrawerOpened: boolean;
  showLayout: boolean;

  navList = [
    { path: '/home', label: 'الصفحة الرئيسية', icon: 'dashboard', superOnly: false },
    {
      label: 'الإدارة',
      icon: 'admin_panel_settings',
      children: [
        {
          path: '/user/list',
          label: 'قائمة المديرين',
          icon: 'supervisor_account',
          superOnly: true,
        },
        {
          path: '/user/new',
          label: 'إضافة مدير جديد',
          icon: 'create',
          superOnly: true,
        },
      ],
    },
    {
      label: 'أوامر الشغل',
      icon: 'featured_play_list',
      children: [
        {
          path: '/orders',
          label: 'قائمة أوامر الشغل',
          icon: 'list',
        },
        {
          path: '/orders/devices',
          label: 'قائمة الأجهزة',
          icon: 'home_repair_service',
        },
        {
          path: '/orders/create-device',
          label: 'إنشاء جهاز جديد',
          icon: 'widgets',
        },
      ],
    },
    { path: '/complaints', label: 'الشكاوي', icon: 'sms', superOnly: false },
  ];

  userTypes = UserTypes;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private events: Events,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.isDrawerOpened = this.mobileQuery.matches ? false : true;

    this.showLayout = authenticationService.isUserAuthenticated();
  }

  ngOnInit(): void {
    this.events.subscribe('showLayout', (val) => {
      this.showLayout = true;
      this.isDrawerOpened = this.mobileQuery.matches ? false : true;
    });
    this.events.subscribe("userImageChanged", (value) => {
      console.log(value)
      this.user = value
    })
    this.events.subscribe('unAuthorizedUser', (val) => {
      console.log(val);
      if (val) {
        this.logout();
      }
    });

    this.user = JSON.parse(localStorage.getItem('user'));

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/home') {
          this.user = JSON.parse(localStorage.getItem('user'));
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSideNav() {
    this.sideNav.toggle();
    this.isDrawerOpened = !this.isDrawerOpened;
  }

  logout() {
    localStorage.clear();
    this.showLayout = false;
    this.router.navigate(['/user/login']);
  }
}
