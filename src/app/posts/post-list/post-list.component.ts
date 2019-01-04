import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser/src/browser/title';




@Component({
    selector : 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: [ './post-list.component.css']
})
export class PostListComponent {
posts = [
    {title : 'Firstpost', content: 'first'},
    {title : 'Secondpost', content: 'second'},
    {title : 'thirdpost', content: 'third'}

]
}