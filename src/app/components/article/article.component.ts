import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article!: Article;
  @Input() index!: number;
  @Input() likes!: Article;

  constructor(
    private newSerive: NewsService,
    private favoriteService: FavoriteService,
    private actionSheet: ActionSheetController
  ) { }

  ngOnInit() {}

  async openMenu(){
    
    const actionSheet = await this.actionSheet.create({
      header: 'Opciones',
      buttons:[
        {
          text: 'Agregar a Favoritos',
          icon: 'heart-outline',
          handler: () => this.addFavorite()
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    })

    await actionSheet.present()

  }

  addFavorite(){
    this.favoriteService.saveRemoveArticle(this.article)
  }

}
