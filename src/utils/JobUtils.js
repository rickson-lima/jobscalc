module.exports = {
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
}