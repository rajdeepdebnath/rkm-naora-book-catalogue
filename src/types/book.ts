export enum LanguageEnum {
    English = "English",
    Bengali = "Bengali",
    Hindi = "Hindi",
  }

export type Book = {
    id?:string;
    Name:string;
    Author:string;
    Language:LanguageEnum;
    Price:number;
    TotalPrice:number;
    Quantity:number;
    created_date:Date;
}