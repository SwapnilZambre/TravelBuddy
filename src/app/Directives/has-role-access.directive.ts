import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasRoleAccess]',
  standalone: true
})
export class HasRoleAccessDirective {
  private currentRole = (localStorage.getItem('role') || '').toLowerCase();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input('appHasRoleAccess') set allowedRoles(roles: string[]) {
    const normalizedRoles = roles.map(r => r.toLowerCase());
    if (normalizedRoles.includes(this.currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
