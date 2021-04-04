const express = require("express");
// calling Router function from express module to routes const
const routes = express.Router();
// views folder's path
const views = __dirname + "/views/";
// pseudo-database
const Profile = {
   data: {
      name: "Rickson Lima",
      avatar: "https://github.com/rickson-lima.png",
      "monthly-budget": 2400,
      "days-per-week": 5,
      "hours-per-day": 6,
      "vacation-per-year": 3,
      "value-hour": 69
   },

   controllers: {
      index(req, res) {
         return res.render(views + 'profile', { profile: Profile.data })
      },

      update(req, res) {
         const data = req.body
         // quantas semanas tem em um ano: 52
         const weeksPerYear = 52

         // remover as semanas de férias do ano para pegar quantas semanas tem em 1 mes
         const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

         // total de horas trabalhadas na semana
         const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

         // horas trabalhadas no mês
         const monthlyTotalHours = weekTotalHours * weeksPerMonth

         // qual será o valor da minha hora?
         const valueHour = data["monthly-budget"] / monthlyTotalHours

         Profile.data = {
            ...Profile.data,
            ...req.body,
            "value-hour": valueHour
         }
         return res.redirect('/profile')
      },
   }
};

const Job = {
   data: [
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
   ],

   controllers: {
      index(req, res) {
         const updatedJobs = Job.data.map((job) => {
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            return {
               ...job,
               remaining,
               status,
               budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
            }
         })
         return res.render(views + 'index', { jobs: updatedJobs})
      },

      create(req, res){
         return res.render(views + 'job')
      },

      save(req, res) {
         const lastId = Job.data[Job.data.length - 1]?.id || 0;

         Job.data.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now(),
         })

         return res.redirect('/')
      },

      show(req, res) {
         const jobId = req.params.id

         const job = Job.data.find(job => Number(job.id) === Number(jobId))

         if (!job) return res.send('Job not found!')
         
         job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

         return res.render(views + 'job-edit', { job })
      },

      update(req, res) {
         const jobId = req.params.id

         const job = Job.data.find(job => Number(job.id) === Number(jobId))

         if (!job) return res.send('Job not found!')

         const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
         }

         Job.data = Job.data.map(job => {
            if (Number(job.id) === Number(jobId)) 
               job = updatedJob

            return job
         })

         res.redirect('/job/' + jobId)
      },

      delete(req, res) {
         const jobId = req.params.id

         // não retorna o objeto com id que seja igual ao passado
         Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

         return res.redirect('/')
      }
   },

   services: {
      remainingDays(job) {
         // calculo do tempo restante
         const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
       
         const createdDate = new Date(job.created_at);
         // dia do vencimento do projeto
         const dueDay = createdDate.getDate() + Number(remainingDays);
         // data futura do vencimento
         const dueDateInMs = createdDate.setDate(dueDay);
       
         const timeDiffInMs = dueDateInMs - Date.now();
         // transformar ms em dias
         const dayInMs = 1000 * 60 * 60 * 24;
         const dayDiff = Math.floor(timeDiffInMs / dayInMs);
       
         // restam x dias
         return dayDiff;
      },

      calculateBudget: (job, valueHour) => valueHour * job['total-hours']
   },
}

// returning pages for each router
routes.get("/", Job.controllers.index);

routes.get("/job", Job.controllers.create);
routes.post("/job", Job.controllers.save);
  
routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);

routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)

// exporting this file
module.exports = routes;
