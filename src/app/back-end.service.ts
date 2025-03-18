import { Injectable } from "@angular/core";
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

// database path - https://live-posts-24b51-default-rtdb.firebaseio.com/

export class BackEndService {
	constructor(private postService: PostService, private http: HttpClient) {}

	// functionality 1 - save data
	saveData() {
		// step 1- get list of posts from post.service
		const listOfPosts: Post[] = this.postService.getPosts();

		//send list of post to backend
		this.http.put('https://live-posts-24b51-default-rtdb.firebaseio.com/posts.json',
		listOfPosts).subscribe( (res) => {
			console.log(res)
		});
	}

	
	// functionlity 2 -fetch data
	fetchData() {
		// step 1 - Get the data from the backend
		this.http
		.get<Post[]>(
			'https://live-posts-24b51-default-rtdb.firebaseio.com/posts.json')
		.pipe(
			tap((listOfPosts: Post[]) => {
				console.log(listOfPosts);

				// step 2 - send data to post service
				this.postService.setPosts(listOfPosts);
			})
		)
		.subscribe()
	}
	
}