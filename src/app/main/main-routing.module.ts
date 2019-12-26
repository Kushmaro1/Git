import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
// import { LoadingComponent } from '../components/loading/loading.component';
// import { AuthGuard } from "../shared/services/auth.guard";
const routes: Routes = [


        {path: "", component: MainComponent,
        children: [
              {
                path: "customers",
                loadChildren: "../customers/customers.module#CustomersModule"
              },
              {
                path: "products",
                loadChildren: "../products/products.module#ProductsModule"
              },
              {
                path: "quotations",
                loadChildren: "../quotations/quotations.module#QuotationsModule"
              },
            //  {
            //     path: "", component: LoadingComponent,
            //  },
            //  {
            //     path: "authenticate_funds", component: LoadingComponent,
            //  },
            //  {
            //     path: "administration",
            //     loadChildren: "../administration/administration.module#AdministrationModule",
            //     canActivate: [AuthGuard]
            //   },
            //  {
            //     path: "accounts",
            //     loadChildren: "../accounts/accounts.module#AccountsModule",
            //     canActivate: [AuthGuard]
            //   },
            //   {
            //     path: "roles-and-permissions",
            //     loadChildren: "../roles-and-permissions/roles-and-permissions.module#RolesAndPermissionsModule",
            //     canActivate: [AuthGuard]
            //   },
            //   { path: 'user0', redirectTo: 'support/accounts/999999999', pathMatch: 'full' },
            //   {
            //     path: "channel-management",
            //     loadChildren: "../channel-management/channel-management.module#ChannelManagementModule"
            //   },
            //   {
            //     path: "channel-supervision",
            //     loadChildren: "../channel-supervision/channel-supervision.module#ChannelSupervisionModule"
            //   },
            //   {
            //     path: "commissions",
            //     loadChildren: "../commissions/commissions.module#CommissionsModule"
            //   },
            //   {
            //     path: "commercial",
            //     loadChildren: "../commercial/commercial.module#CommercialModule"
            //   },
            //   {
            //     path: "transactions",
            //     loadChildren: "../transactions/transactions.module#TransactionsModule"
            //   },
            //   // {
            //   //   path: "content",
            //   //   loadChildren: "../content/content.module#ContentModule"
            //   // },
            //   {
            //     path: "languages",
            //     loadChildren: "../languages/languages.module#LanguagesModule"
            //   },
            //   // {
            //   //   path: "trade-bomber",
            //   //   loadChildren: "../trade-bomber/trade-bomber.module#TradeBomberModule"
            //   // },
            //   {
            //     path: "mail",
            //     loadChildren: "../mail/mail.module#MailModule"
            //   },
            //   {
            //     path: "version_control",
            //     loadChildren: "../document-version-control/document-version-control.module#DocumentVersionControlModule"
            //   },
            //   {
            //     path: "support",
            //     loadChildren: "../support/support.module#SupportModule",
            //     canActivate: [AuthGuard]
            //   },
            //   {
            //     path: "kyc",
            //     loadChildren: "../kyc/kyc.module#KycModule"
            //   },
            //   {
            //     path: "bcadmin",
            //     loadChildren: "../block-chain-admin/block-chain-admin.module#BlockChainAdminModule"
            //   },
            //   {
            //     path: "statement",
            //     loadChildren: "../statement/statement.module#StatementModule"
            //   },
            //   {
            //     path: "ico",
            //     loadChildren: "../ico/ico.module#IcoModule"
            //   },
            //   {
            //     path: "guru",
            //     loadChildren: "../guru-management/guru-management.module#GuruManagementModule"
            //   },
            //   {
            //     path: "algo",
            //     loadChildren: "../algo/algo.module#AlgoModule"
            //   },
            //   {
            //     path: "etf",
            //     loadChildren: "../etf-management/etf-management.module#EtfManagementModule"
            //   },
            //   {
            //     path: "revenue",
            //     loadChildren: "../revenue/revenue.module#RevenueModule"
            //   },
            //   {
            //     path: "exchange",
            //     loadChildren: "../exchange/exchange.module#ExchangeModule"
            //   },
            //   {
            //     path: "faq",
            //     loadChildren: "../faq/faq.module#FaqModule"
            //   },
            //   {
            //     path: "chat-bot",
            //     loadChildren: "../chat-bot/chat-bot.module#ChatBotModule"
            //   },
            //   {
            //     path: "widget-store",
            //     loadChildren: "../widget-store/widget-store.module#WidgetStoreModule"
            //   },
            //   {
            //     path: "margin",
            //     loadChildren: "../margin/margin.module#MarginModule"
            //   },
            //   {
            //     path: "derivatives",
            //     loadChildren: "../derivatives/derivatives.module#DerivativesModule"
            //   },
            //   {
            //     path: "indices",
            //     loadChildren: "../indices/indices.module#IndicesModule"
            //   },
            //   {
            //     path: "otc",
            //     loadChildren: "../otc/otc.module#OtcModule"
            //   },
            //   {
            //     path: "tickets",
            //     loadChildren: "../tickets/tickets.module#TicketsModule"
            //   },
            //   {
            //     path: "fido",
            //     loadChildren: "../fido/fido.module#FidoModule",
            //     canActivate: [AuthGuard]
            //   },
            //   {
            //     path: "arbitrage",
            //     loadChildren: "../arbitrage/arbitrage.module#ArbitrageModule"
            //   },
            //   {
            //     path: "funds-management",
            //     loadChildren: "../funds-management/funds-management.module#FundsManagementModule",
            //     canActivate: [AuthGuard],
            //     data: { fido:true}
            //   },
        ]}
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
