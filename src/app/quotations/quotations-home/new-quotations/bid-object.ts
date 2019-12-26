import {Product} from './Product-object'

export class BidObject {

    bidId:number ;
    
    constructor(   
       private clientId:number,
       private priceBeforeDiscount:number,
       private discount:number,
       private priceAfterDiscount:number,
       private projectName:string,
       private producerName:string,	
       private producerEmail:string,
       private department:number,
       private destatus:number,
       private dates:any,
       private bidSchedule:Array<Product>) {
    }

    
}


///object from rest 

      /*
    {
      "client_id"	: 26,
        "payment_type"	: 1,
        "price_before_discount" : 100.00 ,
        "discount" : 10.00,
        "price_after_discount" : 20.5 ,
        "project_name"	: "some project",
        "producer_name"	: "any produce,r",
        "producer_email" : "my_mail.mail.com",
        "department" : 0,
      "status":1,
      "dates":[
          {"from_date":"2019-12-01" , "to_date":"2019-12-12"},
          {"from_date":"2019-12-12" , "to_date":"2019-12-20" }
        ],
      "bid_schedule":[
        {	
          "department":0,
          "schedule":[
            {
            "product_id":"my foo",
            "amount":2,
            "from_date":"2019-12-04",
            "to_date":"2019-12-20",
            "price": 110,
            "per_unit_discount": 10.2,
            "price_after_discount":100,
            "is_divient":false,
            "is_outsource":true
            
            },
            {
            "product_id":"basic 1",
            "amount":2,
            "from_date":"2019-12-04",
            "to_date":"2019-12-20",
            "price": 110,
            "per_unit_discount": 10.2,
            "price_after_discount":100,
            "is_divient":false,
            "is_outsource":false
            
            },
            {
            "product_id":"my set",
            "amount":2,
            "from_date":"2019-12-04",
            "to_date":"2019-12-20",
            "price": 110,
            "per_unit_discount": 10.2,
            "price_after_discount":100,
            "is_divient":false,
            "is_outsource":false
            
            }
          ]
        }
      ]
        
    } 
    */

