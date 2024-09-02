class Question {
    constructor (text, choices, answer, difficulty) {

        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
        let array = this.choices
        for (let i = 0; i < array.length; i++) {
            // for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

     


    }

    // 2. shuffleChoices()
    /*

    shuffleChoices() {
            let array = this.choices
        // for (let i = 0; i < array.length; i++) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    

    */



/*

class Hero {

  constructor(parameterName, parameterIdentity) { // dynamic parameters can be changed when instanced
    // 'constructor' works as a reserved word for each class
    // 'constructor' definews all the properties that the class will have

    this.name = parameterName;
    this.identity = parameterIdentity;
    this.isVillain = false; // static parameters remain the same
  }

  // methods = here all the methods that has the class
  revealSecretIdentity() {
    return `i'm ${this.name} and my secret identity is ${this.identity}`;
  }

  becomeVillain() {
    this.isVillain = true; // modifies an object propertie
    return `i'm ${this.name} and now i'm a villain`
  }
}

*/