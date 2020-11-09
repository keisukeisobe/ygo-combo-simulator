const { PerformanceObserver, performance } = require('perf_hooks');


const decklist = {
  borz: 1,
  brothers: 3,
  custennin: 3,
  drystan: 1,
  eachtar: 1,
  gawayn: 1,
  gawalchavad: 1,
  iyvanne: 1,
  medraut: 3,
  pellinore: 1,
  merlin: 3,
  gwenhwhyfar: 1,
  rota: 1,
  arfeudutyr: 1,
  caliburn: 2,
  clarent: 1,
  destiny: 2,
  gallatin: 1,
  excaliburn: 2,
  glory: 3,
  heritage: 3,
  until: 2,
  strike: 2
}

const combo1a = ['merlin', 'medraut', 'rota'];
const combo1b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'gallatin', 'glory', 'heritage'];
const combo2a = ['merlin', 'medraut', 'rota', 'heritage'];
const combo2b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'gallatin', 'glory'];
const combo3a = ['borz', 'brothers', 'custennin', 'drystan', 'eachtar', 'gawayn', 'gawalchavad', 'iyvanne', 'medraut', 'pellinore', 'rota', 'heritage'];
const combo3b = ['borz', 'brothers', 'custennin', 'drystan', 'eachtar', 'gawayn', 'gawalchavad', 'iyvanne', 'medraut', 'pellinore', 'heritage'];
const combo3c = ['borz', 'brothers', 'custennin', 'drystan', 'eachtar', 'gawayn', 'gawalchavad', 'iyvanne', 'medraut', 'pellinore', 'rota'];

const deck = [];

function deckConstructor(){
  for (const cardtype in decklist) {
    for (let i = 0; i < decklist[cardtype]; i++) {
      deck.push(cardtype);
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function sim(runs, handsize) {
  const t0 = performance.now();
  let noComboCount = 0;
  let medrautCount = 0;
  let noMedrautBrothersCount = 0;
  for (let i = 0; i < runs; i++){
    shuffle(deck);
    let hand = deck.slice(0, handsize);
    let tempHand = [...hand];
    let medraut = false;
    //if hand contains iyvanne, cannot do Medraut combo
    if((hand.some(card => combo1a.includes(card)) && hand.some(card => combo1b.includes(card)) && !hand.includes('iyvanne')) || (hand.some(card => combo2a.includes(card)) && hand.some(card => combo2b.includes(card)) && !hand.includes('iyvanne'))){
      medrautCount++;
      medraut = true;
      //console.log(`hand ${i+1} resulted in Medraut combo, ${tempHand}`);
    } else {
      //if medraut combo does not work, remove excess copies of heritage, dead draw
      if (hand.filter(card => card === 'heritage').length > 1){
        tempHand = tempHand.filter(card => card != 'heritage');
        tempHand.push('heritage');
      }
      //if hand contains brothers, remove 1 copy of brothers and check for at least 2 of NKs/RotA/Heritage
      if (hand.includes('brothers')) {
        tempHand = [...tempHand.slice(0, tempHand.indexOf('brothers')), ...tempHand.slice(tempHand.indexOf('brothers')+1)];
        if (tempHand.filter(cards => combo3a.includes(cards)).length >= 2){
          noMedrautBrothersCount++;
        } else {
          noComboCount++;
        }
      //if hand does not contain brothers, check for rota/heritage and then check for at least 2 of NKs/the other searcher (3b and 3c)
      } else if (tempHand.includes('rota') && tempHand.filter(cards => combo3b.includes(cards)).length >= 2){
        noMedrautBrothersCount++;
      } else if (tempHand.includes('heritage') && tempHand.filter(cards => combo3c.includes(cards)).length >= 2){
        noMedrautBrothersCount++;
      } else {
        noComboCount++;
      }
    }
  }
  console.log(`Out of ${medrautCount+noMedrautBrothersCount+noComboCount} runs, opened with Medraut combo ${medrautCount} times, no Medraut but Brothers combo ${noMedrautBrothersCount} times and no combo ${noComboCount} times on handsize ${handsize}`);
  console.log(`Opened with combo ${(runs-noComboCount)/runs*100}% times`);
  const t1 = performance.now();
  console.log(`${runs} runs took ${t1 - t0} milliseconds.`);
}

let runs = 100000;
deckConstructor();
sim(runs, 6);
sim(runs, 5);

function sims(runs, handsize) {
  let noComboCount = 0;
  let brothersCount = 0;
  for (let i = 0; i < runs; i++){
    shuffle(deck);
    let hand = deck.slice(0, handsize);
    let tempHand = [...hand];
    //remove excess copies of heritage, dead draw
    if (hand.filter(card => card === 'heritage').length > 1){
      tempHand = tempHand.filter(card => card != 'heritage');
      tempHand.push('heritage');
    }
    //if hand contains brothers
    if (hand.includes('brothers')) {
      //remove 1 copy of brothers 
      tempHand = [...tempHand.slice(0, tempHand.indexOf('brothers')), ...tempHand.slice(tempHand.indexOf('brothers')+1)];
      //check for at least 2 of NKs/RotA/Heritage
      if (tempHand.filter(cards => combo3a.includes(cards)).length >= 2){
        brothersCount++;
      } else {
        noComboCount++;
      }
    //if hand does not contain brothers, check for rota/heritage and then check for at least 2 of NKs/the other searcher (3b and 3c)
    } else if (tempHand.includes('rota') && !tempHand.includes('brothers') && !tempHand.includes('heritage')  && tempHand.filter(cards => combo3b.includes(cards)).length >= 2){
      brothersCount++;
    } else if (tempHand.includes('heritage') && !tempHand.includes('brothers') && !tempHand.includes('rota') && tempHand.filter(cards => combo3c.includes(cards)).length >= 2){
      brothersCount++;
    } else {
      noComboCount++;
    }
  }
  console.log(`Out of ${runs} runs, Brothers combo ${brothersCount} times and no combo ${noComboCount} times on handsize ${handsize}`);
  console.log(`Opened with combo ${(runs-noComboCount)/runs*100}% times`);
}

// sims(runs, 6);
// sims(runs, 5);
