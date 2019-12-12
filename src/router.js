import Vue from "vue";
import VueRouter from "vue-router";
// import Trigonometry from './components/lessons/trigonometry/App.vue';
// import TimesTables from './components/lessons/times-tables/App.vue';
// import Truth1 from "./components/lessons/truth-tiles-1/App.vue";
// import Truth2 from "./components/lessons/truth-tiles-2/App.vue";
import Home from "./components/Home.vue";
// import TakeAwayTiles from "./components/lessons/take-away-tiles/App.vue";
// import Steps from "./components/lessons/steps/App.vue";
// import NumberTiles from "./components/lessons/number-tiles/App.vue";
// import ChessQueens from "./components/lessons/chess-queens/App.vue";
// import EightQueens from "./components/lessons/eight-queens/App.vue";
// import Crosses from "./components/lessons/crosses/App.vue";
// import AngleEstimation from './components/lessons/angle-estimation/App.vue';
// import AreaOfTriangle from './components/lessons/area-of-triangle/App.vue';
// import BiggestVolume from './components/lessons/biggest-volume/App.vue';
// import IceCreamFlavours from './components/lessons/ice-cream-flavours/App.vue';
// import ChancesWithCrosses from "./components/lessons/chances-with-crosses/App.vue"
// import FaysNines from "./components/lessons/fays-nines/App.vue"

const Radioactivity = resolve => {
  require.ensure("./components/lessons/radioactivity/App.vue", () => {
    resolve(require("./components/lessons/radioactivity/App.vue"));
  });
};

const SameOrDifferent = resolve => {
  require.ensure("./components/lessons/same-or-different/App.vue", () => {
    resolve(require("./components/lessons/same-or-different/App.vue"));
  });
};

const GardenBeds = resolve => {
  require.ensure("./components/lessons/garden-beds/App.vue", () => {
    resolve(require("./components/lessons/garden-beds/App.vue"));
  });
};

const Trigonometry = resolve => {
  require.ensure("./components/lessons/trigonometry/App.vue", () => {
    resolve(require("./components/lessons/trigonometry/App.vue"));
  });
};

const TimesTables = resolve => {
  require.ensure("./components/lessons/times-tables/App.vue", () => {
    resolve(require("./components/lessons/times-tables/App.vue"));
  });
};

const Truth1 = resolve => {
  require.ensure("./components/lessons/truth-tiles-1/App.vue", () => {
    resolve(require("./components/lessons/truth-tiles-1/App.vue"));
  });
};

const Truth2 = resolve => {
  require.ensure("./components/lessons/truth-tiles-2/App.vue", () => {
    resolve(require("./components/lessons/truth-tiles-2/App.vue"));
  });
};

const TakeAwayTiles = resolve => {
  require.ensure("./components/lessons/take-away-tiles/App.vue", () => {
    resolve(require("./components/lessons/take-away-tiles/App.vue"));
  });
};

const Steps = resolve => {
  require.ensure("./components/lessons/steps/App.vue", () => {
    resolve(require("./components/lessons/steps/App.vue"));
  });
};

const NumberTiles = resolve => {
  require.ensure("./components/lessons/number-tiles/App.vue", () => {
    resolve(require("./components/lessons/number-tiles/App.vue"));
  });
};

const ChessQueens = resolve => {
  require.ensure("./components/lessons/chess-queens/App.vue", () => {
    resolve(require("./components/lessons/chess-queens/App.vue"));
  });
};

const Crosses = resolve => {
  require.ensure("./components/lessons/crosses/App.vue", () => {
    resolve(require("./components/lessons/crosses/App.vue"));
  });
};

const AngleEstimation = resolve => {
  require.ensure("./components/lessons/angle-estimation/App.vue", () => {
    resolve(require("./components/lessons/angle-estimation/App.vue"));
  });
};

const AreaOfTriangle = resolve => {
  require.ensure("./components/lessons/area-of-triangle/App.vue", () => {
    resolve(require("./components/lessons/area-of-triangle/App.vue"));
  });
};

const BiggestVolume = resolve => {
  require.ensure("./components/lessons/biggest-volume/App.vue", () => {
    resolve(require("./components/lessons/biggest-volume/App.vue"));
  });
};

const IceCreamFlavours = resolve => {
  require.ensure("./components/lessons/ice-cream-flavours/App.vue", () => {
    resolve(require("./components/lessons/ice-cream-flavours/App.vue"));
  });
};

const ChancesWithCrosses = resolve => {
  require.ensure("./components/lessons/chances-with-crosses/App.vue", () => {
    resolve(require("./components/lessons/chances-with-crosses/App.vue"));
  });
};

const FaysNines = resolve => {
  require.ensure("./components/lessons/fays-nines/App.vue", () => {
    resolve(require("./components/lessons/fays-nines/App.vue"));
  });
};

