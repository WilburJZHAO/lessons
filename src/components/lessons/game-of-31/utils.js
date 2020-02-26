import { pickNumber } from "../../common/utils";

export const settings = {
  cards: 6,
  target: 31
};

export const cardsRange = [3, 10];
export const getTargetRange = cards => {
  let range;
  switch (cards) {
    case 3:
      range = [6, 12];
      break;
    case 4:
      range = [10, 20];
      break;
    case 5:
      range = [15, 30];
      break;
    case 6:
      range = [21, 42];
      break;
    case 7:
      range = [28, 56];
      break;
    case 8:
      range = [36, 72];
      break;
    case 9:
      range = [45, 90];
      break;
    case 10:
      range = [55, 110];
      break;
    default:
      range = [];
  }
  return range;
};

/**
 * Initialize a deck of cards
 * @param {number} cards
 */
export const initDeck = (cards = 6) => {
  const deck = {
    H: [],
    D: [],
    S: [],
    C: []
  };
  for (let i = 1; i <= cards; i++) {
    deck.H.push({ rank: i, selected: false });
    deck.D.push({ rank: i, selected: false });
    deck.S.push({ rank: i, selected: false });
    deck.C.push({ rank: i, selected: false });
  }
  return deck;
};

export const initGame = (partyAName = "Player A", partyBName = "Player B") => {
  return {
    total: 0,
    winsForPartyA: 0,
    winsForPartyB: 0,
    whoseFirst: 1, // 1- party A first, 2 - party B first
    partyAName,
    partyBName,
    partyACards: [],
    partyBCards: []
  };
};

/**
 * Pick a suit randomly, return 'C', 'D', 'H' or 'S'
 */
export const pickSuit = () => {
  let suit;
  const random = pickNumber(1, 4);
  switch (random) {
    case 1:
      suit = "C";
      break;
    case 2:
      suit = "D";
      break;
    case 3:
      suit = "H";
      break;
    case 4:
      suit = "S";
      break;
    default:
      suit = "";
  }
  return suit;
};

/**
 * Pass in the deck object and filter the the card that is selected.
 * @param {Object} deck
 */
export const filterSelectedDeck = deck => {
  const filtered = [];
  for (let i = 0; i < deck.C.length; i++) {
    if (!deck.C[i].selected) filtered.push({ suit: "C", rank: deck.C[i].rank });
    if (!deck.D[i].selected) filtered.push({ suit: "D", rank: deck.D[i].rank });
    if (!deck.H[i].selected) filtered.push({ suit: "H", rank: deck.H[i].rank });
    if (!deck.S[i].selected) filtered.push({ suit: "S", rank: deck.S[i].rank });
  }
  return filtered;
};
