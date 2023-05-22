import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModEnvioPage } from './mod-envio.page';

describe('ModEnvioPage', () => {
  let component: ModEnvioPage;
  let fixture: ComponentFixture<ModEnvioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModEnvioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
