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
  constructor(private postdb: NewsPostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postdb.getPosts().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }
}
