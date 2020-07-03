import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { TooltipModule } from 'ng2-tooltip';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { routing } from './app.routing';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { BoardEffects } from './store/effects/board.effects';
import { ProfileEffects } from './store/effects/profile.effects';
import { ProjectEffects } from './store/effects/project.effects';
import { SectionEffects } from './store/effects/section.effects';
import { SubSectionEffects } from './store/effects/subsection.effects';
import { DashboardEffects } from './store/effects/dashboard.effects';
import { PaymentEffects } from './store/effects/payment.effects';
import { SettingsEffects } from './store/effects/settings.effects';
import { UploadEffects } from './store/effects/upload.effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './_guards';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { UserComponent } from './components/layout/header/components/user/user.component';
import {
  AuthService,
  BoardService,
  DashboardService,
  IdeaService,
  PaymentService,
  ProjectService,
  SectionService,
  SettingsService,
  SubsectionService,
  UploadService,
  TrialService
} from './_services';
import { reducers } from './store/app.states';
import { environment } from '../environments/environment';


import { IdeaEffects } from './store/effects/idea.effects';
import { ClickOutside } from './directives/click-outside.directive';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialLoginModule
} from 'angularx-social-login';
import { setContext } from 'apollo-link-context';
import { SegmentModule } from 'ngx-segment-analytics';
import { CommonModule } from '@angular/common';
import { TabModule } from 'angular-tabs-component';
import { EditorToolbarComponent } from './dashboard/component/wysiwyg-editor/components/editor-toolbar/editor-toolbar.component';
import { WysiwygEditorComponent } from './dashboard/component/wysiwyg-editor/wysiwyg-editor.component';
import { ImageToolbarComponent } from './dashboard/component/wysiwyg-editor/components/image-toolbar/image-toolbar.component';
import {UrlToolbarComponent} from "./dashboard/component/wysiwyg-editor/components/url-toolbar/url-toolbar.component";

const auth = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  else
    return {
      headers: {
        ...headers,
        Authorization: `JWT ${token}`
      }
    };
});
const config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider(environment.googleAuthKey)
},
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.FACEBOOK_APP_ID)
  }
]);

export function createApollo(httpLink: HttpLink, trialService: TrialService): Object {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
            if (message.toLowerCase() === 'payment required') {
              console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              );
              trialService.openTrialSet(true);
            }
          }
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLinks =  auth.concat(
      httpLink.create({
        uri: environment.backUrl
      })
  );
  const httpLinkWithErrorHandling = ApolloLink.from([
    errorLink,
    httpLinks,
  ]);

  return {
    link: httpLinkWithErrorHandling,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      }
    }
  };
}

export function provideConfig(): any {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    ClickOutside,
    EditorToolbarComponent,
    ImageToolbarComponent,
    UrlToolbarComponent,
    WysiwygEditorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    TabModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    SocialLoginModule,
    TooltipModule,
    NgxDnDModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      AuthEffects,
      BoardEffects,
      ProfileEffects,
      ProjectEffects,
      SectionEffects,
      SubSectionEffects,
      IdeaEffects,
      PaymentEffects,
      UploadEffects,
      DashboardEffects,
      SettingsEffects
    ]),
    ApolloModule,
    HttpLinkModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    FileDropModule,
    routing,
    SegmentModule.forRoot({
      apiKey: environment.SEGMENT_API_KEY,
      debug: environment.SEGMENT_DEBUG
    }),
  ],
  exports: [RouterModule],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink, TrialService]
  },
    AuthService,
    AuthGuard,
    PaymentService,
    UploadService,
    ProjectService,
    SectionService,
    SubsectionService,
    IdeaService,
    DashboardService,
    SettingsService,
    BoardService,
    TrialService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  entryComponents: [ EditorToolbarComponent, ImageToolbarComponent, UrlToolbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
