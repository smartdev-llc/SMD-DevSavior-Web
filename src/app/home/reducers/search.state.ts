/** Search state
 * [{
 *   name: 'Bag',
 *   taxonId: 1
 * }, {
 *   name: 'T-shirts',
 *   taxonId: 9
 * }]
 *
*/

import { List, Record, Map } from 'immutable';

export interface SearchState extends Map<string, any> {
  selectedFilters: List<Map<string, any>>;
  selectedTaxonIds: List<number>;
  categeoryLevel: List<any>;
  taxonomiByName: List<any>;
}

export const SearchStateRecord = Record({
  selectedFilters: List([]),
  selectedTaxonIds: List([]),
  productsByKeyword: List([]),
  getChildTaxons: List([]),
  categeoryLevel: List([]),
  taxonomiByName: List([])
});
