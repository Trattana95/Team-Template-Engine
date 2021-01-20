const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function init() {
    inquirer.prompt([    
    
        {
        type: "input",
        name: "managerName",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?"
    },
    { 
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }

    ]).then(({managerName, managerId, managerEmail, officeNumber})=> {
        
    let manager = new Manager(managerName, managerId, managerEmail, officeNumber)
    teamMembers.push(manager);
    addTeam();
    });
};

function addTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then((data) => {
        if (data.memberChoice === "Engineer"){
            engineer();

        } else if (data.memberChoice === "Intern"){
            intern();
            
        } else if (createTeam());
    });
};

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name:"engineerId",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's GitHub username?"
        }
    ]). then((data) => {
        let engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        teamMembers.push(engineer);
        addTeam();
    });
};

function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What school is intern from?"
        }
    ]). then((data) => {
        let intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        teamMembers.push(intern);
        addTeam();
    });
};


function createTeam() {
    const teamArray = render(teamMembers);
    fs.writeFile(outputPath, teamArray , (err) =>
    
      err ? console.log(err) : console.log("Success!"));
}

init();