import { RouterModule } from "@angular/router";


export const RouterModuleForChild = RouterModule.forChild([
  {
    path: '',
    loadChildren: () => import('../main-views/user/user.module').then(m => m.UserModule),

  },
])