const EightQueens = resolve => {
  require.ensure("./components/lessons/eight-queens/App.vue", () => {
    resolve(require("./components/lessons/eight-queens/App.vue"));
  });
};

const MagicSquares = resolve => {
  require.ensure("./components/lessons/magic-squares/App.vue", () => {
    resolve(require("./components/lessons/magic-squares/App.vue"));
  });
};

const MakeAMillion = resolve => {
  require.ensure("./components/lessons/make-a-million/App.vue", () => {
    resolve(require("./components/lessons/make-a-million/App.vue"));
  });
};

const SportingFinalsAFL = resolve => {
  require.ensure("./components/lessons/sporting-finals-AFL/App.vue", () => {
    resolve(require("./components/lessons/sporting-finals-AFL/App.vue"));
  });
};

const SportingFinalsNRL = resolve => {
  require.ensure("./components/lessons/sporting-finals-NRL/App.vue", () => {
    resolve(require("./components/lessons/sporting-finals-NRL/App.vue"));
  });
};

const DiceBasketball = resolve => {
  require.ensure("./components/lessons/dice-basketball/App.vue", () => {
    resolve(require("./components/lessons/dice-basketball/App.vue"));
  });
};

const DiceFooty = resolve => {
  require.ensure("./components/lessons/dice-footy/App.vue", () => {
    resolve(require("./components/lessons/dice-footy/App.vue"));
  });
};

const CounterEscape = resolve => {
  require.ensure("./components/lessons/counter-escape/App.vue", () => {
    resolve(require("./components/lessons/counter-escape/App.vue"));
  });
};

const BuildingViews = resolve => {
  require.ensure("./components/lessons/building-views/App.vue", () => {
    resolve(require("./components/lessons/building-views/App.vue"));
  });
};

const ProblemDice = resolve => {
  require.ensure("./components/lessons/problem-dice/App.vue", () => {
    resolve(require("./components/lessons/problem-dice/App.vue"));
  });
};

const CrazyAnimals = resolve => {
  require.ensure("./components/lessons/crazy-animals/App.vue", () => {
    resolve(require("./components/lessons/crazy-animals/App.vue"));
  });
};

const CatAndMouse = resolve => {
  require.ensure("./components/lessons/cat-and-mouse/App.vue", () => {
    resolve(require("./components/lessons/cat-and-mouse/App.vue"));
  });
};

const DiceCricket = resolve => {
  require.ensure("./components/lessons/dice-cricket/App.vue", () => {
    resolve(require("./components/lessons/dice-cricket/App.vue"));
  });
};

const HaveAHexagon = resolve => {
  require.ensure("./components/lessons/have-a-hexagon/App.vue", () => {
    resolve(require("./components/lessons/have-a-hexagon/App.vue"));
  });
};

const WalkThePlank = resolve => {
  require.ensure("./components/lessons/walk-the-plank/App.vue", () => {
    resolve(require("./components/lessons/walk-the-plank/App.vue"));
  });
};

const NineAndOver = resolve => {
  require.ensure("./components/lessons/nine-and-over/App.vue", () => {
    resolve(require("./components/lessons/nine-and-over/App.vue"));
  });
};

const WhatsItWorth = resolve => {
  require.ensure("./components/lessons/whats-it-worth/App.vue", () => {
    resolve(require("./components/lessons/whats-it-worth/App.vue"));
  });
};
const DoctorDart = resolve => {
  require.ensure("./components/lessons/doctor-dart/App.vue", () => {
    resolve(require("./components/lessons/doctor-dart/App.vue"));
  });
};
const DiceDifferences = resolve => {
  require.ensure("./components/lessons/dice-differences/App.vue", () => {
    resolve(require("./components/lessons/dice-differences/App.vue"));
  });
};
const Ballon = resolve => {
  require.ensure("./components/lessons/2-litre-ballon/App.vue", () => {
    resolve(require("./components/lessons/2-litre-ballon/App.vue"));
  });
};
const NumberCharts = resolve => {
  require.ensure("./components/lessons/number-charts/App.vue", () => {
    resolve(require("./components/lessons/number-charts/App.vue"));
  });
};
const RectangleFraction = resolve => {
  require.ensure("./components/lessons/rectangle-fraction/App.vue", () => {
    resolve(require("./components/lessons/rectangle-fraction/App.vue"));
  });
};
const GameShow = resolve => {
  require.ensure("./components/lessons/game-show/App.vue", () => {
    resolve(require("./components/lessons/game-show/App.vue"));
  });
};
const GoldbachsConjecture = resolve => {
  require.ensure("./components/lessons/goldbachs-conjecture/App.vue", () => {
    resolve(require("./components/lessons/goldbachs-conjecture/App.vue"));
  });
};
const BirthMonthParadox = resolve => {
  require.ensure("./components/lessons/birth-month-paradox/App.vue", () => {
    resolve(require("./components/lessons/birth-month-paradox/App.vue"));
  });
};
const Addo = resolve => {
  require.ensure("./components/lessons/addo/App.vue", () => {
    resolve(require("./components/lessons/addo/App.vue"));
  });
};
const AlgebraCharts = resolve => {
  require.ensure("./components/lessons/algebra-charts/App.vue", () => {
    resolve(require("./components/lessons/algebra-charts/App.vue"));
  });
};

