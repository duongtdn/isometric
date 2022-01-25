"use strict"

export default {

  save: (data) => {
    const metadata = {
      name: "localsave",
      timestamp: (new Date()).getTime(),
    };
    localStorage.setItem("localsave", JSON.stringify({metadata, data}));
  },

  load: () => {
    const file = localStorage.getItem("localsave");
    return file? JSON.parse(file) : undefined;
  },

};
