import { Injectable } from "@angular/core";
import { Post } from './post.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private listOfPost: Post[] = [];
  private listChanged = new BehaviorSubject<Post[]>([]);

  getPosts() {
    console.log('Inside get posts',this.listChanged.asObservable());
    return this.listChanged.asObservable();
  }

  deletePost(index: number) {
    this.listOfPost.splice(index, 1);
    this.listChanged.next([...this.listOfPost]);
  }

  addPost(post: Post) {
    this.listOfPost.push(post);
    this.listChanged.next([...this.listOfPost]);
  }

  updatePost(index: number, post: Post) {
    this.listOfPost[index] = post;
    this.listChanged.next([...this.listOfPost]);
  }

  getPostById(index: number) {
    return this.listOfPost[index];
  }

  likePost(index: number) {
    this.listOfPost[index].numberOfLikes += 1;
    this.listChanged.next([...this.listOfPost]);
  }

  setPosts(listOfPost: Post[]) {
    console.log("list of post", listOfPost);
    this.listOfPost = listOfPost;
    console.log("this--- list of post", this.listOfPost);
    this.listChanged.next([...this.listOfPost]);
  }
}
