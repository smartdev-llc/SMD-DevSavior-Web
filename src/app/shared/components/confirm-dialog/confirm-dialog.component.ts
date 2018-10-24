import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChildren,
  ViewChild
} from "@angular/core";
import { BsModalRef, BsModalService, ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"]
})
export class ConfirmDialogComponent implements OnInit {

  @ViewChild('confirmModal') confirmModal: ModalDirective;
  @Input() public config: any = {};
  @Output() handleConfirm = new EventEmitter();

  modalRef: BsModalRef;

  constructor() {

  }

  public ngOnInit() {
    this.config = {
      title: 'common.titleDialog',
      description: 'common.descriptionDialog',
      ...this.config
    }
  }

  openModal() {
    this.confirmModal.show();
  }

  confirm(): void {
    this.confirmModal.hide();
    this.handleConfirm.emit(true);
  }

  decline(): void {
    this.confirmModal.hide();
    this.handleConfirm.emit(false);
  }

}
