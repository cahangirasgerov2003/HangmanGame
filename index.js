let gamePicture = document.querySelector("#game-picture"),
  infoHangman = document.querySelector("#info-hangman"),
  winsCounter = document.querySelector("#winsCounter"),
  wins = document.querySelector("#wins"),
  mysteryBoxes = document.querySelector("#mysteryBoxes"),
  chancesCounter = document.querySelector("#chancesCounter"),
  guessedLetters = document.querySelector("#guessedLetters");
class GuessGame {
  searchedWords = ["Italy", "Argentina", "Belgium", "Fas"];
  letter = "";
  searchedIndex = [];
  selectedKey = [];
  trueResult = 0;
  letterAddress = 0;
  k = 1;
  findRandom() {
    this.letter = this.searchedWords[this.letterAddress];
    gamePicture.src = `./assets/img/${this.letter}.jpg`;
    let word = "_";
    for (let i = 0; i < this.letter.length - 1; i++) {
      word = word + " _";
    }
    mysteryBoxes.innerHTML = word;
  }
  refresh() {
    setTimeout(() => {
      window.location.reload();
      infoHangman.innerHTML = `Which country does this player represent? Find and save!`;
      guessedLetters.innerHTML = "";
      chancesCounter.innerHTML = 5;
      this.letter = "";
      this.searchedIndex = [];
      this.selectedKey = [];
      this.trueResult = 0;
      this.letterAddress = 0;
      this.findRandom();
    }, 4000);
  }
  winRefresh() {
    infoHangman.innerHTML = `Which country does this player represent? Find and save!`;
    guessedLetters.innerHTML = "";
    this.searchedIndex = [];
    this.selectedKey = [];
  }
  pressedKey(keyboard) {
    this.trueResult = 0;
    if (!this.selectedKey.includes(keyboard)) {
      this.selectedKey = [...this.selectedKey, keyboard];
      guessedLetters.innerHTML = this.selectedKey;
      for (let i = 0; i < this.letter.length; i++) {
        this.searchedIndex = [];
        if (this.letter[i].toLowerCase() === keyboard) {
          this.searchedIndex.push(i);
          this.trueResult++;
        }
        let result = mysteryBoxes.innerHTML.split("");
        for (let key of this.searchedIndex) {
          if (key === 0) {
            result[key] = keyboard;
          } else {
            result[key * 2] = keyboard;
          }
        }
        mysteryBoxes.innerHTML = result.join("");
      }
      if (this.trueResult === 0) {
        chancesCounter.innerHTML--;
        if (chancesCounter.innerHTML === "0") {
          infoHangman.innerHTML = `You're out of luck.You couldn't save the player's life haha! &#128520`;
          wins.innerHTML = "Loses";
          gamePicture.src = `./assets/img/Azrael.jpg`;
          this.refresh();
        }
      }
      if (!mysteryBoxes.innerHTML.includes("_")) {
        winsCounter.innerHTML = this.k;
        this.k++;
        this.letterAddress++;
        if (this.letterAddress < 4) {
          this.findRandom();
          this.winRefresh();
        } else {
          infoHangman.innerHTML = `You are Winner &#128513!`;
          infoHangman.classList.add("h1");
          gamePicture.src = `./assets/img/winner.jpg`;
          setTimeout(() => {
            this.refresh();
          }, 0);
        }
      }
    }
  }
}
let game = new GuessGame();
game.findRandom();
window.addEventListener("keydown", (e) => {
  game.pressedKey(e.key);
});
