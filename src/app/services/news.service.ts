import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, ArticlesByCategory, NewsResponse } from '../models';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators'


const apiKey = environment.apiKey
const apiUrl = environment.apiUrl


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private ArticlesByCategory: ArticlesByCategory = {

  }

  constructor( 
    private http: HttpClient
    ) 
  { 

  }

  private ejecutarQuery<T>(endpoint: string){
    return this.http.get<T>(`${apiUrl}${endpoint}${apiKey}`)
  }

  obtenerTitulares(): Observable<Article[]>{
   return this.ejecutarQuery<NewsResponse>(`/top-headlines?country=us&category=business&apiKey=`).pipe(
    map( ({articles}) => articles )
   )
  }

  obtenerCategoria( category: string, loadMore: boolean = false ): Observable<Article[]>{

    if ( loadMore ) {
     return this.getArticlesByCategory(category)
    }

    if ( this.ArticlesByCategory[category]){
      return of(this.ArticlesByCategory[category].articles)
    }

    return this.getArticlesByCategory(category)

  }

  private getArticlesByCategory(category : string): Observable<Article[]> {
    if (Object.keys(this.ArticlesByCategory).includes(category) ){
    
    } else {
      this.ArticlesByCategory[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.ArticlesByCategory[category].page + 1; 

    return this.ejecutarQuery<NewsResponse>(`/top-headlines?country=us&category=${category}&page=${page}&apiKey=`).pipe(
      map( ({articles}) => {
        if (articles.length === 0) return [];

        this.ArticlesByCategory[category] = {
          page,
          articles : [...this.ArticlesByCategory[category].articles, ...articles]
        }
        return this.ArticlesByCategory[category].articles
      })
    )

  }

  addFavorites( articulo: Article[] ){
    this.http.post(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=972d636420094e229c8ecd9a6ab00bad`, articulo, { 
      headers: new HttpHeaders({
      'content-type': 'application/json',
      'encoding': 'UTF-8'
    })
  }).subscribe(console.log)
  }


}
