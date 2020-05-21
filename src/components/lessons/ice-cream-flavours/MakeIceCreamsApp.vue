<template>
  <div class="container mt-4 mb-5">
    <div class="row">
      <h4 class="text text-success mb-4">Click on the scoops to build your ice cream</h4>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 mb-2">
        <div class="app--making-ice-cream">
          <div class="app--img-flavours">
            <ul>
              <li v-for="(flavour, index) in flavours" :key="index">
                <img
                  :src="flavour.imgSrc"
                  :data-name="flavour.imgName"
                  :data-index="flavour.imgIndex"
                  :style="{visibility: flavour.display ? 'visible' : 'hidden'}"
                  @click="handleSelectFlavour"
                />
              </li>
            </ul>
            <button
              class="btn btn-outline-secondary"
              @click="handleClear"
              :disabled="iceCreamAllFound"
            >Clear</button>
          </div>
          <div class="app--img-cup">
            <img
              v-for="(flavour, index) in flavoursSelected"
              :key="index"
              :src="flavour.imgSrc"
              :style="{zIndex: flavour.zIndex, transform: 'translateY(' + flavour.transformY + '%)' } "
            />
            <img src="@/assets/cup.jpg" />
          </div>
        </div>
        <div class="text text-danger" v-if="iceCreamExist">The ice cream already exists.</div>
        <div class="text text-danger" v-if="iceCreamAllFound">All ice cream cones are found.</div>
      </div>
      <div class="col-12 col-md-1"></div>
      <div class="col-12 col-md-7 app--ice-cream">
        <div class="row">
          <div
            v-for="(iceCream, index) in iceCreamMade"
            :key="index"
            class="col-4 col-sm-3 col-md-3 col-lg-2 app--img-ice-cream"
          >
            <img
              v-for="(flavour, index) in iceCream.flavours"
              :key="index"
              :src="flavour.imgSrc"
              :style="{zIndex: flavour.zIndex, transform: 'translateY(' + flavour.transformY + '%)' } "
            />
            <img src="@/assets/cup.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { factorial } from "./utils";
export default {
  props: ["numberOfFlavours"],
  data: function() {
    return {
      flavours: [], // The available flavours
      flavoursSelected: [], // The flavours selected
      iceCreamMade: [],
      combination: "", // A string of numbers that represents a combination of flavours.
      iceCreamExist: false, // If the ice cream exists
      iceCreamAllFound: false // If all ice creams are found
    };
  },
  computed: {
    totalNumOfIceCreams: function() {
      return factorial(Number(this.numberOfFlavours));
    },
    allFlavoursSelected() {
      for (let i = 0; i < this.flavours.length; i++) {
        if (this.flavours[i].display) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    handleSelectFlavour(e) {
      if (this.iceCreamAllFound) return;
      // console.log(this.totalNumOfIceCreams);
      const imgIndex = e.target.getAttribute("data-index");
      // this.flavours = this.flavours.filter(flavour => {
      //   // Remove a flavour from this.flavours Array
      //   return Number(flavour.imgIndex) !== Number(imgIndex);
      // });
      this.flavours.forEach(flavour => {
        if (Number(flavour.imgIndex) === Number(imgIndex)) {
          flavour.display = false;
        }
      });

      this.flavoursSelected.unshift(this.createImgObj(imgIndex)); // Add a flavour to this.flavoursSelected Array
      for (let i = this.flavoursSelected.length - 1, k = 0; i >= 0; i--, k++) {
        this.flavoursSelected[i].zIndex = k * 10;
        this.flavoursSelected[i].transformY = k * 15 + 5; // Calculate each image's z-index and transformY property
      }

      // console.log(this.flavoursSelected);
      if (this.allFlavoursSelected) {
        const combination = this.calCombination(this.flavoursSelected);

        let existedIceCream = this.iceCreamMade.findIndex(iceCream => {
          // Check if the ice-cream exists
          return iceCream.combination === combination;
        });

        if (existedIceCream !== -1) {
          this.iceCreamExist = true;
          return;
        }
        this.iceCreamExist = false;
        // console.log(this.combination);

        const flavoursArr = this.flavoursSelected.slice(0);
        const iceCream = this.makeIceCream(combination, flavoursArr);
        this.iceCreamMade.push(iceCream);
        // console.log(this.iceCreamMade.length);
        if (this.iceCreamMade.length === this.totalNumOfIceCreams) {
          this.iceCreamAllFound = true;
        }
      }
      // console.log(this.iceCreamMade);
    },

    handleClear() {
      this.iceCreamExist = false;
      this.setFlavours();
      this.flavoursSelected.splice(0, this.flavoursSelected.length);
    },

    createImgObj(index) {
      return {
        img: `flavour-${index}.jpg`,
        imgName: `flavour-${index}`,
        imgIndex: index,
        imgSrc: require(`../../../assets/flavour-${index}.jpg`),
        display: true
      };
    },

    setFlavours() {
      // Reset this.flavours Array
      this.flavours.splice(0, this.flavours.length);
      for (let i = 1; i <= Number(this.numberOfFlavours); i++) {
        this.flavours.push(this.createImgObj(i));
      }
    },

    calCombination(flavoursArr) {
      // Calculate the combination of flavours
      let combination = "";
      for (let flavour of flavoursArr) {
        combination += flavour.imgIndex;
      }
      return combination;
    },

    makeIceCream(combination, flavoursArr) {
      // Make an ice-cream
      return {
        combination,
        flavours: flavoursArr
      };
    }
  },
  created() {
    this.setFlavours();
    // console.log(this.flavours);
  }
};
</script>

<style scoped>
.app--making-ice-cream {
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  height: 500px;
  position: relative;
}
.app--img-cup {
  flex: 1;
  position: absolute;
  bottom: 0;
  right: 15px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
/* .app--img-cup img.app--img-cup-flavour {
	} */

.app--img-flavours {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}
.app--img-flavours img {
  margin-bottom: 15px;
  cursor: pointer;
}
.app--img-flavours button {
  position: absolute;
  bottom: 30px;
  left: 8%;
}

.app--ice-cream {
  border: 1px solid blue;
}
.app--img-ice-cream {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app--img-ice-cream img {
  width: 50%;
  height: auto;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