const Multo = resolve => {
  require.ensure("./components/lessons/multo/App.vue", () => {
    resolve(require("./components/lessons/multo/App.vue"));
  });
};
const BobsButton = resolve => {
  require.ensure("./components/lessons/bobs-button/App.vue", () => {
    resolve(require("./components/lessons/bobs-button/App.vue"));
  });
};
const DuellingDice = resolve => {
  require.ensure("./components/lessons/duelling-dice/App.vue", () => {
    resolve(require("./components/lessons/duelling-dice/App.vue"));
  });
};

const FractionCharts = resolve => {
  require.ensure("./components/lessons/fraction-charts/App.vue", () => {
    resolve(require("./components/lessons/fraction-charts/App.vue"));
  });
};

const Lcm = resolve => {
  require.ensure("./components/lessons/lcm/App.vue", () => {
    resolve(require("./components/lessons/lcm/App.vue"));
  });
};

const HuntingStars = resolve => {
  require.ensure("./components/lessons/hunting-stars/App.vue", () => {
    resolve(require("./components/lessons/hunting-stars/App.vue"));
  });
};

const CrackedTiles = resolve => {
  require.ensure("./components/lessons/cracked-tiles/App.vue", () => {
    resolve(require("./components/lessons/cracked-tiles/App.vue"));
  });
};

const BillardBall = resolve => {
  require.ensure("./components/lessons/billard-ball/App.vue", () => {
    resolve(require("./components/lessons/billard-ball/App.vue"));
  });
};

const Palindromes = resolve => {
  require.ensure("./components/lessons/palindromes/App.vue", () => {
    resolve(require("./components/lessons/palindromes/App.vue"));
  });
};

const ChocolateChipCookies = resolve => {
  require.ensure("./components/lessons/chip-cookies/App.vue", () => {
    resolve(require("./components/lessons/chip-cookies/App.vue"));
  });
};

const BeetleGame = resolve => {
  require.ensure("./components/lessons/beetle-game/App.vue", () => {
    resolve(require("./components/lessons/beetle-game/App.vue"));
  });
};
const ChartsStrategies = resolve => {
  require.ensure("./components/lessons/charts-strategies/App.vue", () => {
    resolve(require("./components/lessons/charts-strategies/App.vue"));
  });
};

const GoodsBads = resolve => {
  require.ensure("./components/lessons/goods-bads/App.vue", () => {
    resolve(require("./components/lessons/goods-bads/App.vue"));
  });
};
const OddsAndEvens = resolve => {
  require.ensure("./components/lessons/odds-and-evens/App.vue", () => {
    resolve(require("./components/lessons/odds-and-evens/App.vue"));
  });
};

const SimpleElegantElusive = resolve => {
  require.ensure("./components/lessons/simple-elegant-elusive/App.vue", () => {
    resolve(require("./components/lessons/simple-elegant-elusive/App.vue"));
  });
};

