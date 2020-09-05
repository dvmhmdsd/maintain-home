import { AuthenticationService } from './services/account/authentication.service';
import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Events } from './services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  isDrawerOpened: boolean;
  showLayout: boolean;

  navList = [
    { path: '/home', label: 'الصفحة الرئيسية', icon: 'dashboard' },
    { path: '/user/list', label: 'قائمة المديرين', icon: 'supervisor_account' },
    { path: '/user/new', label: 'إضافة مدير جديد', icon: 'create' },
  ];

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
    this.events.subscribe('showLayout', (val) => (this.showLayout = true));
    this.events.subscribe('unAuthorizedUser', (val) => {
      console.log(val);
      if (val) {
        this.logout();
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.clear();
    this.showLayout = false;
    this.router.navigate(['/user/login']);
  }
}
