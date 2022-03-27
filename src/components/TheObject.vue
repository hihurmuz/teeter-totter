<template>
  <div class="the-object" :class="objectStyles">
    <div class="the-object__weight">{{ objectInfo.weight }} kg</div>
  </div>
</template>

<script>
export default {
  name: "TheObject",
  props: {
    onBoard: {
      type: Boolean,
      default: false,
    },
    isRandomCreated: {
      type: Boolean,
      default: false,
    },
    objectInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    objectStyles() {
      const { type } = this.objectInfo;
      return {
        "the-object--square": type === 1,
        "the-object--triangle": type === 2,
        "the-object--circle": type === 3,
      };
    },
  },
  mounted() {
    this.setObjectStyles();
    this.$watch("objectInfo.left", this.setObjectPlacement, { immediate: true });
  },
  methods: {
    setObjectStyles() {
      const { style } = this.$el;
      const { color, scale, type } = this.objectInfo;
      if (type === 2) {
        style.borderBottomColor = color;
      } else {
        style.backgroundColor = color;
      }
      style.transform = `scale(${scale})`;
      if (this.onBoard) {
        style.transform += " translateY(-100%)";
      }
    },

    setObjectPlacement(left) {
      const { width } = this.$el.getBoundingClientRect();
      const start = this.isRandomCreated ? 60 : 0;

      this.$el.style.left =
        this.isRandomCreated && left > 25 ? `calc(${start + left}% - ${width}px)` : `${start + left}%`;
    },
  },
};
</script>
