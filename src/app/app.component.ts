import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { SharedModule } from './modules/shared/shared.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SharedModule, ToDoListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'ToDoList';
}
