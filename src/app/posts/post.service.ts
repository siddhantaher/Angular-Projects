import {Post} from '../posts/post.model';
import { container, updateBinding } from '@angular/core/src/render3/instructions';
import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser/src/browser/title';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';



@Injectable({providedIn: 'root'})
export class PostsService {
   private posts: Post [] = [];
   private postsUpdated = new Subject<Post[]>();

   constructor(private http: HttpClient, private router: Router){}
//    So to make a true copy of the posts, I will use a typescript and next gen javascript feature called the spread

//    operator,
   
//    I add square brackets to create a new array and then three dots to take all the elements of another
   
//    array,
   
//    the posts array here, pull them out of that array and add them to this new array.
   
//    So I'm creating a new array with the old objects and therefore this array has been copied. Important, 
//    getpost() {
//        return [...this.posts];
//    }

// using httpclient
getpost() {
    // we use pipe to tranform the response. Heres the first map operator gets the actual data from the service and
    //  then we extract the information needed. and the second map operator converts the data we want to show in the client side
this.http.get<{message:string, posts: any }>('http://localhost:3000/api/posts').pipe(map((postData)=>{
    return postData.posts.map(post=>{
        return {
            title: post.title,
            content: post.content,
            id: post._id
        }
    })

}))
.subscribe((tranformedPost)=>{
console.log(tranformedPost)
    this.posts = tranformedPost;
    this.postsUpdated.next([...this.posts]);
});
}

getpostupdatelistener(){
    return this.postsUpdated.asObservable();
}
getPost(id:string){
    return this.http.get<{_id:string,title:string, content:string}>('http://localhost:3000/api/posts/'+ id)
}


postUpdated(id: string, title: string, content: string){
    const post : Post={id:id,title:title,content:content}
    this.http.put('http://localhost:3000/api/posts/'+ id, post).subscribe(response=>{
    const updatedPost=[...this.posts]
    const oldpostindex=updatedPost.findIndex(p=>p.id===post.id)
    updatedPost[oldpostindex]= post;
    this.posts=updatedPost;
    this.postsUpdated.next([...this.posts])
    this.router.navigate(["/"])
})

}
addpost(title: string, content: string) {
    const post: Post = {id: null,title: title , content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
    const id= responseData.postId;
    post.id = id;
    this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"])

    })
  
}

deletepost(postId:string){
    this.http.delete('http://localhost:3000/api/posts/'+ postId )
    .subscribe(() => {
        // updating Ui after delting the post
        // first line filter out the post
        // secod one update the posts to the updatd one
        // an the third line will add updatetedpost to the postupdated
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts])

    });
};

}
