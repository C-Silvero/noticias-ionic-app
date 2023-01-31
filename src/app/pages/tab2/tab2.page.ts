import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = [ 'business', 'entertainment', 'general', 'health', 'science' , 'sports' , 'technology']

  public articles: Article[] = [];

  public selectedCategory: string = this.categories[0]



  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.newsService.obtenerCategoria(this.selectedCategory).subscribe(
      articles => this.articles = [...articles]
    )
  }

  segmentChanged( event: Event){
    this.selectedCategory =  (event as CustomEvent).detail.value;
    this.newsService.obtenerCategoria(this.selectedCategory).subscribe(
      articles => this.articles = [...articles]
    )
  }

  loadData( event : any) {
    this.newsService.obtenerCategoria(this.selectedCategory, true).subscribe(
      articles => {

        if(articles.length === this.articles.length) {
          event.taget.disabled = true;
          return
        }

        this.articles = articles
        event.target.complete();
      }
    )
  }
}
