const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { json } = require("express");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];
let tasksStocker = [];

const addTask = () => {
  rl.question("Nom: ", (nom) => {
    rl.question("TITRE: ", (task) => {
      rl.question("DESCRIPTION: ", (description) => {
        let getDate = new Date();
        date = getDate.toLocaleTimeString();
        console.log(date);
        tasks.push({ nom, task, description, date });
        askCommande();
      });
    });
  });
};

function enregistrerChoixUtilisateur() {
  const filepath = path.join(__dirname, "taskUtilisateur.json");
  if (fs.existsSync(filepath)) {
    tasksStocker = JSON.parse(fs.readFileSync(filepath));
  }
  tasksStocker.push(tasks);
  fs.writeFileSync(filepath, JSON.stringify(tasksStocker, null, 2));
}
const list = () => {
  console.log("liste de tache");
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}.Nom:${task.nom}  Titre: ${task.task}, Description: ${
        task.description
      }, Date: ${task.date} `
    );
  });
  console.log("-----------------------------------");
  askCommande();
};

const askCommande = () => {
  rl.question(
    "Hijery ireo listr'ireo asa sa hanampy sa hiala? (add/list/recherche)",
    (valiny) => {
      if (valiny === "add") {
        addTask();
      } else if (valiny === "list") {
        list();
      } else if (valiny === "recherche") {
        rl.question("Recherche une task ", (tasks) => {
          trouveTask(tasks);
          addTask();
        });
      } else {
        askCommande();
        enregistrerChoixUtilisateur();
      }
      askCommande();
    }
  );
};

const trouveTask = (taskChecher) => {
  let requeteTask = tasks.filter((task) => {
    task.task.toLowerCase() || task.description.toLowerCase() || task.date;
  });
  if (requeteTask.length > 0) {
    requeteTask.forEach((task) => {
      console.log(
        `Titre :${task.task}, Description: ${task.description}, Date: ${task.date}`
      );
    });
  } else {
    console.log(`Tsy misy an'io ${taskChecher}`);
  }
  askCommande();
};

askCommande();
