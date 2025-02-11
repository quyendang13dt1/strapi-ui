import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: 'list',
        component: ArticleListComponent
    },
    {
        path: 'detail',
        component: ArticleDetailComponent
    },
    // {
    //     path: '**',
    //     redirectTo: '',
    //     pathMatch: 'full',
    // },
];
