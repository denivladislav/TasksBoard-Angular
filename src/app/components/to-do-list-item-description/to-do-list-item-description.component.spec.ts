import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListItemDescriptionComponent } from './to-do-list-item-description.component';

describe('ToDoListItemDescriptionComponent', () => {
    let component: ToDoListItemDescriptionComponent;
    let fixture: ComponentFixture<ToDoListItemDescriptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToDoListItemDescriptionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoListItemDescriptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
