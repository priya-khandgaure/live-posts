import { Injectable } from "@angular/core";
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BackEndService {
  constructor(private postService: PostService, private http: HttpClient) {}

  // Save data to Firebase
  saveData() {
    this.postService.getPosts().subscribe((listOfPosts: Post[]) => {
      this.http.put('https://live-posts-24b51-default-rtdb.firebaseio.com/posts.json', listOfPosts)
        .subscribe(res => {
          console.log('Data saved:', res);
        });
    });
  }

  // Fetch data from Firebase and update UI
  fetchData() {
    this.http.get<Post[]>('https://live-posts-24b51-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        tap((listOfPosts: Post[]) => {
          console.log('Fetched Posts:', listOfPosts);
          this.postService.setPosts(listOfPosts);
        })
      )
      .subscribe();
  }
}
