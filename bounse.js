"use strict";

{
    let numbers = [3,2, 2, 3];
    let val = 3;
//   let numbers = [0,1,2,2,3,0,4,2];
//   let val = 2;
   
  function removeElement(numbers, val) {
     let count = 0;

    for (let index = 0; index < numbers.length; index++) {
      if (numbers[index] == val) {
        numbers.splice(index, 1);
          numbers.push("_");
          index--;
        count++;
      }
    }
    return count;
  }

    console.log(removeElement(numbers, val));
    console.log(numbers);
}







// {
// let numbers = [3, 2, 2, 3];
// let val = 3;
//   //   let numbers = [3, 2, 2, 3];
//   //   let val = 3;
//   let numbers = [0, 1, 2, 2, 3, 0, 4, 2];
//   let val = 2;
//   let array2 = [];
//   let count = 0;

//   function removeElement(numbers, val) {
//     for (let index = 0; index < numbers.length; index++) {
//       if (numbers[index] == val) {
//         numbers[index] = "_";
//         count++;
//       }
//       if (numbers[index] !== "_") {
//           array2.push(numbers[index]);

//       }
//     }
//     const k = numbers.length - count;

//     for (let index = 0; index < numbers.length - k; index++) {
//       array2.push("_");
//     }
//     return array2;
//   }

//   console.log(removeElement(numbers,val));
// //   console.log(array2);
// }
