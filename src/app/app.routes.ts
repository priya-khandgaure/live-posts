import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';

import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
	{
		path:'',
		redirectTo: '/post-list',
		pathMatch: 'full',
	},
	{
		path:'post-list',
		component: PostListComponent
	},
	{
		path:'auth',
		component: AuthComponent
	},
	{
		path:'add-post',
		component: PostEditComponent
	},
	{
		path:'edit-post/:index',
		component: PostEditComponent
	},
];

