import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { KnowledgeHubComponent } from './knowledge-hub/knowledge-hub.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'knowledge-hub',
    pathMatch: 'full',
  },
  {
    path: 'knowledge-hub',
    component: KnowledgeHubComponent,
  },
  {
    path: 'list',
    component: ArticleListComponent,
  },
  {
    path: 'detail/:id',
    component: ArticleDetailComponent,
  },
  // {
  //     path: '**',
  //     redirectTo: '',
  //     pathMatch: 'full',
  // },
];
