import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsPostService } from 'src/app/adminService/news-post.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as uikit from 'uikit';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings_categories: FormGroup;
  settings_tags: FormGroup;
  settings_update_tags: FormGroup;
  settings_update_categories: FormGroup;
  tagsDeleteId;
  categoriesDeleteId;
  tags;
  categories;
  tagsUpdateId: any;
  tagid: any;
  categoriesUpdateId: any;
  categoryById: any;
  constructor(private newsdb: NewsPostService, private fb: FormBuilder, private toastr: ToastrService) {
    this.settings_categories = this.fb.group({
      categories_name: ['', [Validators.required]],
      categories_desc: ['', [Validators.required]]
    });

    this.settings_update_categories = this.fb.group({
      categories_name: ['', [Validators.required]],
      categories_desc: ['', [Validators.required]]
    });

    this.settings_tags = this.fb.group({
      tags_name: ['', [Validators.required]],
      tags_desc: ['', [Validators.required]]
    });

    this.settings_update_tags = this.fb.group({
      tags_name: ['', [Validators.required]],
      tags_desc: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
  }

  createTags() {
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

  getTags() {
    this.newsdb.getTags().subscribe(res => {
      this.tags = res;
    });
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
    this.newsdb.updateTags(this.tagsUpdateId, this.settings_update_tags.value).subscribe(res => {
      console.log(res);
      this.toastr.success('Successfully  Updated', res);
      this.getTags();
      uikit.offcanvas('#tags-uk').hide();
    }, (error) => {
      this.toastr.error(error, 'Could not update');
      console.log(error);
    });
  }

  setTagsDeleteId(tid) {
    this.tagsDeleteId = tid;
  }
  setTagsEditId(id) {
    this.tagsUpdateId = id;
    this.getTagById(id);
  }

  getTagById(id) {
    this.newsdb.getTagsById(id).subscribe(res => {
      console.log(res);
      this.settings_update_tags.setValue({
        'tags_name': res.tags_name,
        'tags_desc': res.tags_desc
      });
      this.tagid = res;
    });
  }


 
  createCategories() {
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



editCategories() {
  this.newsdb.updateCategory(this.categoriesUpdateId, this.settings_update_categories.value).subscribe(res => {
    console.log(res);
    this.toastr.success('Successfully  Updated', res);
    this.getCategories();
    uikit.offcanvas('#categories-uk').hide();
  }, (error) => {
    this.toastr.error(error, 'Could not update');
    console.log(error);
  })
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

 setCategoryDeleteId(cid) {
  this.categoriesDeleteId = cid;
}

setCategoriesEditId(id) {
  this.categoriesUpdateId = id;
  this.getCategoriesById(id);
}

getCategoriesById(id) {
  this.newsdb.getCategoriesById(id).subscribe(res => {
    console.log(res);
    this.settings_update_categories.setValue({
      'categories_name': res.categories_name,
      'categories_desc': res.categories_desc
    });
    this.categoryById = res;
  });
}


}