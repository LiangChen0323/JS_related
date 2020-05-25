// class person {
//   constructor(mass, height) {
//     this.mass = mass;
//     this.height = height;
//   }
//   MBI() {
//     return (this.mass / this.height ^ 2);
//   }
// }

// Mark = new person(10, 20);
// John = new person(20, 20);
// console.log("if Mark has better MBI than John" + Mark.MBI() <= John.MBI());


// function cal(bill) {
//   switch (bill) {
//     case bill <= 50:
//       return bill * 0.2;
//       break;
//     case bill > 50 && bill <= 200:
//       return bill * 0.5;
//       break;
//     default:
//       return bill * 0.1;
//       break;
//   }
// }

// bill = [124, 48, 268]

// for (b of bill) {
//   console.log(cal(b) + b);
// }

// var a = 'Hello!';
// first();

// function first() {
//   var b = 'Hi!';
//   second();

//   function second() {
//     var c = 'Hey!';
//     third()
//   }
// }

// function third() {
//   var d = 'John';
//   //console.log(c);
//   console.log(a + d);
// }

// var a = 'Hello!';
// first();

// function first() {
//   var b = 'Hi!';
//   second();

//   function second() {
//     var a = "New a";
//     var c = 'Hey!';
//     console.log(a + b + c)
//     third()
//   }
// }

// function third() {
//   var d = 'John';
//   //console.log(c);
//   // console.log(a + b + c + d);
// }

console.log(this);

calculateAge(1985);

function calculateAge(year) {
  console.log(2016 - year);
  console.log(this);
}

var john = {
  name: 'John',
  yearOfBirth: 1990,
  calculateAge: function () {
    console.log(this);
    console.log(2016 - this.yearOfBirth);

    function innerFunction() {
      console.log(this);
    }
    innerFunction();
  }
}

john.calculateAge();
var mike = {
  name: 'Mike',
  yearOfBirth: 1984
};


mike.calculateAge = john.calculateAge;
mike.calculateAge();