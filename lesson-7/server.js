// const objectLiteral = {};
// const objectConstractor = new Object();

// const legolas = {
//   name: "Legolas",
//   race: "Elf",
//   weapon: "bow and arrows",
//   greet: function () {
//     return `Greeting I'm ${this.name}`;
//   },
//   fight: function () {
//     return `${this.name} gracefully attacks with ${this.weapon}`;
//   },
// };

// const entries = Object.entries(legolas).forEach((value) => {
//   let key = value[0];
//   let arrValue = value[1];

//   console.log(`${key} : ${arrValue}`);
// });

// const additionaInfo = {
//   age: 100,
//   homeland: "Woodland Realm",
// };

// concat two objects
// const merged = Object.assign(legolas, additionaInfo);

// const merged = { ...legolas, ...additionaInfo };

// console.log(merged);

//Object freez

// const user = {
//   username: "Gimli",
//   password: "dwarf123",
// };

// const newUser = Object.freeze(user);
// const newUser = Object.seal(user);

// newUser.password = "1212312312";
// newUser.active = true;

// console.log(newUser);
// console.log(Object.isFrozen(newUser));

// створює новий об'єкт через референс іншого
// const newElf = new Object.create(legolas);
// референс на об'єкт леголас
// const newElf = legolas;

// newElf.name = "Elf2";

// присвоєння
// legolas.age = 300;
// legolas["age2"] = 2000;
// legolas.weapon = "sword";
// delete legolas.weapon;
// legolas.fight = function () {
//   return `${this.name} gracefully attacks with ${this.weapon}`;
// };

// ітерація через for in

// for (let key in legolas) {
//   console.log(key.toUpperCase(), legolas[key]);
//   console.log(legolas[key].toUpperCase());
// }

// console.log(legolas.greet());
// console.log(legolas.name);
// console.log(legolas.race);
// console.log(legolas.weapon);

// console.log(legolas["greet"]());
// console.log(legolas["weapon"]);

// console.log(legolas);
// console.log(legolas.fight());

// console.log(delete legolas.weapon);

// console.log(newElf.greet(), newElf.fight());

// console.log(Object.keys(legolas).length);

// console.log(Object.values(legolas));

// console.log(Object.entries(legolas));

// Прототипи та їх методи

// const util = require("util");
// let x = {};
// let y = [];

// console.log(Object.getPrototypeOf(x));  prototype of user
// console.log(
//   util.inspect(Object.getPrototypeOf(x), { showHidden: true, depth: null });  all prototypes
// );
// console.log(util.inspect(x.__proto__, { showHidden: true, depth: null })); all prototypes

// console.log(x.toString()); object_Object

// console.log(x.__proto__.__proto__); null

// console.log(util.inspect(y.__proto__, { showHidden: true, depth: null })); all methods
// console.log(
//   util.inspect(y.__proto__.__proto__, { showHidden: true, depth: null })
// );
// console.log(util.inspect(y.__proto__ === Array.prototype));  return true
// console.log(util.inspect(y.__proto__.__proto__ === Object.prototype)); return true

// console.log(Array.prototype.isPrototypeOf(y)); return true
// console.log(Object.prototype.isPrototypeOf(Array)); return true

// console.log(y instanceof Array); return true

// Функції конструктори

// function Hero(name, level) {
//   this.name = name;
//   this.level = level;
// }

// Hero.prototype.greet = function () {
//   return `${this.name} says hello`;
// };

// const hero1 = new Hero("Bjorn", 1);
// const hero2 = new Warrior("Bjorn", 1, "axe");
// const hero3 = new Healer("Kanin", 1, "cure");

// console.log(hero1);
// console.log(hero1.greet());

// function Warrior(name, level, weapon) {
//   Hero.call(this, name, level);

//   this.weapon = weapon;
// }

// function Healer(name, level, spell) {
//   Hero.call(this, name, level);
//   this.spell = spell;
// }
// Warrior.prototype.attack = function () {
//   return `${this.name} attacks with ${this.weapon}`;
// };
// Healer.prototype.heal = function () {
//   return `${this.name} casts  ${this.spell}`;
// };

// Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
// Object.setPrototypeOf(Healer.prototype, Hero.prototype);

// console.log(hero2.attack());
// console.log(hero3.heal());
// console.log(hero2.greet());
// console.log(hero3.greet());

// console.log(
//   util.inspect(Object.getPrototypeOf(hero1), { showHidden: true, depth: null })
// );
