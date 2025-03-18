import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent{
  listOfPost: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {

    this.listOfPost = this.postService.getPosts();

    this.postService.listChangedEvent.subscribe((listOfPost: Post[]) => {
      this.listOfPost = this.postService.getPosts();
    });
  }
}