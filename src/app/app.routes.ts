import { Routes } from '@angular/router';

import { ProcessState } from './core/enums/process-state.enum';

/*
import { GroupType } from './core/enums/group-type.enum';
import { authGuard } from './core/guards/auth.guard';

*/

export const routes: Routes = [
    {
        path: "blog",
        children: [
            {
                path: "rubriques",
                children: [
                    {
                        path: "creer",
                        loadComponent: () => import('./features/blog/rubrics/rubric-add-edit-container/article-rubric-add-edit-container.component').then(m => m.ArticleRubricAddEditContainerComponent),
                        data: {
                            processState: ProcessState.Create,
                        }
                    },
                    {
                        path: "modifier/:id",
                        loadComponent: () => import('./features/blog/rubrics/rubric-add-edit-container/article-rubric-add-edit-container.component').then(m => m.ArticleRubricAddEditContainerComponent),
                        data: {
                            processState: ProcessState.Edit,
                        }
                    },
                    {
                        path: '',
                        loadComponent: () => import("./features/blog/rubrics/rubric-list-container/rubric-list-container.component").then(m => m.ArticleRubricListContainerComponent)
                    }
                ]

            },
            {
                path: "articles",
                children: [
                    {
                        path: "creer",
                        loadComponent: () => import('./features/blog/articles/article-add-edit-container/article-add-edit-container.component').then(m => m.ArticleAddEditContainerComponent),
                        data: {
                            processState: ProcessState.Create,
                        }
                    },
                    {
                        path: "modifier/:id",
                        loadComponent: () => import('./features/blog/articles/article-add-edit-container/article-add-edit-container.component').then(m => m.ArticleAddEditContainerComponent),
                        data: {
                            processState: ProcessState.Edit,
                        }
                    },
                    {
                        path: '',
                        loadComponent: () => import('./features/blog/articles/article-list-container/article-list-container.component').then(m => m.ArticleListContainerComponent),
                    }
                ]
            }
        ]
    },

    {
        path: "evenements",
        children: [
            {
                path: '',
                loadComponent: () => import('./features/planner/planner-list-container/planner-list-container.component').then(m => m.PlannerListContainerComponent)
            },
            {
                path: "creer",
                loadComponent: () => import('./features/planner/planner-add-edit-container/planner-add-edit-container.component').then(m => m.PlannerAddEditContainerComponent),
                data: {
                    processState: ProcessState.Create,
                }
            },
            {
                path: "modifier/:id",
                loadComponent: () => import('./features/planner/planner-add-edit-container/planner-add-edit-container.component').then(m => m.PlannerAddEditContainerComponent),
                data: {
                    processState: ProcessState.Edit,
                }
            }
        ]
    },
    {
        path: "numeros",
        //canActivate: [authGuard],
        loadComponent: () => import('./features/phone-register/phone-register.component').then(m => m.PhoneRegisterComponent)
    },
    {
        path: "tableau-de-board",
        //canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard-container/dashboard-container.component').then(m => m.DashboardContainerComponent)
    },
    {
        path: "temoignages",
        //canActivate: [authGuard],
        children: [
            {
                path: "",
                loadComponent: () => import('./features/testimonies/testimonies-list-container/testimonies-list-container.component').then(m => m.TestimoniesListContainerComponent)
            },
            {
                path: "creer",
                data: {
                    processState: ProcessState.Create,
                },
                loadComponent: () => import('./features/testimonies/testimony-add-edit-container/testimony-add-edit-container.component').then(m => m.TestimonyAddEditContainerComponent)
            },
            {
                path: "modifier/:id",
                data: {
                    processState: ProcessState.Edit,
                },
                loadComponent: () => import('./features/testimonies/testimony-add-edit-container/testimony-add-edit-container.component').then(m => m.TestimonyAddEditContainerComponent)
            }
        ]
    },
    /*
        
        {
            path: "se-connecter",
            loadComponent : () => import('./features/feature-login/pages/page-login-container/page-login-container.component').then(m => m.PageLoginContainerComponent)
        },
        {
            path: "changer-mot-de-passe",
            loadComponent : () => import("./features/feature-login/pages/page-reset-password-container/page-reset-password-container.component").then(m => m.PageResetPasswordContainerComponent)
        },
        {
            path: "adherents",
            canActivate: [authGuard],
            children: [
                {
                    path: "demandes/:id",
                    loadComponent: ()=> import('./features/feature-subscriber/pages/subscriber-request/page-subscriber-request-view-container/page-subscriber-request-view-container.component').then(m => m.PageSubscriberRequestViewContainerComponent)
                },
                {
                    path: "demandes",
                    loadComponent: ()=> import('./features/feature-subscriber/pages/subscriber-request/page-subscribing-request-container/page-subscribing-request-container.component').then(m => m.PageSubscribingRequestContainerComponent)
                },
                {
                    path: 'creer',
                    data : {
                        processState : ProcessState.Create,
                    },
                    loadComponent: () => import("./features/feature-subscriber/pages/subscriber/page-add-edit-subscriber-container/page-add-edit-subscriber-container.component").then(m => m.PageAddEditSubscriberContainerComponent)
                },
                {
                    path: 'modifier/:id',
                    data : {
                        processState : ProcessState.Edit,
                    },
                    loadComponent: () => import("./features/feature-subscriber/pages/subscriber/page-add-edit-subscriber-container/page-add-edit-subscriber-container.component").then(m => m.PageAddEditSubscriberContainerComponent)
                },
                {
                    path: ":id",
                    loadComponent: ()=> import('./features/feature-subscriber/pages/subscriber/page-subscriber-view-container/page-subscriber-view.component-container').then(m => m.PageSubscriberViewComponentContainer)
                },
                {
                    path: "",
                    loadComponent: () => import("./features/feature-subscriber/pages/subscriber/page-subscriber-list-container/page-subscriber-list-container.component").then(m => m.PageSubscriberListContainerComponent)
                }
            ]
        },
        {
            path: "blog",
            canActivate: [authGuard],
            children: [
                {
                    path: "rubriques",
                    children: [
                        {
                            path:"modifier/:id",
                            data : {
                                processState : ProcessState.Edit,
                            },
                            loadComponent : () =>import('./features/feature-blog/rubric/pages/article-rubric-add-edit-container/article-rubric-add-edit-container.component').then(m => m.ArticleRubricAddEditContainerComponent)
                        },
                        {
                            path:"creer",
                            data : {
                                processState : ProcessState.Create,
                            },
                            loadComponent : () =>import('./features/feature-blog/rubric/pages/article-rubric-add-edit-container/article-rubric-add-edit-container.component').then(m => m.ArticleRubricAddEditContainerComponent)
                        },
                        {
                            path:"",
                            loadComponent : () =>import('./features/feature-blog/rubric/pages/article-rubric-list-container/article-rubric-list-container.component').then(m => m.ArticleRubricListContainerComponent)
                        }
                    ]
                },
                {
                    path: "articles",
                    children: [
                        {
                            path:"modifier/:id",
                            data : {
                                processState : ProcessState.Edit,
                            },
                            loadComponent : () =>import('./features/feature-blog/article/pages/article-add-edit-container/article-add-edit-container.component').then(m => m.ArticleAddEditContainerComponent)
                        },
                        {
                            path:"creer",
                            data : {
                                processState : ProcessState.Create,
                            },
                            loadComponent : () =>import('./features/feature-blog/article/pages/article-add-edit-container/article-add-edit-container.component').then(m => m.ArticleAddEditContainerComponent)
                        },
                        {
                            path:"",
                            loadComponent : () =>import('./features/feature-blog/article/pages/article-list-container/article-list-container.component').then(m => m.ArticleListContainerComponent)
                        }
                    ]
                }
            ]
        },
        {
            path: "groupes",
            canActivate: [authGuard],
            children: [
                {
                    path: 'creer',
                    data : {
                        processState : ProcessState.Create,
                        groupType: GroupType.STAFF
                    },
                    loadComponent: () => import("./features/feature-group/pages/page-group-add-edit-container/page-group-add-edit-container.component").then(m => m.PageGroupAddEditContainerComponent)
                },
                {
                    path: 'voir/:groupId',
                    loadComponent : () => import('./features/feature-group/pages/page-group-with-users-data-container/page-group-with-users-data-container.component').then(m => m.PageGroupWithUsersDataContainerComponent)
                },
                {
                    path: 'modifier/:groupId',
                    data : {
                        processState : ProcessState.Edit,
                        groupType: GroupType.STAFF
                    },
                    loadComponent: () => import("./features/feature-group/pages/page-group-add-edit-container/page-group-add-edit-container.component").then(m => m.PageGroupAddEditContainerComponent)
                },
                {
                    path: "attente-de-validation",
                    loadComponent: () => import("./features/feature-group/pages/page-group-waiting-list-container/page-group-waiting-list-container.component").then(m => m.PageGroupWaitingListContainerComponent)
                }
                ,
                {
                    path: "",
                    data : {
                        processState : ProcessState.Edit
                    },
                    loadComponent: () => import("./features/feature-group/pages/page-group-list-container/page-group-list-container.component").then(m => m.PageGroupListContainerComponent)
                }
            ]
        },
        {
            path: "staffs",
            children: [
                {
                    path: 'invitations',
                    canActivate: [authGuard],
                    loadComponent : () => import("./features/feature-staff/staff-request/pages/page-staff-request-list-container/page-staff-request-list-container.component").then(m => m.PageStaffRequestListContainerComponent)
                },
                {
                    path: 'valider-invitations',
                    loadComponent : () => import("./features/feature-staff/staff-request/pages/page-validate-staff-request-container/page-validate-staff-request-container.component").then(m => m.PageValidateStaffRequestContainerComponent)
                },
                {
                    path: 'creer',
                    canActivate: [authGuard],
                    data : {
                        processState : ProcessState.Create
                    },
                    loadComponent: () => import("./features/feature-staff/staff/pages/page-add-edit-staff-container/page-add-edit-staff-container.component").then(m => m.PageAddEditStaffContainerComponent)
                },
                {
                    path: 'modifier/:id',
                    canActivate: [authGuard],
                    data : {
                        processState : ProcessState.Edit
                    },
                    loadComponent: () => import("./features/feature-staff/staff/pages/page-add-edit-staff-container/page-add-edit-staff-container.component").then(m => m.PageAddEditStaffContainerComponent)
                },
                {
                    path: ':id/mes-groupes',
                    canActivate: [authGuard],
                    loadComponent: () => import("./features/feature-staff/staff/pages/page-staff-groups-owner-container/page-staff-groups-owner-container.component").then(m => m.PageStaffGroupsOwnerContainerComponent)
                },
                {
                    path: "",
                    canActivate: [authGuard],
                    loadComponent: () => import("./features/feature-staff/staff/pages/page-staff-list-container/page-staff-list-container.component").then(m => m.PageStaffListContainerComponent)
                }
            ]
        },
        {
            path: "mot-de-passe-oublie",
            loadComponent : () => import("./features/feature-login/pages/page-init-reset-password-container/page-init-reset-password-container.component").then(m => m.PageInitResetPasswordContainerComponent)
        },
    
    */
    {
        path: "**",
        redirectTo: "tableau-de-board",
        pathMatch: "full"
    },
    {
        path: "",
        redirectTo: "tableau-de-board",
        pathMatch: "full"
    }
];
