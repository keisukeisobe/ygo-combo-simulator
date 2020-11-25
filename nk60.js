const { PerformanceObserver, performance } = require('perf_hooks');
const decklist = {
  brothers: 3,
  custennin: 3,
  drystan: 1,
  eachtar: 1,
  gawalchavad: 1,
  iyvanne: 3,
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

const deck = [];

const combo1a = ['merlin', 'medraut', 'rota'];
const combo1b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'gallatin', 'glory', 'heritage'];
const combo2a = ['merlin', 'medraut', 'rota', 'heritage'];
const combo2b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'gallatin', 'glory'];
const combo3a = ['borz', 'brothers', 'custennin', 'drystan', 'eachtar', 'gawayn', 'gawalchavad', 'iyvanne', 'medraut', 'pellinore', 'rota', 'heritage'];
const combo3b = ['borz', 'brothers', 'custennin', 'drystan', 'eachtar', 'gawayn', 'gawalchavad', 'iyvanne', 'medraut', 'pellinore', 'heritage'];
const combo3c = ['borz', 'brothers', 'custennin', 'drystan', 'eachtar', 'gawayn', 'gawalchavad', 'iyvanne', 'medraut', 'pellinore', 'rota'];
const combo4a = ['custennin', 'rota', 'heritage'];
const combo4b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'excaliburn', 'gallatin', 'glory'];
const combo5a = ['custennin', 'rota'];
const combo5b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'excaliburn', 'gallatin', 'glory', 'heritage'];
const combo6a = ['iyvanne', 'rota', 'heritage'];
const combo6b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'excaliburn', 'gallatin', 'glory'];
const combo7a = ['iyvanne', 'rota'];
const combo7b = ['arefeudutyr', 'caliburn', 'clarent', 'destiny', 'excaliburn', 'gallatin', 'glory', 'heritage'];

function medraut(runs, handsize) {
  const t0 = performance.now();
  let medrautComboCount = 0;
  let noComboCount = 0;
  for (let i = 0; i < runs; i++){
    shuffle(deck);
    let hand = deck.slice(0, handsize);
    let tempHand = [...hand];
    //cleaning the hand: HotC is HOPT, so we remove excess copies from the calculation
    if (hand.filter(card => card === 'heritage').length > 1){
      tempHand = tempHand.filter(card => card != 'heritage');
      tempHand.push('heritage');
    }
    //Medraut Combo Tree
    //if hand contains [merlin, rota, medraut] AND [bouncers or hotc]
    if (tempHand.some(card => combo2a.includes(card)) && tempHand.some(card => combo2b.includes(card))){
      medrautComboCount++;
    } 
    //if hand contains [merlin, rota, medraut, hotc] AND [bouncers]
    else if (tempHand.some(card => combo1a.includes(card)) && tempHand.some(card => combo1b.includes(card))){
      medrautComboCount++;
    } 
    else {
      noComboCount++;
    }
  }
  console.log(`opened with a Medraut combo ${(medrautComboCount/runs*100).toFixed(2)}% of the time`);
  // console.log(`opened with no combo ${noComboCount} times`);
  console.log(`opened with no combo ${(noComboCount/runs*100).toFixed(2)}% of the time`);
}

function brothers(runs, handsize) {
  const t0 = performance.now();
  let brothersComboCount = 0;
  let noComboCount = 0;
  for (let i = 0; i < runs; i++){
    shuffle(deck);
    let hand = deck.slice(0, handsize);
    let tempHand = [...hand];
    //cleaning the hand: HotC is HOPT, so we remove excess copies from the calculation
    if (hand.filter(card => card === 'heritage').length > 1){
      tempHand = tempHand.filter(card => card != 'heritage');
      tempHand.push('heritage');
    }
    //Brothers Combo Tree
    //if hand has [brothers] and [2 of hotc/rota/NKs]
    if (tempHand.includes('brothers') && [...tempHand.slice(0, tempHand.indexOf('brothers')), ...tempHand.slice(tempHand.indexOf('brothers')+1)].filter(card => combo3a.includes(card)).length >= 2){
      brothersComboCount++;
    }
    //if hand has [rota] and [2 of hotc/NKs]
    else if (tempHand.includes('rota') && tempHand.filter(card => combo3b.includes(card)).length >= 2){
      brothersComboCount++;
    }
    //if hand has [hotc] and [2 of rotc/nks]
    else if (tempHand.includes('heritage') && tempHand.filter(card => combo3c.includes(card)).length >= 2){
      brothersComboCount++;
    }
    else {
      noComboCount++;
    }
  }
  console.log(`opened with a brothers combo ${(brothersComboCount/runs*100).toFixed(2)}% of the time`);
  // console.log(`opened with no combo ${noComboCount} times`);
  console.log(`opened with no combo ${(noComboCount/runs*100).toFixed(2)}% of the time`);
}

