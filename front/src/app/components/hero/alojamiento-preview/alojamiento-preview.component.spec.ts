import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlojamientoPreviewComponent } from './alojamiento-preview.component';

describe('AlojamientoPreviewComponent', () => {
  let component: AlojamientoPreviewComponent;
  let fixture: ComponentFixture<AlojamientoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlojamientoPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlojamientoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
