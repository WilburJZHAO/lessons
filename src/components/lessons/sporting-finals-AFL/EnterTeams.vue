<template>
  <div>
    <transition appear appear-class="app-appear" appear-active-class="app-appear-active">
      <div class="container mt-3 mb-5">
        <h3 class="lesson-subheading">Enter teams and select final eight</h3>
        <hr class="subheading-separator" />
        <div class="row">
          <!-- Left part -->
          <div class="col-12 col-md-6 app--lesson-left">
            <div>
              <h5 class="text-success">{{ instruction }}</h5>
              <div class="app--lesson-action">
                <div @change="remeberWords" ref="dropzone">
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span1"
                    >1</span>
                    <div v-bind:class="classV">
                      <label for="input" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input"
                          minlength="1"
                          id="input"
                          placeholder="Team Name"
                          v-model="input1"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag1"
                      id="dragID1"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input1 }}</div>
                  </div>

                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span2"
                    >2</span>
                    <div v-bind:class="classV">
                      <label for="input2" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input2"
                          minlength="1"
                          id="input2"
                          placeholder="Team Name"
                          v-model="input2"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag2"
                      id="dragID2"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input2 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span3"
                    >3</span>
                    <div v-bind:class="classV">
                      <label class="inp drag-drop">
                        <input
                          type="text"
                          ref="input3"
                          minlength="1"
                          id="input3"
                          placeholder="Team Name"
                          v-model="input3"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag3"
                      id="dragID3"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input3 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span4"
                    >4</span>
                    <div v-bind:class="classV">
                      <label for="input4" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input4"
                          minlength="1"
                          id="input4"
                          placeholder="Team Name"
                          v-model="input4"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag4"
                      id="dragID4"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input4 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span5"
                    >5</span>
                    <div v-bind:class="classV">
                      <label for="input5" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input5"
                          minlength="1"
                          id="input5"
                          placeholder="Team Name"
                          v-model="input5"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag5"
                      id="dragID5"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input5 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span6"
                    >6</span>
                    <div v-bind:class="classV">
                      <label class="inp drag-drop">
                        <input
                          type="text"
                          ref="input6"
                          minlength="1"
                          id="input6"
                          placeholder="Team Name"
                          v-model="input6"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag6"
                      id="dragID6"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input6 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span7"
                    >7</span>
                    <div v-bind:class="classV">
                      <label for="input7" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input7"
                          minlength="1"
                          id="input7"
                          placeholder="Team Name"
                          v-model="input7"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag7"
                      id="dragID7"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input7 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span8"
                    >8</span>
                    <div v-bind:class="classV">
                      <label for="input8" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input8"
                          minlength="1"
                          id="input8"
                          placeholder="Team Name"
                          v-model="input8"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus"
                          @click="plusFunction(0)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag8"
                      id="dragID8"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input8 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span9"
                    >9</span>
                    <div v-bind:class="classV">
                      <label for="input9" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input9"
                          minlength="1"
                          id="input9"
                          placeholder="Team Name"
                          v-model="input9"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus2"
                          @click="plusFunction(1)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag9"
                      id="dragID9"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input9 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus2">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span10"
                    >10</span>
                    <div v-bind:class="classV">
                      <label for="input10" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input10"
                          minlength="1"
                          id="input10"
                          placeholder="Team Name"
                          v-model="input10"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus3"
                          @click="plusFunction(2)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag10"
                      id="dragID10"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input10 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus3">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span11"
                    >11</span>
                    <div v-bind:class="classV">
                      <label for="input11" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input11"
                          minlength="1"
                          id="input11"
                          placeholder="Team Name"
                          v-model="input11"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus4"
                          @click="plusFunction(3)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag11"
                      id="dragID11"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input11 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus4">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span12"
                    >12</span>
                    <div v-bind:class="classV">
                      <label for="input12" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input12"
                          minlength="1"
                          id="input12"
                          placeholder="Team Name"
                          v-model="input12"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus5"
                          @click="plusFunction(4)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag12"
                      id="dragID12"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input12 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus5">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span13"
                    >13</span>
                    <div v-bind:class="classV">
                      <label for="input13" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input13"
                          minlength="1"
                          id="input13"
                          placeholder="Team Name"
                          v-model="input13"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus6"
                          @click="plusFunction(5)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag13"
                      id="dragID13"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input13 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus6">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span14"
                    >14</span>
                    <div v-bind:class="classV">
                      <label for="input14" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input14"
                          minlength="1"
                          id="input14"
                          placeholder="Team Name"
                          v-model="input14"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus7"
                          @click="plusFunction(6)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag14"
                      id="dragID14"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input14 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus7">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span15"
                    >15</span>
                    <div v-bind:class="classV">
                      <label for="input15" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input15"
                          minlength="1"
                          id="input15"
                          placeholder="Team Name"
                          v-model="input15"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus8"
                          @click="plusFunction(7)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag15"
                      id="dragID15"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input15 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus8">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span16"
                    >16</span>
                    <div v-bind:class="classV">
                      <label for="input16" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input16"
                          minlength="1"
                          id="input16"
                          placeholder="Team Name"
                          v-model="input16"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus9"
                          @click="plusFunction(8)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag16"
                      id="dragID16"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input16 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus9">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-success mr-1"
                      ref="span17"
                    >17</span>
                    <div v-bind:class="classV">
                      <label for="input17" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input17"
                          minlength="1"
                          id="input17"
                          placeholder="Team Name"
                          v-model="input17"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                        <span
                          v-if="plus10"
                          @click="plusFunction(9)"
                          class="badge badge-dark plusAName"
                          style="font-size: 115%;height:30px;width: 30px;border-radius: 20px"
                        >+</span>
                      </label>
                    </div>
                    <div
                      ref="drag17"
                      id="dragID17"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input17 }}</div>
                  </div>
                  <div class="row" style="margin-bottom: 15px" v-if="minus10">
                    <span
                      style="font-size: 115%;display: inline-block;width: 30px"
                      class="badge badge-secondary mr-1"
                      ref="span18"
                    >18</span>
                    <div v-bind:class="classV">
                      <label for="input18" class="inp drag-drop">
                        <input
                          type="text"
                          ref="input18"
                          minlength="1"
                          id="input18"
                          placeholder="Team Name"
                          v-model="input18"
                          v-bind:disabled="dataDisabled"
                          autocomplete="off"
                        />
                      </label>
                    </div>
                    <div
                      ref="drag18"
                      id="dragID18"
                      class="drag-drop"
                      v-bind:class="classC"
                    >{{ input18 }}</div>
                  </div>
                </div>
              </div>
              <div class="tt--solutions mb-5" style="padding-bottom: 30px">
                <div class="mr-3 tt--solutions-count"></div>

                <div class="row">
                  <div>
                    <button
                      style="margin-right:30px"
                      class="btn btn-outline-success btn-lg"
                      @click="submit"
                    >OK</button>
                  </div>

                  <div>
                    <button class="btn btn-outline-success btn-lg" @click="clear">Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right part -->
          <div class="col-12 col-md-6 app--lesson-right" style="overflow: visible;">
            <div class="tt-right-box">
              <div @change="changeRadio">
                <input
                  type="radio"
                  id="one"
                  value="One"
                  style="outline: none;transition: 300ms ease-out;background: #1fc2f5;color: #fff;"
                  v-model="picked"
                />
                <label
                  for="one"
                  style="font-family:'Font Awesome 5 Pro',sans-serif;font-size: 20px;margin-left:5px;color: inherit;"
                >Enter teams</label>
                <br />
                <div v-if="countOfOwnTeamsGreater">
                  <input type="radio" id="two" value="Two" v-model="picked" />
                  <label
                    for="two"
                    style="font-family:'Font Awesome 5 Pro',sans-serif;font-size: 20px;margin-left:5px;color: inherit;"
                  >Select final eight</label>
                </div>
              </div>
              <br />
              <br />

              <div class="sketchy" v-if="hide">
                <div>
                  <button
                    class="btn btn-outline-secondary btn-lg"
                    style="border: white"
                    @click="ourTeamGenerator"
                  >Our teams</button>
                </div>
                <br />
                <div>
                  <button
                    class="btn btn-outline-secondary btn-lg"
                    style="border: white"
                    @click="AFLteamGenerator"
                  >AFL teams</button>
                </div>
              </div>
              <br />
              <br />

              <div>
                <button
                  class="btn btn-outline-success btn-lg"
                  v-if="randomPick"
                  @click="randomPickMethod"
                >Random pick</button>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import interact from "interactjs";
