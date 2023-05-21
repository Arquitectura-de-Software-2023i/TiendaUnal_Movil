import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviosAdminPage } from './envios-admin.page';

describe('EnviosAdminPage', () => {
  let component: EnviosAdminPage;
  let fixture: ComponentFixture<EnviosAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnviosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
