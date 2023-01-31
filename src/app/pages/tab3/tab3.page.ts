import { Component } from '@angular/core';
import { Article } from 'src/app/models';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  get articles(): Article[] {
    return this.favoriteService.getLocalArticles;
  }

  constructor(
    private favoriteService: FavoriteService
  ) {}

}