var finalTeam = [
  "Adelaide Crows",
  "Brisbane Lions",
  "GWS Giants",
  "Carlton",
  "Gold Coast Suns",
  "Collingwood",
  "Essendon",
  "Fremantle",
  "Geelong Cats",
  "Hawthorn",
  "Kangaroos",
  "Melbourne",
  "Port Adelaide",
  "Richmond",
  "St Kilda",
  "Sydney Swans",
  "West Coast Eagles",
  "Western Bulldogs"
];
export default {
  finalTeam,
  name: "EnterTeams",
  data: function() {
    return {
      instruction: "Enter a team name",
      plus: true,
      minus: true,
      plus2: false,
      minus2: true,
      plus3: false,
      minus3: true,
      plus4: false,
      minus4: true,
      plus5: false,
      minus5: true,
      plus6: false,
      minus6: true,
      plus7: false,
      minus7: true,
      plus8: false,
      minus8: true,
      plus9: false,
      minus9: true,
      plus10: false,
      minus10: true,
      plus11: false,
      minus11: true,
      plus12: false,
      randomPick: false,
      AFL: [
        "Adelaide Crows",
        "Brisbane Lions",
        "GWS Giants",
        "Carlton",
        "Gold Coast Suns",
        "Collingwood",
        "Essendon",
        "Fremantle",
        "Geelong Cats",
        "Hawthorn",
        "Kangaroos",
        "Melbourne",
        "Port Adelaide",
        "Richmond",
        "St Kilda",
        "Sydney Swans",
        "West Coast Eagles",
        "Western Bulldogs"
      ],
      picked: "One",

      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      input10: "",
      input11: "",
      input12: "",
      input13: "",
      input14: "",
      input15: "",
      input16: "",
      input17: "",
      input18: "",

      resTeams: [],
      ownTeams: [],
      recentTeams: [],

      countOfOwnTeams: 0,
      countOfOwnTeamsGreater: false,
      countOfSelected: 0,

      hide: true,
      select: true,

      dataDisabled: false,

      classV: "",
      classC: "hiddenClass"
    };
  },
  created: function() {},
  mounted: function() {
    this.initAllInteract();
    this.disableMinus();

    this.initDropArea(this.$refs.drag1);
    this.initDropArea(this.$refs.drag2);
    this.initDropArea(this.$refs.drag3);
    this.initDropArea(this.$refs.drag4);
    this.initDropArea(this.$refs.drag5);
    this.initDropArea(this.$refs.drag6);
    this.initDropArea(this.$refs.drag7);
    this.initDropArea(this.$refs.drag8);
  },
  methods: {
    disableMinus: function() {
      this.minus = false;
      this.minus2 = false;
      this.minus3 = false;
      this.minus4 = false;
      this.minus5 = false;
      this.minus6 = false;
      this.minus7 = false;
      this.minus8 = false;
      this.minus9 = false;
      this.minus10 = false;
      this.minus11 = false;
    },
    initInteract: function(selector) {
      this.isTrue = false;
      interact(selector).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        //restrict: {
        //restriction: "parent",
        //endOnly: true,
        //elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        // },
        // enable autoScroll
        autoScroll: true,
        onstart: this.start,
        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd
      });
    },
    initInteract3: function(selector) {
      interact(selector).draggable(true);
    },
    disabledDraggable: function(selector) {
      interact(selector).draggable(false);
    },
    dragMoveListener: function(event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
        y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    onDragEnd: function(event) {
      var target = event.target;
      // update the state
      this.screenX = target.getBoundingClientRect().left;
      this.screenY = target.getBoundingClientRect().top;
      this.screenX = 0;
      this.screenY = 0;
      target.style.webkitTransform = target.style.transform =
        "translate(" + 0 + "px, " + 0 + "px)";
      target.setAttribute("data-x", 0);
      target.setAttribute("data-y", 0);
    },
    ondrop: function(event) {
      var draggableElement = event.relatedTarget;
      var dropzoneElement = event.target;

      var dropzoneName = dropzoneElement.id;
      var text = draggableElement.innerHTML;

      if (dropzoneElement == this.$refs.drag1) {
        var a = this.dragIdentify(draggableElement, this.input1);
        this.input1 = a;
        //this.input1 =
      } else if (dropzoneElement == this.$refs.drag2) {
        a = this.dragIdentify(draggableElement, this.input2);
        this.input2 = a;
      } else if (dropzoneElement == this.$refs.drag3) {
        a = this.dragIdentify(draggableElement, this.input3);
        this.input3 = a;
      } else if (dropzoneElement == this.$refs.drag4) {
        a = this.dragIdentify(draggableElement, this.input4);
        this.input4 = a;
      } else if (dropzoneElement == this.$refs.drag5) {
        a = this.dragIdentify(draggableElement, this.input5);
        this.input5 = a;
      } else if (dropzoneElement == this.$refs.drag6) {
        a = this.dragIdentify(draggableElement, this.input6);
        this.input6 = a;
      } else if (dropzoneElement == this.$refs.drag7) {
        a = this.dragIdentify(draggableElement, this.input7);
        this.input7 = a;
      } else if (dropzoneElement == this.$refs.drag8) {
        a = this.dragIdentify(draggableElement, this.input8);
        this.input8 = a;
      }
    },

    dragIdentify: function(target, content) {
      var id;
      if (target == this.$refs.drag1) {
        id = this.input1;
        this.input1 = content;
      } else if (target == this.$refs.drag2) {
        id = this.input2;
        this.input2 = content;
      } else if (target == this.$refs.drag3) {
        id = this.input3;
        this.input3 = content;
      } else if (target == this.$refs.drag4) {
        id = this.input4;
        this.input4 = content;
      } else if (target == this.$refs.drag5) {
        id = this.input5;
        this.input5 = content;
      } else if (target == this.$refs.drag6) {
        id = this.input6;
        this.input6 = content;
      } else if (target == this.$refs.drag7) {
        id = this.input7;
        this.input7 = content;
      } else if (target == this.$refs.drag8) {
        id = this.input8;
        this.input8 = content;
      } else if (target == this.$refs.drag9) {
        id = this.input9;
        this.input9 = content;
      } else if (target == this.$refs.drag10) {
        id = this.input10;
        this.input10 = content;
      } else if (target == this.$refs.drag11) {
        id = this.input11;
        this.input11 = content;
      } else if (target == this.$refs.drag12) {
        id = this.input12;
        this.input12 = content;
      } else if (target == this.$refs.drag13) {
        id = this.input13;
        this.input13 = content;
      } else if (target == this.$refs.drag14) {
        id = this.input14;
        this.input14 = content;
      } else if (target == this.$refs.drag15) {
        id = this.input15;
        this.input15 = content;
      } else if (target == this.$refs.drag16) {
        id = this.input16;
        this.input16 = content;
      } else if (target == this.$refs.drag17) {
        id = this.input17;
        this.input17 = content;
      } else if (target == this.$refs.drag18) {
        id = this.input18;
        this.input18 = content;
      }
      return id;
    },
    initDropArea: function(selector) {
      interact(selector).dropzone({
        // only accept elements matching this CSS selector
        //accept: '.dragID1,.dragID2,.dragID3',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:

        ondropactivate: function(event) {
          // add active dropzone feedback
          event.target.classList.add("drop-active");
        },
        ondragenter: function(event) {
          var draggableElement = event.relatedTarget;
          var dropzoneElement = event.target;

          // feedback the possibility of a drop
          dropzoneElement.classList.add("drop-target");
          //draggableElement.classList.add('can-drop')
          //draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function(event) {
          // remove the drop feedback style
          event.target.classList.remove("drop-target");
          //event.relatedTarget.classList.remove('can-drop')
          //event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: this.ondrop,
        ondropdeactivate: function(event) {
          // remove active dropzone feedback
          event.target.classList.remove("drop-active");
          event.target.classList.remove("drop-target");
        }
      });
    },

    initAllInteract: function() {
      this.initInteract(this.$refs.drag1);
      this.initInteract(this.$refs.drag2);
      this.initInteract(this.$refs.drag3);
      this.initInteract(this.$refs.drag4);
      this.initInteract(this.$refs.drag5);
      this.initInteract(this.$refs.drag6);
      this.initInteract(this.$refs.drag7);
      this.initInteract(this.$refs.drag8);
      this.initInteract(this.$refs.drag9);
      this.initInteract(this.$refs.drag10);
      this.initInteract(this.$refs.drag11);
      this.initInteract(this.$refs.drag12);
      this.initInteract(this.$refs.drag13);
      this.initInteract(this.$refs.drag14);
      this.initInteract(this.$refs.drag15);
      this.initInteract(this.$refs.drag16);
      this.initInteract(this.$refs.drag17);
      this.initInteract(this.$refs.drag18);

      this.disabledDraggable(this.$refs.drag1);
      this.disabledDraggable(this.$refs.drag2);
      this.disabledDraggable(this.$refs.drag3);
      this.disabledDraggable(this.$refs.drag4);
      this.disabledDraggable(this.$refs.drag5);
      this.disabledDraggable(this.$refs.drag6);
      this.disabledDraggable(this.$refs.drag7);
      this.disabledDraggable(this.$refs.drag8);
      this.disabledDraggable(this.$refs.drag9);
      this.disabledDraggable(this.$refs.drag10);
      this.disabledDraggable(this.$refs.drag11);
      this.disabledDraggable(this.$refs.drag12);
      this.disabledDraggable(this.$refs.drag13);
      this.disabledDraggable(this.$refs.drag14);
      this.disabledDraggable(this.$refs.drag15);
      this.disabledDraggable(this.$refs.drag16);
      this.disabledDraggable(this.$refs.drag17);
      this.disabledDraggable(this.$refs.drag18);
    },

    choose: function(event) {
      var cur = event.target;
      var count = 0;
      if (
        cur.classList == "badge badge-success" ||
        cur.classList == "badge badge-secondary"
      ) {
        cur.classList.add("badge-alert");
        this.countOfSelected++;
      } else {
        cur.classList.remove("badge-alert");
        this.countOfSelected--;
      }
    },
    randomPickMethod: function() {
      this.removeAlertTag();
      var count = 0;
      var ownTeams = [];
      if (this.input1 != "") {
        ownTeams.push(this.input1);
        count++;
      }
      if (this.input2 != "") {
        ownTeams.push(this.input2);
        count++;
      }
      if (this.input3 != "") {
        ownTeams.push(this.input3);
        count++;
      }
      if (this.input4 != "") {
        ownTeams.push(this.input4);
        count++;
      }
      if (this.input5 != "") {
        ownTeams.push(this.input5);
        count++;
      }
      if (this.input6 != "") {
        ownTeams.push(this.input6);
        count++;
      }
      if (this.input7 != "") {
        ownTeams.push(this.input7);
        count++;
      }
      if (this.input8 != "") {
        ownTeams.push(this.input8);
        count++;
      }
      if (this.input9 != "") {
        ownTeams.push(this.input9);
        count++;
      }
      if (this.input10 != "") {
        ownTeams.push(this.input10);
        count++;
      }
      if (this.input11 != "") {
        ownTeams.push(this.input11);
        count++;
      }
      if (this.input12 != "") {
        ownTeams.push(this.input12);
        count++;
      }
      if (this.input13 != "") {
        ownTeams.push(this.input13);
        count++;
      }
      if (this.input14 != "") {
        ownTeams.push(this.input14);
        count++;
      }
      if (this.input15 != "") {
        ownTeams.push(this.input15);
        count++;
      }
      if (this.input16 != "") {
        ownTeams.push(this.input16);
        count++;
      }
      if (this.input17 != "") {
        ownTeams.push(this.input17);
        count++;
      }
      if (this.input18 != "") {
        ownTeams.push(this.input18);
        count++;
      }

      var team = this.shuffle(ownTeams);
      this.teamGenerator(team);
    },
    shuffle: function(array) {
      var m = array.length,
        t,
        i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
    initAllTeamDraggable: function(i) {
      this.initInteract3(this.$refs.drag1);
      this.initInteract3(this.$refs.drag2);
      this.initInteract3(this.$refs.drag3);
      this.initInteract3(this.$refs.drag4);
      this.initInteract3(this.$refs.drag5);
      this.initInteract3(this.$refs.drag6);
      this.initInteract3(this.$refs.drag7);
      this.initInteract3(this.$refs.drag8);

      if (i >= 1) {
        this.initInteract(this.$refs.drag9);
      }
      if (i >= 2) {
        this.initInteract(this.$refs.drag10);
      }
      if (i >= 3) {
        this.initInteract(this.$refs.drag11);
      }
      if (i >= 4) {
        this.initInteract(this.$refs.drag12);
      }
      if (i >= 5) {
        this.initInteract(this.$refs.drag13);
      }
      if (i >= 6) {
        this.initInteract(this.$refs.drag14);
      }
      if (i >= 7) {
        this.initInteract(this.$refs.drag15);
      }
      if (i >= 8) {
        this.initInteract(this.$refs.drag16);
      }
      if (i >= 9) {
        this.initInteract(this.$refs.drag17);
      }
      if (i >= 10) {
        this.initInteract(this.$refs.drag18);
      }
    },
    disableAllTeamDraggable: function() {
      this.disabledDraggable(this.$refs.drag1);
      this.disabledDraggable(this.$refs.drag2);
      this.disabledDraggable(this.$refs.drag3);
      this.disabledDraggable(this.$refs.drag4);
      this.disabledDraggable(this.$refs.drag5);
      this.disabledDraggable(this.$refs.drag6);
      this.disabledDraggable(this.$refs.drag7);
      this.disabledDraggable(this.$refs.drag8);
      this.disabledDraggable(this.$refs.drag9);
      this.disabledDraggable(this.$refs.drag10);
      this.disabledDraggable(this.$refs.drag11);
      this.disabledDraggable(this.$refs.drag12);
      this.disabledDraggable(this.$refs.drag13);
      this.disabledDraggable(this.$refs.drag14);
      this.disabledDraggable(this.$refs.drag15);
      this.disabledDraggable(this.$refs.drag16);
      this.disabledDraggable(this.$refs.drag17);
      this.disabledDraggable(this.$refs.drag18);
    },
    changeRadio: function() {
      if (this.picked == "Two") {
        this.recentTeams = this.remeberWordsChange();
        this.randomPick = true;

        this.instruction =
          "Hold mouse down and drag to select final 8 positions.";

        var teamNumbers = this.teamGenerator(this.recentTeams);
        this.classV = "displayClass";
        this.classC = "";
        this.initAllTeamDraggable(teamNumbers);
        this.hide = false;

        //this.initAllInteract()

        //this.initAllTeamDraggable(teamNumbers)
        this.dataDisabled = true;

        //this.initAllInteract()
      } else {
        this.hide = true;
        this.randomPick = false;
        this.instruction = "Enter a team name";
        this.dataDisabled = false;
        this.countOfSelected = 0;
        this.removeAlertTag();
        this.disableAllTeamDraggable();
        this.classV = "";
        this.classC = "hiddenClass";
      }
    },
    removeAlertTag: function() {
      if (
        this.$refs.span1.classList == "badge badge-success badge-alert" ||
        this.$refs.span1.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span1.classList.remove("badge-alert");
      }
      if (
        this.$refs.span2.classList == "badge badge-success badge-alert" ||
        this.$refs.span2.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span2.classList.remove("badge-alert");
      }

      if (
        this.$refs.span3.classList == "badge badge-success badge-alert" ||
        this.$refs.span3.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span3.classList.remove("badge-alert");
      }
      if (
        this.$refs.span4.classList == "badge badge-success badge-alert" ||
        this.$refs.span4.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span4.classList.remove("badge-alert");
      }
      if (
        this.$refs.span5.classList == "badge badge-success badge-alert" ||
        this.$refs.span5.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span5.classList.remove("badge-alert");
      }
      if (
        this.$refs.span6.classList == "badge badge-success badge-alert" ||
        this.$refs.span6.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span6.classList.remove("badge-alert");
      }
      if (
        this.$refs.span7.classList == "badge badge-success badge-alert" ||
        this.$refs.span7.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span7.classList.remove("badge-alert");
      }
      if (
        this.$refs.span8.classList == "badge badge-success badge-alert" ||
        this.$refs.span8.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span8.classList.remove("badge-alert");
      }
      if (
        this.$refs.span9.classList == "badge badge-success badge-alert" ||
        this.$refs.span9.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span9.classList.remove("badge-alert");
      }
      if (
        this.$refs.span10.classList == "badge badge-success badge-alert" ||
        this.$refs.span10.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span10.classList.remove("badge-alert");
      }
      if (
        this.$refs.span11.classList == "badge badge-success badge-alert" ||
        this.$refs.span11.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span11.classList.remove("badge-alert");
      }
      if (
        this.$refs.span12.classList == "badge badge-success badge-alert" ||
        this.$refs.span12.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span12.classList.remove("badge-alert");
      }
      if (
        this.$refs.span13.classList == "badge badge-success badge-alert" ||
        this.$refs.span13.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span13.classList.remove("badge-alert");
      }
      if (
        this.$refs.span14.classList == "badge badge-success badge-alert" ||
        this.$refs.span14.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span14.classList.remove("badge-alert");
      }
      if (
        this.$refs.span15.classList == "badge badge-success badge-alert" ||
        this.$refs.span15.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span15.classList.remove("badge-alert");
      }
      if (
        this.$refs.span16.classList == "badge badge-success badge-alert" ||
        this.$refs.span16.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span16.classList.remove("badge-alert");
      }
      if (
        this.$refs.span17.classList == "badge badge-success badge-alert" ||
        this.$refs.span17.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span17.classList.remove("badge-alert");
      }
      if (
        this.$refs.span18.classList == "badge badge-success badge-alert" ||
        this.$refs.span18.classList == "badge badge-secondary badge-alert"
      ) {
        this.$refs.span18.classList.remove("badge-alert");
      }
    },
    remeberWordsChange: function() {
      var ownTeamsChange = [];
      var count = 0;
      if (this.input1 != "") {
        ownTeamsChange.push(this.input1);
        count++;
      }
      if (this.input2 != "") {
        ownTeamsChange.push(this.input2);
        count++;
      }
      if (this.input3 != "") {
        ownTeamsChange.push(this.input3);
        count++;
      }
      if (this.input4 != "") {
        ownTeamsChange.push(this.input4);
        count++;
      }
      if (this.input5 != "") {
        ownTeamsChange.push(this.input5);
        count++;
      }
      if (this.input6 != "") {
        ownTeamsChange.push(this.input6);
        count++;
      }
      if (this.input7 != "") {
        ownTeamsChange.push(this.input7);
        count++;
      }
      if (this.input8 != "") {
        ownTeamsChange.push(this.input8);
        count++;
      }
      if (this.input9 != "") {
        ownTeamsChange.push(this.input9);
        count++;
      }
      if (this.input10 != "") {
        ownTeamsChange.push(this.input10);
        count++;
      }
      if (this.input11 != "") {
        ownTeamsChange.push(this.input11);
        count++;
      }
      if (this.input12 != "") {
        ownTeamsChange.push(this.input12);
        count++;
      }
      if (this.input13 != "") {
        ownTeamsChange.push(this.input13);
        count++;
      }
      if (this.input14 != "") {
        ownTeamsChange.push(this.input14);
        count++;
      }
      if (this.input15 != "") {
        ownTeamsChange.push(this.input15);
        count++;
      }
      if (this.input16 != "") {
        ownTeamsChange.push(this.input16);
        count++;
      }
      if (this.input17 != "") {
        ownTeamsChange.push(this.input17);
        count++;
      }
      if (this.input18 != "") {
        ownTeamsChange.push(this.input18);
        count++;
      }
      return ownTeamsChange;
    },
    remeberWords: function() {
      var count = 0;
      this.ownTeams = [];
      if (this.input1 != "") {
        this.ownTeams.push(this.input1);
        count++;
      }
      if (this.input2 != "") {
        this.ownTeams.push(this.input2);
        count++;
      }
      if (this.input3 != "") {
        this.ownTeams.push(this.input3);
        count++;
      }
      if (this.input4 != "") {
        this.ownTeams.push(this.input4);
        count++;
      }
      if (this.input5 != "") {
        this.ownTeams.push(this.input5);
        count++;
      }
      if (this.input6 != "") {
        this.ownTeams.push(this.input6);
        count++;
      }
      if (this.input7 != "") {
        this.ownTeams.push(this.input7);
        count++;
      }
      if (this.input8 != "") {
        this.ownTeams.push(this.input8);
        count++;
      }
      if (this.input9 != "") {
        this.ownTeams.push(this.input9);
        count++;
      }
      if (this.input10 != "") {
        this.ownTeams.push(this.input10);
        count++;
      }
      if (this.input11 != "") {
        this.ownTeams.push(this.input11);
        count++;
      }
      if (this.input12 != "") {
        this.ownTeams.push(this.input12);
        count++;
      }
      if (this.input13 != "") {
        this.ownTeams.push(this.input13);
        count++;
      }
      if (this.input14 != "") {
        this.ownTeams.push(this.input14);
        count++;
      }
      if (this.input15 != "") {
        this.ownTeams.push(this.input15);
        count++;
      }
      if (this.input16 != "") {
        this.ownTeams.push(this.input16);
        count++;
      }
      if (this.input17 != "") {
        this.ownTeams.push(this.input17);
        count++;
      }
      if (this.input18 != "") {
        this.ownTeams.push(this.input18);
        count++;
      }
      this.countOfOwnTeams = count;
      if (this.countOfOwnTeams > 8) {
        this.countOfOwnTeamsGreater = true;
      } else {
        this.countOfOwnTeamsGreater = false;
      }
    },
    returnFinalTeam() {
      return finalTeam;
    },
    submit: function() {
      var count = 0;
      if (this.input1 != "") {
        this.resTeams.push(this.input1);
        count++;
      } else {
        this.resTeams.push(this.AFL[0]);
      }
      if (this.input2 != "") {
        this.resTeams.push(this.input2);
        count++;
      } else {
        this.resTeams.push(this.AFL[1]);
      }
      if (this.input3 != "") {
        this.resTeams.push(this.input3);
        count++;
      } else {
        this.resTeams.push(this.AFL[2]);
      }
      if (this.input4 != "") {
        this.resTeams.push(this.input4);
        count++;
      } else {
        this.resTeams.push(this.AFL[3]);
      }
      if (this.input5 != "") {
        this.resTeams.push(this.input5);
        count++;
      } else {
        this.resTeams.push(this.AFL[4]);
      }
      if (this.input6 != "") {
        this.resTeams.push(this.input6);
        count++;
      } else {
        this.resTeams.push(this.AFL[5]);
      }
      if (this.input7 != "") {
        this.resTeams.push(this.input7);
        count++;
      } else {
        this.resTeams.push(this.AFL[6]);
      }
      if (this.input8 != "") {
        this.resTeams.push(this.input8);
        count++;
      } else {
        this.resTeams.push(this.AFL[7]);
      }
      if (this.input9 != "") {
        this.resTeams.push(this.input9);
        count++;
      }
      if (this.input10 != "") {
        this.resTeams.push(this.input10);
        count++;
      }
      if (this.input11 != "") {
        this.resTeams.push(this.input11);
        count++;
      }
      if (this.input12 != "") {
        this.resTeams.push(this.input12);
        count++;
      }
      if (this.input13 != "") {
        this.resTeams.push(this.input13);
        count++;
      }
      if (this.input14 != "") {
        this.resTeams.push(this.input14);
        count++;
      }
      if (this.input15 != "") {
        this.resTeams.push(this.input15);
        count++;
      }
      if (this.input16 != "") {
        this.resTeams.push(this.input16);
        count++;
      }
      if (this.input17 != "") {
        this.resTeams.push(this.input17);
        count++;
      }
      if (this.input18 != "") {
        this.resTeams.push(this.input18);
        count++;
      }
      finalTeam = this.resTeams;
      this.$emit("backToMenu", -1);
    },
    remainEight: function(i) {
      if (i == 0) {
        this.plus = true;
        this.minus = false;
        this.plus2 = false;
      } else if (i == 1) {
        this.plus2 = true;
        this.minus2 = false;
        this.plus3 = false;
      } else if (i == 2) {
        this.plus3 = true;
        this.minus3 = false;
        this.plus4 = false;
      } else if (i == 3) {
        this.plus4 = true;
        this.minus4 = false;
        this.plus5 = false;
      } else if (i == 4) {
        this.plus5 = true;
        this.minus5 = false;
        this.plus6 = false;
      } else if (i == 5) {
        this.plus6 = true;
        this.minus6 = false;
        this.plus7 = false;
      } else if (i == 6) {
        this.plus7 = true;
        this.minus7 = false;
        this.plus8 = false;
      } else if (i == 7) {
        this.plus8 = true;
        this.minus8 = false;
        this.plus9 = false;
      } else if (i == 8) {
        this.plus9 = true;
        this.minus9 = false;
        this.plus10 = false;
      } else if (i == 9) {
        this.plus10 = true;
        this.minus10 = false;
        this.plus11 = false;
      }
    },
    clear: function() {
      if (this.input1 != "") {
        this.input1 = "";
      }
      if (this.input2 != "") {
        this.input2 = "";
      }
      if (this.input3 != "") {
        this.input3 = "";
      }
      if (this.input4 != "") {
        this.input4 = "";
      }
      if (this.input5 != "") {
        this.input5 = "";
      }
      if (this.input6 != "") {
        this.input6 = "";
      }
      if (this.input7 != "") {
        this.input7 = "";
      }
      if (this.input8 != "") {
        this.input8 = "";
      }
      if (this.input9 != "") {
        this.input9 = "";
      }
      if (this.input10 != "") {
        this.input10 = "";
      }
      if (this.input11 != "") {
        this.input11 = "";
      }
      if (this.input12 != "") {
        this.input12 = "";
      }
      if (this.input13 != "") {
        this.input13 = "";
      }
      if (this.input14 != "") {
        this.input14 = "";
      }
      if (this.input15 != "") {
        this.input15 = "";
      }
      if (this.input16 != "") {
        this.input16 = "";
      }
      if (this.input17 != "") {
        this.input17 = "";
      }
      if (this.input18 != "") {
        this.input18 = "";
      }
      for (var i = 9; i >= 0; i--) {
        this.remainEight(i);
      }
      this.countOfOwnTeamsGreater = false;
      //this.disableAllTeamDraggable()
    },
    plusFunction: function(i) {
      if (i == 0) {
        this.plus = false;
        this.minus = true;
        this.plus2 = true;
      } else if (i == 1) {
        this.plus2 = false;
        this.minus2 = true;
        this.plus3 = true;
      } else if (i == 2) {
        this.plus3 = false;
        this.minus3 = true;
        this.plus4 = true;
      } else if (i == 3) {
        this.plus4 = false;
        this.minus4 = true;
        this.plus5 = true;
      } else if (i == 4) {
        this.plus5 = false;
        this.minus5 = true;
        this.plus6 = true;
      } else if (i == 5) {
        this.plus6 = false;
        this.minus6 = true;
        this.plus7 = true;
      } else if (i == 6) {
        this.plus7 = false;
        this.minus7 = true;
        this.plus8 = true;
      } else if (i == 7) {
        this.plus8 = false;
        this.minus8 = true;
        this.plus9 = true;
      } else if (i == 8) {
        this.plus9 = false;
        this.minus9 = true;
        this.plus10 = true;
      } else if (i == 9) {
        this.plus10 = false;
        this.minus10 = true;
        this.plus11 = true;
      }
    },
    teamGenerator: function(team) {
      this.clear();

      var length = team.length;
      var count = 0;

      for (let i = 0; i < length; i++) {
        this.inputToTeam(i, team[i]);
        count++;
      }
      if (count >= 8) {
        for (var j = 0; j < count - 8; j++) {
          this.plusFunction(j);
        }
      }
      return count;
    },
    ourTeamGenerator: function() {
      this.countOfOwnTeamsGreater = false;

      this.clear();
      var length = this.ownTeams.length;
      var count = 0;
      for (let i = 0; i < length; i++) {
        this.inputToTeam(i, this.ownTeams[i]);
        count++;
      }
      if (count >= 8) {
        for (var j = 0; j < count - 8; j++) {
          this.plusFunction(j);
        }
        this.countOfOwnTeamsGreater = true;
      }
    },
    inputToTeam: function(i, j) {
      if (i == 0) {
        this.input1 = j;
      } else if (i == 1) {
        this.input2 = j;
      } else if (i == 2) {
        this.input3 = j;
      } else if (i == 3) {
        this.input4 = j;
      } else if (i == 4) {
        this.input5 = j;
      } else if (i == 5) {
        this.input6 = j;
      } else if (i == 6) {
        this.input7 = j;
      } else if (i == 7) {
        this.input8 = j;
      } else if (i == 8) {
        this.input9 = j;
      } else if (i == 9) {
        this.input10 = j;
      } else if (i == 10) {
        this.input11 = j;
      } else if (i == 11) {
        this.input12 = j;
      } else if (i == 12) {
        this.input13 = j;
      } else if (i == 13) {
        this.input14 = j;
      } else if (i == 14) {
        this.input15 = j;
      } else if (i == 15) {
        this.input16 = j;
      } else if (i == 16) {
        this.input17 = j;
      } else if (i == 17) {
        this.input18 = j;
      }
    },
    AFLteamGenerator: function() {
      this.countOfOwnTeamsGreater = true;
      for (var i = 0; i < 10; i++) {
        this.plusFunction(i);
      }

      this.input1 = this.AFL[0];
      this.input2 = this.AFL[1];
      this.input3 = this.AFL[2];
      this.input4 = this.AFL[3];
      this.input5 = this.AFL[4];
      this.input6 = this.AFL[5];
      this.input7 = this.AFL[6];
      this.input8 = this.AFL[7];
      this.input9 = this.AFL[8];
      this.input10 = this.AFL[9];
      this.input11 = this.AFL[10];
      this.input12 = this.AFL[11];
      this.input13 = this.AFL[12];
      this.input14 = this.AFL[13];
      this.input15 = this.AFL[14];
      this.input16 = this.AFL[15];
      this.input17 = this.AFL[16];
      this.input18 = this.AFL[17];
    }
  }
};
</script>

<style scoped>
#outer-dropzone {
  height: 140px;
}

