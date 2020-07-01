import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NewsPostService } from 'src/app/adminService/news-post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts;
  news: FormGroup;
  filedata: any;
  filename = 'Choose an image file';
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
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
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

  constructor(private fb: FormBuilder, private postdb: NewsPostService) { 
    this.news = this.fb.group({
      headline: ['', [Validators.required]],
      editor_name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      post_content: ['', [Validators.required]],
      photo_url_string: ['sdad'],
      photo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  fileEvent(event){
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
      this.filename = file.name;
      this.news.get('photo').setValue(file, {emitModelToViewChange: false});
    }
    }
  createPost() {
    // console.log(t)
    const formData = new FormData();
    formData.append('image', this.news.get('photo').value);
    formData.append('headline', this.news.get('headline').value);
    formData.append('editor_name', this.news.get('editor_name').value);
    formData.append('subject', this.news.get('subject').value);
    formData.append('post_content', this.news.get('post_content').value);
    formData.append('photo_url_string', this.news.get('photo_url_string').value);
    this.postdb.setPosts(formData).subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }
}
