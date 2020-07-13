import { Component, OnInit } from '@angular/core';
import { NewsPostService } from 'src/app/adminService/news-post.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // posts: any;
  mymodel = [];
  news: FormGroup;
  filedata: any;
  filename = 'Choose an image file';
  // statuscontrol;
  status = [{ status: 'active' }, { status: 'draft' }];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '600',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  postTypes;
  dropdownList = [];
  selectedItems: Array<any> = [];
  dropdownSettings = {};
  categories: any;
  searchText;
  posts: Array<any> = [];
  postCount: any;
  constructor(private postdb: NewsPostService, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.news = this.fb.group({
      headline: ['', [Validators.required]],
      editor_name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      post_content: ['', [Validators.required]],
      photo_url_string: ['sdad'],
      photo: ['', [Validators.required]],
      categories: ['', [Validators.required]],
      status: ['', [Validators.required]],
      tags: ['', Validators.required],
      post_type: ['', [Validators.required]]
    });
    this.getPosts();
    this.getPostsCount();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
  getPosts() {
    this.postdb.getPosts().subscribe(posts => {
      console.log('this is post data', posts);
      this.posts = posts;
    });
  }

  getPostsCount() {
    this.postdb.getPostCount().subscribe(res => {
      console.log(res);
      this.postCount = res;
    });
  }
  edit() {

  }

  delete() {
    console.log('delete clicked');
  }


  createPost() {

  }

  onStatus() {

  }
  
  onCategories(event) {

  }
  fileEvent(event) {

  }
}
