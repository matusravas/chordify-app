module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // "presets":[
  //   "es2015", "react", "stage-0"
  // ]
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
