const Database = require("../db/config");

module.exports = {
  async get() {
    const db = await Database();

    // all command returns all results from a select query, instead get
    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();

    const formatedJobs = jobs.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at,
    }));

    return formatedJobs;
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    db.run(`UPDATE jobs SET
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob["daily-hours"]},
      total_hours = ${updatedJob["total-hours"]}
      WHERE id = ${jobId}
    `)

    await db.close()
  },

  async delete(id) {
    const db = await Database()

    db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()

    // decrementa o id do job que for maior do que o deletedJobId
   //  data.forEach((job) => {
   //    if (job.id > id) job.id = job.id - 1;
   //  });
  },

  async create(newJob) {
   const db = await Database()

   await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
   ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.created_at}
   )`)

   await db.close()
  },
};
