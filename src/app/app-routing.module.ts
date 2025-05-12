import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedComponent } from './core/components/not-authorized/not-authorized.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Roles } from './shared/models/roles';
import { ConnectedUserResolverService } from './shared/services/auth/connected-user-resolver.service';

const routes: Routes = [
  {path: "",
    loadChildren: () => import('./core/core.module').then(m =>m.CoreModule),
    //canActivate: [AuthGuard],
    data : {
      roles : [Roles.Editeur]
    }
  },
  {
    path: "agenda",
    loadChildren: () => import('./features/agenda/agenda.module').then(m =>m.AgendaModule),
    canActivate: [AuthGuard],
    data : {
      roles : [Roles.Editeur]
    }
  },
  {
    path: "ambassadeur-de-campagne",
    loadChildren: () => import('./features/ambassador/ambassador.module').then(m =>m.AmbassadorModule),
    canActivate: [AuthGuard],
    data : {
      roles : [Roles.Editeur]
    }
  },
  {
    path: "articles",
    loadChildren: () => import('./features/articles/articles.module').then(m =>m.ArticlesModule),
    canActivate: [AuthGuard],
    data : {
      roles : [Roles.Editeur]
    },
    resolve : { user : ConnectedUserResolverService}
  },
  {
    path: "changer-mot-de-passe", 
    loadChildren: () => import('./features/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: "mot-de-passe-oublie", 
    loadChildren: () => import('./features/init-reset-password/init-reset-password.module').then(m => m.InitResetPasswordModule)
  },
  {
    path: "non-autorise", 
    component : NotAuthorizedComponent
  },
  {
    path: "replays",
    loadChildren: () => import('./features/replay/replay.module').then(m =>m.ReplayModule),
    canActivate: [AuthGuard],
    data : {
      roles : [Roles.Editeur]
    }
  },
  {
    path: "se-connecter",
    loadChildren: () => import('./features/login/login.module').then(m =>m.LoginModule),
  },
  {
    path: "utilisateurs",
    loadChildren: () => import('./features/users/users.module').then(m =>m.UsersModule),
    canActivate: [AuthGuard],
    data : {
      roles : [Roles.Admin]
    }
  },
  {
    path: "valider-email",
    loadChildren: () => import('./features/validate-account/validate-account.module').then(m =>m.ValidateAccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
