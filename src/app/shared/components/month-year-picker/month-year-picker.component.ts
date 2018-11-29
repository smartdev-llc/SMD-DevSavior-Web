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
  selector: "month-year-picker",
  templateUrl: "./month-year-picker.component.html",
  styleUrls: ["./month-year-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearPickerComponent),
      multi: true
    }
  ]
})
export class MonthYearPickerComponent implements OnInit, ControlValueAccessor {
  /**
   * configuration options
   */
  @Input() public config: any = {};

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

  onChange = (_: any) => { };
  onTouched = () => { };

  listMonths: Array<number> = this.generateMonths();
  listYears: Array<number> = this.generateYears();
  currentYear: any;
  currentMonth: any;

  constructor() {
  }

  /**
   * Component onInit
   */
  public ngOnInit() {
    this.initValuesAndOptions();
  }

  initValuesAndOptions() {
    const config: any = {

    };

    this.config = { ...config, ...this.config };
  }

  writeValue(obj: any): void {
    if (obj) {
      const monthYearObj = this.parteMothYearObj(obj);
      this.currentMonth = monthYearObj.month;
      this.currentYear = monthYearObj.year;
    } else {
      this.currentMonth = null;
      this.currentYear = null;
    }
    this.valueChanged();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  /**
   * When selected items changes trigger the chaange back to parent
   */
  public valueChanged() {
    if (this.currentMonth && this.currentYear) {
      const dateSelected = this.convertToDateObj(this.currentMonth, this.currentYear);
      this.onChange(dateSelected);
      this.change.emit({ value: dateSelected });
    } else {
      this.onChange(null);
      this.change.emit({ value: null });
    }
  }

  public onChangeMonth(month: any) {
    this.valueChanged();
  }

  public onChangeYear(year: any) {
    this.valueChanged();
  }

  private generateMonths(): Array<number> {
    let months = [];
    for (let i = 1; i <= 12; i++) {
        months.push({value: i, name: i.toString()});
    }
    return months;
  }

  private generateYears(): Array<number> {
    let years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 1970; i <= currentYear; i++) {
        years.push({value: i, name: i.toString()});
    }
    return years;
  }

  private convertToDateObj(month: number, year: number): Date {
    let date = new Date();
    date.setMonth(month - 1);
    date.setFullYear(year);
    return date;
  }

  private parteMothYearObj(date: any): any {
    let month, year;
    if (typeof date === 'string') {
      const dateSplit = date.split('-');
      month = Number(dateSplit[0]);
      year = Number(dateSplit[1]);
    } else {
      month = date.getMonth() + 1;
      year = date.getFullYear();
    }
    return { month, year };
  }
}
