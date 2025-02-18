import { Routes } from '@angular/router';
import { KnowledgeHubComponent } from './knowledge-hub/knowledge-hub.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'knowledge-hub', pathMatch: 'full' },
  { path: 'knowledge-hub', component: KnowledgeHubComponent },
  { path: 'list', component: ArticleListComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
];
