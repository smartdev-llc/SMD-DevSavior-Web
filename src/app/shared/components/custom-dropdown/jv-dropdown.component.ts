import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  HostListener, forwardRef,
  OnChanges, SimpleChanges, ViewChildren, ElementRef, QueryList
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: "jv-select-dropdown",
  templateUrl: "./jv-dropdown.component.html",
  styleUrls: ["./jv-dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JVDropDownComponent),
      multi: true
    }
  ]
})
export class JVDropDownComponent implements OnInit, OnChanges, ControlValueAccessor {

  /**
   * Get the required inputs
   */
  @Input() public options: any = [];

  /**
   * configuration options
   */
  @Input() public config: any = {};

  /**
   * Value
   */
  @Input() public value: any;

  /**
   * event when value changes to update in the UI
   */
  @Output() public valueChange: EventEmitter<any> = new EventEmitter();

  /**
   * change event when value changes to provide user to handle things in change event
   */
  @Output() public change: EventEmitter<any> = new EventEmitter();

  /**
   * Available items for selection
   */
  public availableItems: any = [];

  /**
   * Selected Items
   */
  public selectedItems: any;

  /**
   * Selection text to be Displayed
   */
  public selectedDisplayText: string = "Select";

  onChange = (_: any) => { };

  constructor() {
  }

  /**
   * Component onInit
   */
  public ngOnInit() {
    this.availableItems = this.options;
    this.initDropdownValuesAndOptions();
  }

  initDropdownValuesAndOptions() {
    const config: any = {
      displayKey: "description",
      height: 'auto',
      search: false,
      placeholder: 'Select',
      limitTo: this.options.length,
      customComparator: undefined
    };

    this.config = { ...config, ...this.config };
    this.selectedDisplayText = this.config["placeholder"];
    if (this.value) {
      this.selectItem(this.value);
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.selectItem(obj);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    // this.onChange = fn;
  }

  /**
   * Component onchage i.e when any of the innput properties change
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges) {
    this.selectedItems = null;
  }

  /**
   * Select an item
   * @param item:  item to be selected
   * @param index:  index of the item
   */
  public selectItem(item: string) {
    this.selectedItems = item;
    this.valueChanged();
  }

  /**
   * When selected items changes trigger the chaange back to parent
   */
  public valueChanged() {
    this.value = this.selectedItems || this.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.change.emit({ value: this.value });
    this.setSelectedDisplayText();
  }

  /**
   * set the text to be displayed
   */
  private setSelectedDisplayText() {
    let text: string = this.selectedItems[this.config.displayKey] || this.selectedItems;
    this.selectedDisplayText = this.selectedItems ? text : this.config.placeholder;
  }
}
