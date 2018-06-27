import { SearchActions } from './reducers/search.actions';
import { getSelectedTaxonIds, categeoryLevel, taxonomiByName } from './reducers/selectors';
import { environment } from './../../environments/environment';
import { AppState } from './../interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Directive, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // products$: Observable<any>;
  taxonomies$: Observable<any>;
  brands$: Observable<any>;
  selectedTaxonIds$: Observable<number[]>;
  categoryLevel$: Observable<any>;
  products: any;
  isProducts = false;
  isFilterOn = false;
  isBrandOpen = false;
  isCategoryOpen = true;
  fillterList: any;

  constructor(
    private store: Store<AppState>,
    private searchActions: SearchActions) {
    // Get all products for the product list component
    // this.products$ = this.store.select(getProducts);
    this.selectedTaxonIds$ = this.store.select(getSelectedTaxonIds);
  }

  isModalShown = false;

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
  }

  onHidden(): void {
    this.isModalShown = false;
  }
  ngOnInit() {
  }

  OnCategeorySelected(category) {
    // TODO: Here taxonomies_id is hardcoded for now.
    this.store.dispatch(this.searchActions.getChildTaxons('5', category.id));
    // ToDo: Here Brands are hardcoded For now.
    this.store.dispatch(this.searchActions.getTaxonomiesByName('Brands', category.name));
    this.brands$ = this.store.select(taxonomiByName);
    this.isFilterOn = true;
  }
  showAll() {
    this.isFilterOn = false;
  }

  isOpenChangeaccourdian() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }
}
