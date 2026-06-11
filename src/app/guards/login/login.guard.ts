import { inject } from '@angular/core';
import type { CanDeactivateFn } from '@angular/router';
import { ConfirmDialogService } from '../../services/confirm-dialog/confirm-dialog.service';

type LoginDeactivatable = {
  hasUnsavedChanges: () => boolean;
};

export const loginGuard: CanDeactivateFn<LoginDeactivatable> = (component) => {
  const confirmModalService = inject(ConfirmDialogService);
  if (component.hasUnsavedChanges()) {
    return confirmModalService.canDeactivate();
  }
  return true;
};
