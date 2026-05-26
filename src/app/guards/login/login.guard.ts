import type { CanDeactivateFn } from '@angular/router';

type LoginDeactivatable = {
  canDeactivate: () => boolean | Promise<boolean>;
};

export const loginGuard: CanDeactivateFn<LoginDeactivatable> = (component) => component.canDeactivate();