const NumberPartitions = resolve => {
  require.ensure("./components/lessons/number-partitions/App.vue", () => {
    resolve(require("./components/lessons/number-partitions/App.vue"));
  });
};

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/radioactivity", component: Radioactivity, name: "Radioactivity" },
  {
    path: "/same-or-different",
    component: SameOrDifferent,
    name: "Same or Different"
  },
  { path: "/garden-beds", component: GardenBeds, name: "Garden Beds" },

  {
    path: "/trigonometry",
    component: Trigonometry,
    name: "Trigonometry Walking"
  },
  {
    path: "/times-tables",
    component: TimesTables,
    name: "Tackling Times Tables"
  },
  { path: "/truth-tiles-1", component: Truth1, name: "Truth tiles 1" },
  { path: "/truth-tiles-2", component: Truth2, name: "Truth tiles 2" },
  {
    path: "/take-away-tiles",
    component: TakeAwayTiles,
    name: "Take Away Tiles"
  },
  { path: "/steps", component: Steps, name: "Steps" },
  { path: "/number-tiles", component: NumberTiles, name: "Number Tiles" },
  { path: "/chess-queens", component: ChessQueens, name: "Chess Queens" },
  { path: "/crosses", component: Crosses, name: "Crosses" },
  {
    path: "/angle-estimation",
    component: AngleEstimation,
    name: "Angle Estimation"
  },
  {
    path: "/area-of-triangle",
    component: AreaOfTriangle,
    name: "Area Of Triangle"
  },
  { path: "/biggest-volume", component: BiggestVolume, name: "Biggest Volume" },
  {
    path: "/ice-cream-flavours",
    component: IceCreamFlavours,
    name: "Ice Cream Flavours"
  },
  {
    path: "/chances-with-crosses",
    component: ChancesWithCrosses,
    name: "Chances With Crosses"
  },
  { path: "/fays-nines", component: FaysNines, name: "Fay's Nines" },
  { path: "/eight-queens", component: EightQueens, name: "Eight Queens" },
  { path: "/magic-squares", component: MagicSquares, name: "Magic Squares" },
  { path: "/make-a-million", component: MakeAMillion, name: "Make A Million" },
  {
    path: "/sporting-finals-NRL",
    component: SportingFinalsNRL,
    name: "Sporting Finals(NRL)"
  },
  {
    path: "/sporting-finals-AFL",
    component: SportingFinalsAFL,
    name: "Sporting Finals(AFL)"
  },
  {
    path: "/dice-basketball",
    component: DiceBasketball,
    name: "Dice Basketball"
  },
  { path: "/dice-footy", component: DiceFooty, name: "Dice Footy" },
  { path: "/counter-escape", component: CounterEscape, name: "Counter Escape" },
  { path: "/building-views", component: BuildingViews, name: "Building Views" },
  { path: "/problem-dice", component: ProblemDice, name: "Problem Dice" },
  { path: "/crazy-animals", component: CrazyAnimals, name: "Crazy Animals" },
  { path: "/cat-and-mouse", component: CatAndMouse, name: "Cat and Mouse" },
  { path: "/dice-cricket", component: DiceCricket, name: "Dice Cricket" },
  { path: "/have-a-hexagon", component: HaveAHexagon, name: "Have A Hexagon" },
  { path: "/walk-the-plank", component: WalkThePlank, name: "Walk The Plank" },
  { path: "/nine-and-over", component: NineAndOver, name: "Nine And Over" },
  { path: "/whats-it-worth", component: WhatsItWorth, name: "What's It Worth" },
  { path: "/doctor-dart", component: DoctorDart, name: "Doctor Dart" },
  {
    path: "/dice-differences",
    component: DiceDifferences,
    name: "Dice Differences"
  },
  { path: "/ballon", component: Ballon, name: "2 Litre Ballon" },
  { path: "/number-charts", component: NumberCharts, name: "Number Charts" },
  {
    path: "/rectangle-fraction",
    component: RectangleFraction,
    name: "Rectangle Fraction"
  },
  { path: "/game-show", component: GameShow, name: "Game Show" },
  {
    path: "/goldbachs-conjecture",
    component: GoldbachsConjecture,
    name: "Goldbach's Conjecture"
  },
  { path: "/addo", component: Addo, name: "Addo" },
  {
    path: "/birth-month-paradox",
    component: BirthMonthParadox,
    name: "Birth Month Paradox"
  },

  { path: "/algebra-charts", component: AlgebraCharts, name: "Algebra Charts" },
  // {
  //   path: "/goldbachs-conjecture",
  //   component: GoldbachsConjecture,
  //   name: "Goldbach's Conjecture"
  // },
  // { path: "/addo", component: Addo, name: "Addo" },
  { path: "/multo", component: Multo, name: "Multo" },
  { path: "/bobs-button", component: BobsButton, name: "Bobs Button" },
  { path: "/duelling-dice", component: DuellingDice, name: "Duelling Dice" },
  {
    path: "/fraction-charts",
    component: FractionCharts,
    name: "Fraction Charts"
  },
  { path: "/lcm", component: Lcm, name: "LCM" },
  {
    path: "/hunting-stars",
    component: HuntingStars,
    name: "Hunting For Stars"
  },
  { path: "/cracked-tiles", component: CrackedTiles, name: "Cracked Tiles" },
  {
    path: "/billard-ball",
    component: BillardBall,
    name: "Billard Ball Bounces"
  },
  {
    path: "/palindromes",
    component: Palindromes,
    name: "Palindromes"
  },
  {
    path: "/chocolate-chip-cookies",
    component: ChocolateChipCookies,
    name: "Chocolate Chip Cookies"
  },
  { path: "/beetle-game", component: BeetleGame, name: "Beetle Game" },
  {
    path: "/charts-strategies",
    component: ChartsStrategies,
    name: "Charts Strategies"
  },
  { path: "/goods-and-bads", component: GoodsBads, name: "Goods And Bads" },
  {
    path: "/simple-elegant-elusive",
    component: SimpleElegantElusive,
    name: "Simple Elegant Elusive"
  },
  { path: "/odds-and-evens", component: OddsAndEvens, name: "Odds and Evens" },
  {
    path: "/number-partitions",
    component: NumberPartitions,
    name: "Number Partitions"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
