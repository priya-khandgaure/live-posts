import { Injectable } from "@angular/core";
import { Post } from './post.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  private listOfPost: Post[] = [];
  private listChanged = new BehaviorSubject<Post[]>([]);

  private firebaseUrl = 'https://live-posts-24b51-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {
    this.fetchData(); // Fetch data when service initializes
  }

  getPosts() {
    return this.listChanged.asObservable();
  }

  setPosts(listOfPost: Post[]) {
    this.listOfPost = listOfPost || [];
    this.listChanged.next([...this.listOfPost]);
  }

  fetchData() {
    this.http.get<Post[]>(this.firebaseUrl).subscribe((posts) => {
      this.setPosts(posts || []);
    });
  }

  saveData() {
    this.http.put(this.firebaseUrl, this.listOfPost).subscribe(() => {
      console.log('Data saved to Firebase');
    });
  }

  addPost(post: Post) {
    this.listOfPost.push(post);
    this.listChanged.next([...this.listOfPost]);
    this.saveData(); // Save to Firebase
  }

  updatePost(index: number, post: Post) {
    this.listOfPost[index] = post;
    this.listChanged.next([...this.listOfPost]);
    this.saveData(); // Save to Firebase
  }

  deletePost(index: number) {
    this.listOfPost.splice(index, 1);
    this.listChanged.next([...this.listOfPost]);
    this.saveData(); // Save to Firebase
  }

  likePost(index: number) {
    this.listOfPost[index].numberOfLikes += 1;
    this.listChanged.next([...this.listOfPost]);
    this.saveData(); // Save to Firebase
  }

  getPostById(index: number) {
    return this.listOfPost[index];
  }
}
