import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendGamesComponent } from './recommend-games.component';

describe('RecommendGamesComponent', () => {
  let component: RecommendGamesComponent;
  let fixture: ComponentFixture<RecommendGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
