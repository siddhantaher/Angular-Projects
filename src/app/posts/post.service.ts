import {Post} from '../posts/post.model';
import { container } from '@angular/core/src/render3/instructions';
import { Injectable } from '@angular/core';




@Injectable({providedIn: 'root'})
export class PostsService {
   private posts: Post [];
//    So to make a true copy of the posts, I will use a typescript and next gen javascript feature called the spread

//    operator,
   
//    I add square brackets to create a new array and then three dots to take all the elements of another
   
//    array,
   
//    the posts array here, pull them out of that array and add them to this new array.
   
//    So I'm creating a new array with the old objects and therefore this array has been copied. Important, 
   getpost() {
       return [...this.posts];
   }

addpost(title: string, content: string) {
    const post: Post = {title: title , content: content};
    this.posts.push(post);
}
};
