import { Component, OnInit } from '@angular/core';
import { NewsPostService } from 'src/app/adminService/news-post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchText;
  posts: Array<any> = [];
  postCount: any;
  constructor(private postdb: NewsPostService) { }
  
  ngOnInit(): void {
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

  }
}
