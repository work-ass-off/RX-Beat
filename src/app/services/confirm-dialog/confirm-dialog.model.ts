import { type Observable } from "rxjs";

export enum ManageButton {
  CONFIRM = 'CONFIRM',
  CANCEL = 'CANCEL'
}

export type canDeactivateResult = boolean | Observable<boolean>;