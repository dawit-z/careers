const { computed, reactive, toRefs } = require("vue");

const person = reactive({
  firstName: "Dawit",
  lastName: "Zewelday",
});

const { firstName, lastName } = toRefs(person);
const name = computed(() => `${firstName.value} ${lastName.value} the Great`);

console.log(name.value);
person.firstName = "Michael";
console.log(name.value);
