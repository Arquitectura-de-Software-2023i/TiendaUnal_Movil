import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviosPage } from './envios.page';

describe('EnviosPage', () => {
  let component: EnviosPage;
  let fixture: ComponentFixture<EnviosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnviosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
