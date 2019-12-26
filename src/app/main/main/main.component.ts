import {OnInit, Component, ViewEncapsulation, OnDestroy, HostListener} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {MessageService} from "../../../app/shared/services/message.service";
import {enableProdMode} from '@angular/core';
import {environment} from '../../../environments/environment';
// import {ThemeService} from '../../theme/theme.service';
import { AuthService } from '../../shared/sevices/auth.service';
// import {CommonsService} from '../../shared/services/commons.service';
// import {PushService} from "../../shared/services/push.service";
// import { AuthService } from '../../shared/services/auth.service';
import { Globals } from '../../translator/class/globals.service';
import { MessagesService } from 'src/app/shared/sevices/messages.service';
import { SocketService } from 'src/app/socket/socket.service';
import { Subject, Subscription, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, OnDestroy {
  hamburgerState = 2
  subscribtions=[]
  // page = '';
  instance:MainComponent;
  user={
    name:'Admin',
    role:'Admin'
  }


  endTime = 1;
  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription;
  oneMinLeft;

  navigationItems = [
    // {visible: true, name: "ToggleColor", click: 'toggle', parameters: ['light-c','dark-c']},
    // {visible: true, name: "ToggleOrientation", click: 'toggle', parameters: ['landscape-o','portrait-o']},
    
    {visible: true, name: "Customers" ,subnavs: [
      {name:'Customers Table', value:'table'},
      {name:'Add New Customer', value:'add/new'}
    ]},
    {visible: true, name: "Products" ,subnavs: [
      {name:'Products Table', value:'table'},
      {name:'Add New Product', value:'add/new'}
    ]},
    {visible: true, name: "Quotations",subnavs: [
      {name:'Quotations Table', value:'table'},
      {name:'Create Quotation', value:'newc'}
    ]},

    {visible: true, name: "Orders"},
    {visible: true, name: "Orders In Progress"},
    {visible: true, name: "Executed Orders"},
    {visible: true, name: "Statements"}
    
  ]
  confirmation:any={
    
  };
  selectedNav
  selectedSubnav
  connection;
  messages=[]
  subject: Subject<unknown>;
  constructor(
    public glob : Globals,
    private router: Router,
    // private ws: WidgetService,
    // public ps: PushService,
    public messs:MessagesService,
    // public cs: CommonsService,
    public auth: AuthService,
    public sock:SocketService
    // public sc: StringCalculatorService,
    // public gs:ImagesGalleryService,
  ) {
    this.user['name']= this.auth.userName
    this.user['role']= this.auth.permission
          
    this.instance = this;
    if(this.auth.isLoggedIn()){
      this.sock.buildHeaders();
      this.sock.connect();
    }else{
      this.router.navigate(['../login']);
    }
  
    // this.sc.getTest()
    // this.gs.start()
    // this.gs.test()
   // this.ps.boOpenConnection();
   // console.log(this.auth.userData)
  //  this.currentUser=this.auth.getFirstName();
  //  if(this.currentUser =='Troll'){
  //   //  // console.log(true)
  //  }
  //  else{
  //   //  // console.log(false)
  //   //  // console.log(this.currentUser)
  //   }
  }

  ngOnInit() {
    this.resetTimer();
    this.auth.userActionOccured.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.resetTimer();
    });
    



    this.subscribtions.push({})
     this.subscribtions[this.subscribtions.length-1] = this.messs.setSubNav.subscribe(data=>{
      window.requestAnimationFrame(()=>{
        this.selectedSubnav = data;
      })
    })
    this.subscribtions.push({})
     this.subscribtions[this.subscribtions.length-1] = this.messs.messageAllert.subscribe(data=>{
       console.log(data)
      if(data.type == true){
        window.requestAnimationFrame(()=>{
          this.messages.push(data);
        })
      }
      if(data.type == false){
        window.requestAnimationFrame(()=>{
          for(let i=0;i<this.messages.length;i++){
            if(this.messages[i]['id'] == data['id']){
              this.messages.splice(i,1);
              return
            }
          }
        })
      }
    })
    // this.cs.getTickerImages();
    // // this.cs.setMaps();
    // this.cs.openWidget.subscribe(name=>{
    //   this.externalOpneWidget(name)
    // })
    // this.messs.setConfirmation.subscribe(data=>{
    //   // console.log(data)
    //    this.confirmation=data
    // })
    // this.connection = this.ps.getMessages().subscribe(message => {
    //   this.messages.push(message)
    //   // console.log(message);
    // });
  }
  navClick(name){
    // this.selectedNav = name;
    console.log(name)
    switch(name){
      case 'Customers':{
        this.router.navigate(['../main/customers']);
        break;
      }
      case 'Products':{
        this.router.navigate(['../main/products']);
        break;
      }
      case 'Create Quotation':{
        this.router.navigate(['../main/quotations/create']);
        break;
      }
      case 'Quotations':{
        this.router.navigate(['../main/quotations/table']);
        break;
      }
    }
  }
  subNavClick(name,value){
    // this.selectedNav = name;
    console.log(name)
    switch(name){
      case 'Customers':{
        this.router.navigate(['../main/customers/'+value]);
        break;
      }
      case 'Products':{
        this.router.navigate(['../main/products/'+value]);
        break;
      }
     
      case 'Quotations':{
        this.router.navigate(['../main/quotations/'+value]);
        break;
      }
     
    }
  }
  onActivate(myEvent){
    this.selectedNav=myEvent.name; 
    // this.page= myEvent.name; 
    // console.log(this.selectedNav)
    // console.log(myEvent)
  }
  logOut(){
    this.auth.logout()
  }
  // change_Menu() {
  //   this.hamburgerState = (this.ws.hamburgerState + 1) % 2;
  //   this.ws.hamburgerState = this.hamburgerState;
  // }

  // toggle(nav,parameters) {
  //   const active = this.themeService.getActiveTheme();
  //   this.themeService.setTheme(name);
  //   if (active[0].name === parameters[0] || active[1].name === parameters[0]) {
  //     this.themeService.setTheme(parameters[1]);
  //     // console.log(parameters[1])
  //   }
  //   else {
  //     this.themeService.setTheme(parameters[0]);
  //     // console.log(parameters[0])
  //   }
  // }
  // setRouteMain(){
  //   this.messs.setRoute([{name:'Home',link:'../main'}],null,null,false,true );
  //   this.confirmation.open = false;
  // }
  // toggle2() {

  // }
  // externalOpneWidget(name){
  //   // console.log(name)
  //    switch (name) {
  //      case "User Widget":
  //         if(this.navigationItems[4].visible == true){
  //           this.clickNav(this.navigationItems[4],this.navigationItems[4].parameters)
  //         }
  //        break;
  //      case "Calculator":
  //     //  this.navigationItems[3].visible = false
  //         //  if(this.navigationItems[3].open != true){
  //         //  this.clickNav(this.navigationItems[3],this.navigationItems[3].parameters)
  //            this.navigationItems[3].open = true
  //         //  }
  //        break;
     
  //      default:
  //        break;
  //    }
  // }
  // clickNav(nav, parameters) {
  //   this[nav.click](nav,parameters);
  // }

  // changeMyChat(myEvent) {
  //   // console.log(myEvent)
  //   this.manuChange("Chat",myEvent)
  // }
  // changeMyCalc(myEvent) {
  //   // console.log(myEvent)
  //   // this.manuChange("Calc",myEvent)
  //   this.navigationItems[3].open = myEvent

  // }
  // changeMyUserWidget(myEvent) {
  //   // console.log(myEvent)
  //   this.manuChange("User Widget",myEvent)

  // }
  // manuChange(nav,myEvent){
  //   for (let i = 0; i < this.navigationItems.length; i++) {
  //     if (this.navigationItems[i].name == nav) {
  //       this.navigationItems[i].visible = !myEvent;
  //     }
  //   }
  // }

  ngOnDestroy() {
    for(let i=0;i<this.subscribtions.length;i++){
      this.subscribtions[i].unsubscribe()
    }
  }
  logout(){
    this.auth.logout();
    
  }

  resetTimer(endTime: number = this.endTime) {
    this.oneMinLeft = false;
    const interval = 1000;
    const duration = endTime * 1200 ;
    this.timerSubscription = timer(0, interval).pipe(
      take(duration)
    ).subscribe(value =>
     this.render((duration - +value) * interval),
      err => { },
      () => { 
        this.auth.logout();
      }
    )
  }
  minutesDisplay = 0;
  secondsDisplay = 0;
  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
  private render(count) {
  //  console.log(count)
    if (count < 300000 ) {
      this.oneMinLeft= true;
    }
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
  }
}
