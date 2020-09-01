import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NewsPostService } from 'src/app/adminService/news-post.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts;
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
    translate: 'no',
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

   
    // uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };



  config2: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: true,
    toolbarPosition: 'bottom',
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    defaultParagraphSeparator: 'p',
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
    ]
  };

  selectedCategoryId = 1;
  selectedTags = [];
  selectedStatus;
  dropdownList = [];
  selectedItems: Array<any> = [];
  dropdownSettings = {};
  categories: any;
  recentIsChecked;
  bannerIsChecked;




  postTypes = [{post_type: 'Level 1'}, {post_type: 'Level 2'}, {post_type: 'Level 3'}, {post_type: 'normal'}];
  constructor(private fb: FormBuilder, private postdb: NewsPostService, private toastr: ToastrService) {
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
      // recentIsChecked: ['', [Validators.required]],
      // bannerIsChecked: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.bannerIsChecked);
    if ( sessionStorage.getItem('form') !== null){
    this.news.setValue(JSON.parse(sessionStorage.getItem('form')));
    }
    this.news.valueChanges.subscribe(form => {
      console.log(form);
      sessionStorage.setItem('form', JSON.stringify(form));
    });
    this.getCategories();
    this.getTags();
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'tags_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    // this.onStatus();
  }

  recentselect() {
    console.log('0');
  }

  bannerselect() {
    console.log('0');
  }

  onCategories(value) {
    console.log(value);

  }
  onItemSelect(item: any) {

  

  }


  onChange2(event) {
    console.log('changed', event);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onStatus() {
    console.log('status');
  }
  fileEvent(event) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
      this.filename = file.name;
      this.news.get('photo').setValue(file, { emitModelToViewChange: false });
    }
  }


  createPost() {
    this.news.get('tags').value.map(res => {
      this.selectedTags.push(res.id);
      console.log(this.selectedTags);
    });
    const formData = new FormData();
    formData.append('image', this.news.get('photo').value);
    formData.append('headline', this.news.get('headline').value);
    formData.append('editor_name', this.news.get('editor_name').value);
    formData.append('subject', this.news.get('subject').value);
    formData.append('post_content', this.news.get('post_content').value);
    // formData.append('photo_url_string', this.news.get('photo_url_string').value);
    formData.append('categories_id', this.news.get('categories').value);
    formData.append('status', this.news.get('status').value);
    formData.append('tags_id', JSON.stringify(this.selectedTags));
    formData.append('post_type', this.news.get('post_type').value);
    // recent_post_is_true
    // big_banner_is_true
    formData.append('big_banner_is_true', '0');
    formData.append('recent_post_is_true', '1');
    this.postdb.setPosts(formData).subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    }, (error) => {
        console.log(error);
        this.toastr.error('Please complete the form', 'Incomplete');
    }, () => {
        this.toastr.success('Post Created Successfully', 'New Post Addded');
        this.news.reset();
    });
  }

  getCategories() {
    this.postdb.getCategories().subscribe(res => {
      console.log(res);
      this.categories = res;
    });
  }

  getTags() {
    this.postdb.getTags().subscribe(res => {
      console.log();
      this.dropdownList = res;
    });
  }

  deleteSession() {
    sessionStorage.removeItem('form');
    this.news.reset();
  }
}
