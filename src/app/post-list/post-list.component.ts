import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
  
export class PostListComponent implements OnInit {
  listOfPost: Post[] = [];

  constructor(
    private postService: PostService,
    private backEndService: BackEndService
  ) {}

  ngOnInit(): void {
    // Fetch latest data from Firebase on page load
    this.backEndService.fetchData();

    // Subscribe to post changes to update UI
    this.postService.listChangedEvent.subscribe((posts) => {
      this.listOfPost = posts;
    });
  }
}

