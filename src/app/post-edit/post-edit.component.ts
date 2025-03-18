import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css'
})

export class PostEditComponent implements OnInit {
  form!: FormGroup;
  index: number = 0;
  editMode = false;
  selectedImage: string | ArrayBuffer | null = '';

   constructor(
    private postService: PostService,
    private backEndService: BackEndService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let title = '';
    let description = '';
    let imagePath = '';

    this.route.params.subscribe((params: Params) => {
      if (params['index']) {
        console.log('Post ID ====' + params['index']);
        this.index = params['index'];
        const post = this.postService.getPostById(this.index);

        title = post.title;
        description = post.description;
        imagePath = post.imagePath;

        this.selectedImage = imagePath;
        this.editMode = true;
      }
    });

    this.form = new FormGroup({
      title: new FormControl(title, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      description: new FormControl(description, [Validators.required, Validators.minLength(10)]),
      imagePath: new FormControl(imagePath),
    });
  }

  // Handle image selection
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Convert image to Base64
        this.form.patchValue({ imagePath: reader.result }); // Store in form
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const title = this.form.value.title;
      const description = this.form.value.description;
      const imagePath = this.form.value.imagePath;

      const post: Post = new Post(title, description, imagePath, 'Priya', new Date(), 0);

      if (this.editMode) {
        this.postService.updatePost(this.index, post);
      } else {
        this.postService.addPost(post);
      }
      // Call Save to Database
      this.backEndService.saveData(); 

      // Navigate to post list after saving
      this.router.navigate(["./post-list"]);
    } else {
      console.log(this.form);
      console.log('Form is invalid');
    }
  }
}
