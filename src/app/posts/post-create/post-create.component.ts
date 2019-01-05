import { Component } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {PostsService} from '../post.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector : 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: [ './post-create.component.css']

})
export class PostCreasteComponent  {
    EnteredContent = ' ';
    EnteredTitle = '';


constructor(public postsService: PostsService){}





    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        // what the NgForm does over here is validate the form as well as gives information regarding the values present in the form.
const post: Post = {
        title: form.value.title,
    content: form.value.content,
    id:form.value.id
}
    this.postsService.addpost(form.value.title, form.value.content)    
    // to remove the existing values form the form
    form.resetForm()
}
}

