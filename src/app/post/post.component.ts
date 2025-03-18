import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent {
  @Input() post?: Post;
  @Input() index: number = 0; 

  constructor(
    private postService: PostService, 
    private backEndService: BackEndService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {   
    this.route.params.subscribe((params: Params) => {
      if(params['index']){

      }
    });
  }

  onDelete() {
    console.log('Delete called....');
    this.postService.deletePost(this.index);
    this.backEndService.saveData();
  }

  onEdit() {
    console.log('Edit called....');
    this.router.navigate(["/edit-post", this.index]);

  }

  postLike() {
    console.log('postLike called....');
    this.postService.likePost(this.index);
    this.backEndService.saveData();
  }

}
