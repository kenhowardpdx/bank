import localforage from "localforage";

const store = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: "bank.localstorage",
});

export default store;
