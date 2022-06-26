/* 
    Задание 5:
    
    Условную конструкцию из задания 4, перепишите с помощью Switch Case
*/


const randomNumber = Math.floor(Math.random() * 100);
console.log(randomNumber);
switch(randomNumber<20){
    case true:
        console.log(randomNumber+" меньше 20");
        break;
    case false:
        switch(randomNumber>50){
            case true:
                console.log(randomNumber+" больше 50");
                break;
            case false:
                console.log(randomNumber+" больше 20, и меньше 50");
                break;
        }
        false;
}