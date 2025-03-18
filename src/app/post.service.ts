import { EventEmitter, Injectable } from "@angular/core";
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  listChangedEvent: EventEmitter<Post[]> = new EventEmitter();
	listOfPost: Post[] = [];

  getPosts(){
  	return this.listOfPost;
  }

  deletePost(index: number){
  	this.listOfPost.splice(index,1);
    this.listChangedEvent.emit(this.listOfPost);
  }

  addPost(post: Post){
  	this.listOfPost.push(post);
    this.listChangedEvent.emit(this.listOfPost);
  }

  updatePost(index: number, post:Post){
  	this.listOfPost[index] = post;
    this.listChangedEvent.emit(this.listOfPost);
  }

  getPostById(index: number){
    return this.listOfPost[index];
  }

  likePost(index: number){
    this.listOfPost[index].numberOfLikes +=1;
    this.listChangedEvent.emit(this.listOfPost);
  }

  setPosts(listOfPost: Post[]){
    this.listOfPost = listOfPost;
    this.listChangedEvent.emit(this.listOfPost);
  }

}