import { Component, OnInit } from '@angular/core';
import { NewsPostService } from 'src/app/adminService/news-post.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  postTypes = [{post_type: 'Level 1'}, {post_type: 'Level 2'}, {post_type: 'Level 3'}, {post_type: 'normal'}];

  dropdownList = [];
  selectedItems: Array<any> = [];
  dropdownSettings = {};
  categories: any;
  searchText;
  posts: Array<any> = [];
  postCount: any;
  selectedPost: any;
  postData: any;
  tags: any;
  photourl: any;
  constructor(private postdb: NewsPostService, private fb: FormBuilder,  private toastr: ToastrService) { }
  
  ngOnInit(): void {
    
    this.news = this.fb.group({
      headline: ['', [Validators.required]],
      editor_name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      post_content: ['', [Validators.required]],
      // photo_url_string: ['sdad'],
      photo: ['', [Validators.required]],
      categories: ['', [Validators.required]],
      status: ['', [Validators.required]],
      tags: ['', Validators.required],
      post_type: ['', [Validators.required]]
    });
    console.log(this.news.value);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'tags_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getPosts();
    this.getPostsCount();
    this.getCategories();
    this.getTags();
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

  getPostById(id) {
    this.postdb.getPostById(id).subscribe(res => {
      console.log('get Post by Id', res);
      // console.log(res.);
      this.photourl = res.photo_url_string;
      this.getCategoriesById(res.categories_id, res);
      // this.news.setValue(Object.assign(res, {photo: 'invalid'}));
    });
  }
  getCategoriesById(catid, postdata) {
    this.postdb.getCategoriesById(catid).subscribe(res => {
      const postdatav  = {editor_name: postdata.editor_name, headline: postdata.headline,
                          post_content: postdata.post_content, post_type: postdata.post_type ,
                          status: postdata.status, subject: postdata.subject,  tags: JSON.parse(postdata.tags_id)
                        };
      // this.photourl = postdata;
      console.log(res.categories_name);
      this.news.patchValue(Object.assign(postdatav, {photo: '', categories: res.id}));
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

  deletePost(id) {
    this.selectedPost = id;
    console.log('delete clicked');
  }

  setPostId(id) {
    console.log(id);
    this.selectedPost = id;
    this.getPostById(id);
  }

  updatePost() {
    this.postdb.updatePost(this.selectedPost, this.news.value).subscribe(res => {
      console.log(res);
    });
  }

  createPost() {

  }

  onStatus() {

  }

  getCategories() {
    this.postdb.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  getTags() {
    this.postdb.getTags().subscribe(res => {
      console.log(res);
      this.dropdownList = res;
    });
  }
  
  onCategories(event) {

  }
  fileEvent(event) {

  }

  confirmDelete() {
    console.log(this.selectedPost);
    this.postdb.deletePost(this.selectedPost).subscribe(res => {
      console.log(res);
    }, (error) => {
        alert(error);
    }, () => {
      this.toastr.success('Post Deleted', 'Successfully Deleted');
    });
  }
}
