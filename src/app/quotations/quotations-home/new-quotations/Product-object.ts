


export class Product{
    
    constructor(
   private productId: number,
   private amount: number,
   private dates:Array<{}>,
   private price:number,
   private perUnitDiscount:number,
   private priceAfterDiscount:number,
   private isDivient:boolean,
   private isOutsource:boolean
    ){

    }
}




/*
"schedule":[
    {
    "product_id":"my foo"
    "amount":2,
    "from_date":"2019-12-04",
    "to_date":"2019-12-20",
    "price": 110,
    "per_unit_discount": 10.2,
    "price_after_discount":100,
    "is_divient":false,
    "is_outsource":true
    
    },*/