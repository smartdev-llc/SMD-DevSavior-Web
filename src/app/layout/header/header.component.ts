import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { SearchActions } from './../../home/reducers/search.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import { getAuthStatus } from '../../auth/reducers/selectors';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../../auth/actions/auth.actions';
import { TemplateRef } from '@angular/core';
import { Directive, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private authActions: AuthActions,
    private searchActions: SearchActions,
    private router: Router, private renderer: Renderer2) {
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.renderer.addClass(document.body, 'cat-mobile-open');

  }

  ngOnInit() {
    this.store.dispatch(this.authActions.authorize());
    this.store.dispatch(this.authActions.login());
  }
}
