import * as internal from "assert";

export class Kart{
    id: number;
title:string;
description:string;
price:number;
quantity:number;
rating:number;
no_of_ratings:number;
image:any;
}

export class userkart{
    [x: string]: any;
    id: number;
    emailid:string;
    productid:number;
    quantity:number;
    price:number;
}


export class userkartbyemail{
    title:string=null;
    description:string=null;
    image:any=null;
    productid:number=0;
    quantity:number=0;
    price:number=0;
}