function custennin(runs, handsize) {
  const t0 = performance.now();
  let custenninComboCount = 0;
  let noComboCount = 0;
  for (let i = 0; i < runs; i++){
    shuffle(deck);
    let hand = deck.slice(0, handsize);
    let tempHand = [...hand];
    //cleaning the hand: HotC is HOPT, so we remove excess copies from the calculation
    if (hand.filter(card => card === 'heritage').length > 1){
      tempHand = tempHand.filter(card => card != 'heritage');
      tempHand.push('heritage');
    }
    //Custennin Combo Tree
    //if hand has [iyvanne] and [rota or hotc or custennin] and [noble arms or glory]
    if (tempHand.includes('iyvanne') && tempHand.some(card => combo4a.includes(card)) && tempHand.some(card => combo4b.includes(card))){
      custenninComboCount++;
    }
    //if hand has [iyvanne] and [rota or custennin] and [noble arms or glory or hotc]
    else if (tempHand.includes('iyvanne') && tempHand.some(card => combo5a.includes(card)) && tempHand.some(card => combo5b.includes(card))){
      custenninComboCount++;
    }
    //if hand has [custennin] and [rota or iyvanne or hotc] and [noble arms or glory]
    else if (tempHand.includes('custennin') && tempHand.some(card => combo6a.includes(card)) && tempHand.some(card => combo6b.includes(card))){
      custenninComboCount++;
    }
    //if hand has [custennin] and [rota or iyvanne] and [noble arms or glory or hotc]
    else if (tempHand.includes('custennin') && tempHand.some(card => combo7a.includes(card)) && tempHand.some(card => combo7b.includes(card))){
      custenninComboCount++;
    }
    //else, no combo
    else {
      noComboCount++;
    }
  }
  console.log(`opened with a custennin/iyvanne combo ${(custenninComboCount/runs*100).toFixed(2)}% of the time`);
  // console.log(`opened with no combo ${noComboCount} times`);
  console.log(`opened with no combo ${((noComboCount/runs)*100).toFixed(2)}% of the time`);
}

function sim(runs, handsize) {
  const t0 = performance.now();
  let medrautComboCount = 0;
  let brothersComboCount = 0;
  let custenninComboCount = 0;
  let noComboCount = 0;
  for (let i = 0; i < runs; i++){
    shuffle(deck);
    let hand = deck.slice(0, handsize);
    let tempHand = [...hand];
    //cleaning the hand: HotC is HOPT, so we remove excess copies from the calculation
    if (hand.filter(card => card === 'heritage').length > 1){
      tempHand = tempHand.filter(card => card != 'heritage');
      tempHand.push('heritage');
    }
    //Medraut Combo Tree
    //if hand contains [merlin, rota, medraut] AND [bouncers or hotc]
    if (tempHand.some(card => combo1a.includes(card)) && tempHand.some(card => combo1b.includes(card))){
      medrautComboCount++;
    } 
    //if hand contains [merlin, rota, medraut, hotc] AND [bouncers]
    else if (tempHand.some(card => combo2a.includes(card)) && tempHand.some(card => combo2b.includes(card))){
      medrautComboCount++;
    }
    //Brothers Combo Tree
    //if hand has [brothers] and [2 of hotc/rota/NKs]
    else if (tempHand.includes('brothers') && [...tempHand.slice(0, tempHand.indexOf('brothers')), ...tempHand.slice(tempHand.indexOf('brothers')+1)].filter(card => combo3a.includes(card)).length >= 2){
      brothersComboCount++;
    }
    //if hand has [rota] and [2 of hotc/NKs]
    else if (tempHand.includes('rota') && tempHand.filter(card => combo3b.includes(card)).length >= 2){
      brothersComboCount++;
    }
    //if hand has [hotc] and [2 of rotc/nks]
    else if (tempHand.includes('heritage') && tempHand.filter(card => combo3c.includes(card)).length >= 2){
      brothersComboCount++;
    }
    //Custennin Combo Tree
    //if hand has [iyvanne] and [rota or hotc or custennin] and [noble arms or glory]
    else if (tempHand.includes('iyvanne') && tempHand.some(card => combo4a.includes(card)) && tempHand.some(card => combo4b.includes(card))){
      custenninComboCount++;
    }
    //if hand has [iyvanne] and [rota or custennin] and [noble arms or glory or hotc]
    else if (tempHand.includes('iyvanne') && tempHand.some(card => combo5a.includes(card)) && tempHand.some(card => combo5b.includes(card))){
      custenninComboCount++;
    }
    //if hand has [custennin] and [rota or iyvanne or hotc] and [noble arms or glory]
    else if (tempHand.includes('custennin') && tempHand.some(card => combo6a.includes(card)) && tempHand.some(card => combo6b.includes(card))){
      custenninComboCount++;
    }
    //if hand has [custennin] and [rota or iyvanne] and [noble arms or glory or hotc]
    else if (tempHand.includes('custennin') && tempHand.some(card => combo7a.includes(card)) && tempHand.some(card => combo7b.includes(card))){
      custenninComboCount++;
    }
    //else, no combo
    else {
      noComboCount++;
    }
  }
  // console.log(`${medrautComboCount+brothersComboCount+custenninComboCount + noComboCount} runs on handsize ${handsize}`);
  // console.log(`opened with Medraut combo ${medrautComboCount} times`);
  // console.log(`opened with no Medraut but Brothers combo ${brothersComboCount} times`);
  // console.log(`opened with no Medraut or Brothers combo but Custennin combo ${custenninComboCount} times`);
  // console.log(`opened with a combo ${medrautComboCount+brothersComboCount+custenninComboCount}/${runs} times`);
  console.log(`opened with a combo ${((medrautComboCount+brothersComboCount+custenninComboCount)/runs*100).toFixed(2)}% of the time`);
  // console.log(`opened with no combo ${noComboCount} times`);
  console.log(`opened with no combo ${(noComboCount/runs*100).toFixed(2)}% of the time`);
  const t1 = performance.now();
  console.log(`${runs} runs took ${t1 - t0} milliseconds.`);
}

deckConstructor();

let runs = 1000000;
let handsize = 6;
sim(runs, handsize);
medraut(runs, handsize);
brothers(runs, handsize);
custennin(runs, handsize);