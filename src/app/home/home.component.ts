import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RedditService } from '../shared/data-access/reddit.service';
import { GifListComponent } from './ui/gif-list.component';
import { SearchBarComponent } from './ui/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <app-search-bar
      [subredditFormControl]="redditService.subredditFormControl"
    ></app-search-bar>

    @if (redditService.loading()){
    <mat-progress-spinner mode="indeterminate" diameter="50" />
    } @else {
    <app-gif-list
      [gifs]="redditService.gifs()"
      infiniteScroll
      (scrolled)="redditService.pagination$.next(redditService.lastKnownGif())"
      class="grid-container"
    />
    }
  `,
  imports: [
    GifListComponent,
    SearchBarComponent,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
  ],
  styles: [
    `
      mat-progress-spinner {
        margin: 2rem auto;
      }
    `,
  ],
})
export default class HomeComponent {
  redditService = inject(RedditService);
}