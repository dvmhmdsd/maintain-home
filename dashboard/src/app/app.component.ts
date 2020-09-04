import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  isDrawerOpened: boolean;

  navList = [
    { path: '/home', label: 'الصفحة الرئيسية', icon: 'dashboard' },
    { path: '/user/list', label: 'قائمة المديرين', icon: "supervisor_account" },
    { path: '/user/new', label: 'إضافة مدير جديد', icon: "create" },
  ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.isDrawerOpened = this.mobileQuery.matches ? false : true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {

  }
}
