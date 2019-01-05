import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser/src/browser/title';
import {Post} from '../post.model';
import {Input} from '@angular/core';
import {PostsService} from '../post.service';
import { OnInit,OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import {Subscription} from 'rxjs';
@Component({
    selector : 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: [ './post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
// posts = [
//     {title : 'Firstpost', content: 'first'},
//     {title : 'Secondpost', content: 'second'},
//     {title : 'thirdpost', content: 'third'}

// ]

posts: Post[]  = [];

private Postssub: Subscription;
 constructor(public postsService: PostsService){}
ngOnInit() {
   this.postsService.getpost();
    this.Postssub = this.postsService.getpostupdatelistener().subscribe((posts: Post []) => {
this.posts = posts ;
    });
}
OnDelete(postId:string){
    this.postsService.deletepost(postId);

}
ngOnDestroy(){
this.Postssub.unsubscribe()
}
}