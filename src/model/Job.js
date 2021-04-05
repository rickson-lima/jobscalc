let data = [
   {
     id: 1,
     name: "Pizzaria Gulosa",
     "daily-hours": 2,
     "total-hours": 1,
     created_at: Date.now(), // atribuindo data de hoje
   },
   {
     id: 2,
     name: "OneTwo Project",
     "daily-hours": 5,
     "total-hours": 47,
     created_at: Date.now(),  // atribuindo data de hoje
   },
];

module.exports = {
   get() {
      return data
   },

   update(newJob) {
      data = newJob
   },

   delete(id) {
      // remove o job com o id passado
      data = data.filter(job => Number(job.id) !== Number(id))

      // decrementa o id do job que for maior do que o deletedJobId
      data.forEach(job => {
         if (job.id > id ) job.id = job.id - 1
      })

   }
}