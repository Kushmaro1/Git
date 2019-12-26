import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslatorModule } from 'src/app/translator/translator.module';
import { ThemeModule, lightTheme, darkTheme, portraitTheme, landscapeTheme } from 'src/app/theme';
import { SocketService } from 'src/app/shared/services/socket.service';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { WebRTCService } from 'src/app/shared/services/web-rtc.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('MainComponent', () => {
  let component: MainComponent;
  // let service:AuthService
  let fixture: ComponentFixture<MainComponent>;
  let spy:any
  const routes: Routes = [


    {path: "", component: MainComponent,
    children: [
         {
            path: "", component: LoadingComponent,
         },
         {
            path: "authenticate_funds", component: LoadingComponent,
         },
         {
            path: "administration",
            loadChildren: "../administration/administration.module#AdministrationModule",
            canActivate: [AuthGuard]
          },
         {
            path: "accounts",
            loadChildren: "../accounts/accounts.module#AccountsModule",
            canActivate: [AuthGuard]
          },
          {
            path: "roles-and-permissions",
            loadChildren: "../roles-and-permissions/roles-and-permissions.module#RolesAndPermissionsModule",
            canActivate: [AuthGuard]
          },
          { path: 'user0', redirectTo: 'support/accounts/999999999', pathMatch: 'full' },
          {
            path: "channel-management",
            loadChildren: "../channel-management/channel-management.module#ChannelManagementModule"
          },
          {
            path: "channel-supervision",
            loadChildren: "../channel-supervision/channel-supervision.module#ChannelSupervisionModule"
          },
          {
            path: "commissions",
            loadChildren: "../commissions/commissions.module#CommissionsModule"
          },
          {
            path: "commercial",
            loadChildren: "../commercial/commercial.module#CommercialModule"
          },
          {
            path: "transactions",
            loadChildren: "../transactions/transactions.module#TransactionsModule"
          },
          // {
          //   path: "content",
          //   loadChildren: "../content/content.module#ContentModule"
          // },
          {
            path: "languages",
            loadChildren: "../languages/languages.module#LanguagesModule"
          },
          {
            path: "trade-bomber",
            loadChildren: "../trade-bomber/trade-bomber.module#TradeBomberModule"
          },
          {
            path: "mail",
            loadChildren: "../mail/mail.module#MailModule"
          },
          {
            path: "version_control",
            loadChildren: "../document-version-control/document-version-control.module#DocumentVersionControlModule"
          },
          {
            path: "support",
            loadChildren: "../support/support.module#SupportModule",
            canActivate: [AuthGuard]
          },
          {
            path: "kyc",
            loadChildren: "../kyc/kyc.module#KycModule"
          },
          {
            path: "bcadmin",
            loadChildren: "../block-chain-admin/block-chain-admin.module#BlockChainAdminModule"
          },
          {
            path: "statement",
            loadChildren: "../statement/statement.module#StatementModule"
          },
          {
            path: "ico",
            loadChildren: "../ico/ico.module#IcoModule"
          },
          {
            path: "guru",
            loadChildren: "../guru-management/guru-management.module#GuruManagementModule"
          },
          {
            path: "algo",
            loadChildren: "../algo/algo.module#AlgoModule"
          },
          {
            path: "etf",
            loadChildren: "../etf-management/etf-management.module#EtfManagementModule"
          },
          {
            path: "revenue",
            loadChildren: "../revenue/revenue.module#RevenueModule"
          },
          {
            path: "exchange",
            loadChildren: "../exchange/exchange.module#ExchangeModule"
          },
          {
            path: "faq",
            loadChildren: "../faq/faq.module#FaqModule"
          },
          {
            path: "chat-bot",
            loadChildren: "../chat-bot/chat-bot.module#ChatBotModule"
          },
          {
            path: "widget-store",
            loadChildren: "../widget-store/widget-store.module#WidgetStoreModule"
          },
          {
            path: "margin",
            loadChildren: "../margin/margin.module#MarginModule"
          },
          {
            path: "derivatives",
            loadChildren: "../derivatives/derivatives.module#DerivativesModule"
          },
          {
            path: "indices",
            loadChildren: "../indices/indices.module#IndicesModule"
          },
          {
            path: "otc",
            loadChildren: "../otc/otc.module#OtcModule"
          },
          {
            path: "tickets",
            loadChildren: "../tickets/tickets.module#TicketsModule"
          },
          {
            path: "fido",
            loadChildren: "../fido/fido.module#FidoModule",
            canActivate: [AuthGuard]
          },
          {
            path: "funds-management",
            loadChildren: "../funds-management/funds-management.module#FundsManagementModule",
            canActivate: [AuthGuard],
            data: { fido:true}
          },
    ]}
]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        HttpClientTestingModule,
        SharedModule,
        TranslatorModule,
        ThemeModule.forRoot({
          themes: [lightTheme, darkTheme, portraitTheme, landscapeTheme],
          active: ['dark-c','landscape-o']
        })
    
      ],
      declarations: [MainComponent,LoadingComponent],
      providers: [
        SocketService,
        EventBusService,
        WebRTCService,
        AuthService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(()=>{
    // service=null;
    // component=null;
  })
  it('should create', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.userData=[{first_name:'troll'}]
    // spy = spyOn(service, 'userData').and.returnValue([{first_name:'troll'}]);
    expect(component).toBeTruthy();
  });
});
