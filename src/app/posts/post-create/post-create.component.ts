import { Component } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {PostsService} from '../post.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
    selector : 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: [ './post-create.component.css']

})
export class PostCreasteComponent implements OnInit {
    EnteredContent = ' ';
    EnteredTitle = '';
    private mode = 'create';
    private postId: string;
    post: Post;
    isloading=false

// activated route- object contains iformation about the routes which we are currently on
constructor(public postsService: PostsService,
     public route: ActivatedRoute){}

ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        // this decides which which route we are in and also wheter we came to the this route by clicking edit button or create
if (paramMap.has('postId')){
this.mode = 'edit'
// here the post id equal to the postid
this.postId=paramMap.get('postId')

this.isloading= true;
this.postsService.getPost(this.postId).subscribe(postData=>{
    this.isloading= false;
    this.post={id:postData._id, title:postData.title, content:postData.content}
})
console.log(this.postId)


} else{
    this.mode = 'create';
    // while here it will be null as post doesnt have id as it is being created
    this.postId= null;

}
    });
}

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isloading=true
        if (this.mode==='create'){
            this.postsService.addpost(form.value.title, form.value.content)

        }else{
            this.postsService.postUpdated(this.postId,form.value.title, form.value.content)
        }
        // what the NgForm does over here is validate the form as well as gives information regarding the values present in the form.
const post: Post = {
        title: form.value.title,
    content: form.value.content,
    id: form.value.id
}
    // to remove the existing values form the form
    form.resetForm();
}
}

