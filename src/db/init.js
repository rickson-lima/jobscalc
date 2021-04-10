const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database(); // init db connection

    // create profile table
    await db.exec(`
      CREATE TABLE profile (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         avatar TEXT,
         monthly_budget INT,
         days_per_week INT,
         hours_per_day INT,
         vacation_per_year INT,
         value_hour INT
      )
   `);

    // create jobs table
    await db.exec(`
      CREATE TABLE jobs (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         daily_hours INT,
         total_hours INT,
         created_at DATETIME
      )
   `);

    // insert into profile table
    await db.run(`
      INSERT INTO profile (
         name,
         avatar,
         monthly_budget,
         days_per_week,
         hours_per_day,
         vacation_per_year,
         value_hour
      ) VALUES (
         "Rickson Lima",
         "https://github.com/rickson-lima.png",
         2600,
         5,
         8,
         3,
         62
      )
   `);

    // insert into jobs table
    await db.run(`
      INSERT INTO jobs (
         name,
         daily_hours,
         total_hours,
         created_at
      ) VALUES (
         "Pizzaria KeyDiria",
         2,
         1,
         161751436018
      )
   `);

    // insert into jobs table
    await db.run(`
      INSERT INTO jobs (
         name,
         daily_hours,
         total_hours,
         created_at
      ) VALUES (
         "Projeto Dois",
         3,
         50,
         161751436018
      )
   `);

    await db.close(); // close db connection
  },
};

initDb.init();