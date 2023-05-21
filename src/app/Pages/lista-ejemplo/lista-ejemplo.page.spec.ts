import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEjemploPage } from './lista-ejemplo.page';

describe('ListaEjemploPage', () => {
  let component: ListaEjemploPage;
  let fixture: ComponentFixture<ListaEjemploPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaEjemploPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
