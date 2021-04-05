// the model folder returns data
let data = {
  name: "Rickson Lima",
  avatar: "https://github.com/rickson-lima.png",
  "monthly-budget": 2400,
  "days-per-week": 5,
  "hours-per-day": 6,
  "vacation-per-year": 3,
  "value-hour": 69,
};

module.exports = {
   get(){
      return data
   },

   update(newData){
      data = newData
   }
}