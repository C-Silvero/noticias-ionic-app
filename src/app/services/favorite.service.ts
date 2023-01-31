import { Injectable } from '@angular/core';
import { Article } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favorites: Article[] = [];

  constructor( ) { 

  }


  get getLocalArticles() {
    return [ ...this.favorites ]
  }

  // articulos favoritos
  articleInFavorites( article: Article ) {
    return !!this.favorites.find( localArticle => localArticle.title === article.title );
  }
  
  // si el articulo existe no acumularlo y si no existe guardarlo
  async saveRemoveArticle( article: Article ) {

    const exists = this.favorites.find( favorite => favorite.title === article.title );

    if ( exists ) {
      this.favorites = this.favorites.filter( favorite => favorite.title !== article.title );
    } else {
      this.favorites = [ article, ...this.favorites];
    }
    
  }



}
