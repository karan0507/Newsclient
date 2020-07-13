import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsPostService } from 'src/app/adminService/news-post.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings_categories: FormGroup;
  settings_tags:FormGroup;
  tagsDeleteId; 
  categoriesDeleteId;
  tags;
  categories;
  constructor(private newsdb: NewsPostService, private fb: FormBuilder, private toastr: ToastrService) {
    this.settings_categories = this.fb.group({
      categories_name: ['', [Validators.required]],
      categories_desc: ['', [Validators.required]]
    });

    this.settings_tags = this.fb.group({
      tags_name: ['', [Validators.required]],
      tags_desc: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
  }


  getTags(){
    this.newsdb.getTags().subscribe(res => {
      this.tags = res;
    });
  }

  setCategoryDeleteId(cid) {
    this.categoriesDeleteId = cid;
  }

  setTagsDeleteId(tid) {
    this.tagsDeleteId = tid;
  }

  deleteTags() {
    console.log(this.tagsDeleteId);
    this.newsdb.deleteTags(this.tagsDeleteId).subscribe(res => {
      console.log(res);

    }, (error) => {
      alert('error while delete tags');
    },
    () => {
      this.getTags();
    }
     );
  }

  editTags() {

  }

  getCategories() {
    this.newsdb.getCategories().subscribe(res => {
      this.categories = res;
    });
  }


  deleteCategories() {
    // console.log(id);
    console.log('delete categories ');
    this.newsdb.deleteCategory(this.categoriesDeleteId).subscribe(res => {
      console.log(res);

    }, (error) => {
      console.log(error);
      alert('error while delete tags');
    },
    () => {
      this.getCategories();
    }
     );

  }

  editCategories() {

  }


  createTags(){
      return this.newsdb.postTags(this.settings_tags.value).subscribe(res => {
      console.log(res);
      this.getTags();
    },
    (error) => {
      this.toastr.error('Could not create tags, No empty tags allowed', 'Invalid Entry');
    },
    () => {
      this.toastr.success('Tags is created sucessfully', 'Tags Added');
    });
  }

  createCategories(){
    return this.newsdb.postCategories(this.settings_categories.value).subscribe(res => {
    console.log(res);
    this.getCategories();
  },
  (error) => {
    this.toastr.error('Could not create category, No empty category allowed', 'Invalid Entry');
  },
  () => {
    this.toastr.success('Category is created sucessfully', 'Category Added');
  });
}
}
