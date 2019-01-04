import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser/src/browser/title';
import {Post} from '../post.model';
import {Input} from '@angular/core';
import {PostsService} from '../post.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector : 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: [ './post-list.component.css']
})
export class PostListComponent implements OnInit {
// posts = [
//     {title : 'Firstpost', content: 'first'},
//     {title : 'Secondpost', content: 'second'},
//     {title : 'thirdpost', content: 'third'}

// ]

 @Input() posts: Post[]  = [];

 constructor(public postsService: PostsService){}
ngOnInit(){
    this.posts= this.postsService.getpost();s
}
}