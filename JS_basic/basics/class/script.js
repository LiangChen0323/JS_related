/*var john = {
  name: "John",
  yearOfBirth: 1990,
  job: "teacher"
};

var Person = function (name, yearOfBirth, job) {
  this.name = name,
    this.yearOfBirth = yearOfBirth,
    this.job = job
  this.calculateAge = function () {
    return (2020 - this.yearOfBirth);
  }
};

Person.prototype.calculateAge_2 = function () {
  return (2020 - this.yearOfBirth);
}

class PersonA {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    return (2020 - this.yearOfBirth);
  }
}

var abc = new Person("abc", 1992, "teacher");
var aaa = new PersonA("aaa", 1993, "student");

console.log(john);
console.log(abc);
console.log(aaa);

console.log(abc.calculateAge());
console.log(abc.calculateAge_2());
console.log(aaa.calculateAge());
*/


/*
var years = [1990, 2000, 1998, 2010, 2020];
function arrayCalc(arr, fn) {
  var arrRes = [];
  for (i of arr) {
    arrRes.push(fn(i));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

console.log(arrayCalc(years, calculateAge));

var fullAges = arrayCalc(years, isFullAge);
console.log(fullAges);
*/

// function interviewQuestion(job) {
//   if (job === "designer") {
//     return function (name) {
//       console.log(name + ", xxxxxxxxxx")
//     }
//   } else if (job === "teacher") {
//     return function (name) {
//       console.log(name + ", teacher")
//     }
//   } else {
//     return function (name) {
//       console.log(name + "Hi, what is your job")
//     }
//   }
// }

// var teacher_questions = interviewQuestion("teacher");

// teacher_questions("abc");

//IIFE

// (function () {
//   console.log("ABC");
// })();

// ((a) => {
//   console.log("AAA" + a);
// })("a");

// function retirement(retirementAge) {
//   return function (yearOfBirth) {
//     return (retirementAge - (2020 - yearOfBirth))
//   }
// }

// console.log(retirement(65)(1993));

// function interviewQuestion(job) {
//   if (job === 'designer') {
//     return function (name) {
//       console.log(name + ', can you please explain what UX design is?');
//     }
//   } else if (job === 'teacher') {
//     return function (name) {
//       console.log('What subject do you teach, ' + name + '?');
//     }
//   } else {
//     return function (name) {
//       console.log('Hello ' + name + ', what do you do?');
//     }
//   }
// }

// function interviewQuestion_1(job) {
//   return function (name) {
//     if (job === 'designer') {
//       console.log(name + ', can you please explain what UX design is?');
//     } else if (job === 'teacher') {
//       console.log('What subject do you teach, ' + name + '?');
//     } else {
//       console.log('Hello ' + name + ', what do you do?');
//     }
//   }
// }

// interviewQuestion("teacher")("abc");
// interviewQuestion_1("teacher")('abb');

// var john = {
//   name: "john",
//   age: 26,
//   job: "teacher",
//   presentation: function (style, timeOfDay) {
//     if (style === "formal") {
//       console.log(style + this.name);
//     } else if (style === "friendly") {

//     }
//   }
// }

// class Persion {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age
//   }
// }

// function showNames() {
//   console.log(this.name + " " + this.age);
// }

// let abc = new Persion("abc", 20);
// showNames.call(abc);

// showNames.apply(abc);
// showNames.bind(abc)();

(function () {
  class Question {
    constructor(question, answers, correct) {
      this.question = question;
      this.answers = answers;
      this.correct = correct;
    }

    showQuestion() {
      console.log(this.question);
      for (var i in this.answers) {
        console.log(i + ": " + this.answers[i]);
      }
    }

    checkAnswer(answer) {
      if (answer == this.correct) {
        console.log("You are correct");
      } else {
        console.log("please check again");
      }

    }
  }

  var q1 = new Question("What is the name", ["A", "B", "C"], 1);
  var q2 = new Question("What is the Age", [10, 20, 30], 1);
  var q3 = new Question("What is the location", ["London", "Beijing", "Paris"], 1);

  var questions = [q1, q2, q3];

  var randomQuesIndex = Math.floor(Math.random() * questions.length);

  questions[randomQuesIndex].showQuestion();

  var ans = prompt("answer the question");

  questions[randomQuesIndex].checkAnswer(ans);

})();