#inner-dropzone {
  height: 80px;
}

.dropzone {
  background-color: #ccc;
  border: dashed 4px transparent;
  border-radius: 4px;
  margin: 10px auto 30px;
  padding: 10px;
  width: 80%;
  transition: background-color 0.3s;
}

.drop-active {
  border-color: #aaa;
}

.drop-target {
  background-color: #29e;
  border-color: #fff;
  border-style: solid;
}

#app--lesson-action .inp {
  margin: auto;
  width: 80%;
  max-width: 280px;
  /* //transform: rotateX(45deg) rotateY(-10deg) rotate(25deg) scale(2) */
}
#app--lesson-action .label {
  position: absolute;
  top: 16px;
  left: 0;
  font-size: 16px;
  color: #9098a9;
  font-weight: 500;
  transform-origin: 0 0;
  transition: all 0.2s ease;
}

.app--lesson-action input {
  -webkit-appearance: none;
  width: 80%;
  border: 0;
  font-family: inherit;
  padding: 12px 0;
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #c8ccd4;
  background: none;
  border-radius: 0;
  color: #223254;
  transition: all 0.15s ease;
}
.inp :focus,
.inp :focus input {
  background: #eeeeee;
  outline: none;
}
.inp :hover {
  background-color: #eeeeee;
}
.app--lesson-action .plusAName:hover,
.app--lesson-action .plusAName:hover span {
  background: #7f8c8d;
}

.app--lesson-action span {
  height: 30px;
}
.sketchy {
  border: dashed 5px #cccccc;
  text-align: center;
}
.badge.badge-success.badge-alert {
  background: #cc3333;
}
.badge.badge-secondary.badge-alert {
  background: #cc3333;
}
.drag-drop {
  -ms-touch-action: none;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 100px;
  min-height: 20px;
}
.hiddenClass {
  visibility: hidden;
}
.displayClass {
  display: none;
}
</style>
