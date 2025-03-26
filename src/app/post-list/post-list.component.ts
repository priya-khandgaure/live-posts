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
export class PostListComponent implements OnInit, OnDestroy {
  listOfPost: Post[] = [];
  private postSub!: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.fetchData(); // Fetch data when component loads

    this.postSub = this.postService.getPosts().subscribe((listOfPost: Post[]) => {
      this.listOfPost = listOfPost;
    });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
