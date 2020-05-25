import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {

  constructor() { }
  getRandomPassword(){
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];
    let uppercases = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let lowercases = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let specialcaracters = ["#","$","/","<",">","%","!","&"];
    let allspecies = numbers.concat(uppercases,lowercases,specialcaracters);
    let password = "";
    for(let i = 0 ;i<10;i++){
      let rand = Math.floor(Math.abs(Math.random()-0.3)*100);
      password+=allspecies[rand];
    }
    return password;
  }
}
