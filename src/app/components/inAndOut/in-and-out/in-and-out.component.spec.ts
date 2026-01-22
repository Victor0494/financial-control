import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InAndOutComponent } from './in-and-out.component';

describe('InAndOutComponent', () => {
  let component: InAndOutComponent;
  let fixture: ComponentFixture<InAndOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InAndOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InAndOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
