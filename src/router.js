import Vue from 'vue';
import VueRouter from 'vue-router';
// import Trigonometry from './components/lessons/trigonometry/App.vue';
// import TimesTables from './components/lessons/times-tables/App.vue';
// import Truth1 from "./components/lessons/truth-tiles-1/App.vue";
// import Truth2 from "./components/lessons/truth-tiles-2/App.vue";
import Home from './components/Home.vue';
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
const Trigonometry = resolve => {
  require.ensure('./components/lessons/trigonometry/App.vue', () => {
    resolve(require('./components/lessons/trigonometry/App.vue'))
  });
}

const TimesTables = resolve => {
  require.ensure('./components/lessons/times-tables/App.vue', () => {
    resolve(require('./components/lessons/times-tables/App.vue'))
  });
}

const Truth1 = resolve => {
  require.ensure('./components/lessons/truth-tiles-1/App.vue', () => {
    resolve(require('./components/lessons/truth-tiles-1/App.vue'))
  });
}

const Truth2 = resolve => {
  require.ensure('./components/lessons/truth-tiles-2/App.vue', () => {
    resolve(require('./components/lessons/truth-tiles-2/App.vue'))
  });
}

const TakeAwayTiles = resolve => {
  require.ensure('./components/lessons/take-away-tiles/App.vue', () => {
    resolve(require('./components/lessons/take-away-tiles/App.vue'))
  });
}

const Steps = resolve => {
  require.ensure('./components/lessons/steps/App.vue', () => {
    resolve(require('./components/lessons/steps/App.vue'))
  });
}

const NumberTiles = resolve => {
  require.ensure('./components/lessons/number-tiles/App.vue', () => {
    resolve(require('./components/lessons/number-tiles/App.vue'))
  });
}

const ChessQueens = resolve => {
  require.ensure('./components/lessons/chess-queens/App.vue', () => {
    resolve(require('./components/lessons/chess-queens/App.vue'))
  });
}

const Crosses = resolve => {
  require.ensure('./components/lessons/crosses/App.vue', () => {
    resolve(require('./components/lessons/crosses/App.vue'))
  });
}

const AngleEstimation = resolve => {
  require.ensure('./components/lessons/angle-estimation/App.vue', () => {
    resolve(require('./components/lessons/angle-estimation/App.vue'))
  });
}

const AreaOfTriangle = resolve => {
  require.ensure('./components/lessons/area-of-triangle/App.vue', () => {
    resolve(require('./components/lessons/area-of-triangle/App.vue'))
  });
}

const BiggestVolume = resolve => {
  require.ensure('./components/lessons/biggest-volume/App.vue', () => {
    resolve(require('./components/lessons/biggest-volume/App.vue'))
  });
}

const IceCreamFlavours = resolve => {
  require.ensure('./components/lessons/ice-cream-flavours/App.vue', () => {
    resolve(require('./components/lessons/ice-cream-flavours/App.vue'))
  });
}

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home, name: 'home'},
  {path: '/trigonometry', component: Trigonometry, name: 'Trigonometry Walking'},
  {path: '/times-tables', component: TimesTables, name: 'Tackling Times Tables'},
  {path:'/truth-tiles-1',component:Truth1,name:'Truth tiles 1'},
  {path:'/truth-tiles-2',component:Truth2,name:'Truth tiles 2'},
  {path:'/take-away-tiles',component:TakeAwayTiles, name:'Take Away Tiles'},
  {path:'/steps',component:Steps,name:'Steps'},
  {path:'/number-tiles',component:NumberTiles,name:'Number Tiles'},
  {path:'/chess-queens',component:ChessQueens,name:'Chess Queens'},
  {path:'/crosses',component:Crosses,name:'Crosses'},
  {path:'/angle-estimation', component: AngleEstimation, name: 'Angle Estimation'},
  {path:'/area-of-triangle',component:AreaOfTriangle,name:'Area Of Triangle'},
  {path:'/biggest-volume',component:BiggestVolume,name:'Biggest Volume'}, 
  {path: '/ice-cream-flavours', component: IceCreamFlavours, name: 'Ice Cream Flavours'}
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;