const express = require("express");

const db = require("./projectsModel");

const router = express.Router();

// POST a new project ----------

router.post("/", (req, res) => {
  const newProject = req.body;

  if (newProject.name && newProject.description) {
    db.addProject(newProject)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error saving your project!" });
      });
  } else {
    res.status(400).json({
      message: "Please provide a name and description for your project!"
    });
  }
});

// GET a project by id ----------

//ADDED FOR AH
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  db.getProjectActions(id).then(projAct => {
    if (projAct) {
      res.json(projAct);
    } else {
      res.status(500).json({ message: "bummer" });
    }
  });
});

router.get("/:id", (req, res) => {
  // Get a project by id, BUT, include an array of actions for that project in your response. That is instead of just sending back,
  // {
  //   "id": 1,
  //   "name": "Graduate Lambda",
  //   "description": "Have to graduate from Lambda School!",
  //   "complete": false,
  // }
  // You'll send back,
  // {
  //   "id": 1,
  //   "name": "Graduate Lambda",
  //   "description": "Have to graduate from Lambda School!",
  //   "complete": false,
  //   "actions": [
  //       {
  //           "id": 1,
  //           "description": "Gotta pass those Sprints!",
  //           "notes": null,
  //           "complete": false
  //       },
  //       {
  //           "id": 3,
  //           "description": "Impress fellow students with skills",
  //           "notes": null,
  //           "complete": false
  //       }
  //   ]
  // }
});

module.exports = router;
