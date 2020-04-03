const inquirer = require("inquirer")
const fs = require("fs")
const axios = require("axios")



inquirer
    .prompt([
        {
            type: "input",
            message: "What is your project titled?",
            name: "projectName"
        },
        {
            type: "input",
            message: "What is a description of your project?",
            name: "description"
        },
        {
            type: "input",
            message: "How do you install your project?",
            name: "install"
        },
        {
            type: "input",
            message: "What are the use cases for your project?",
            name: "usage"
        },
        {
            type: "list",
            message: "What licenses were used?",
            choices: ["MIT", "GPL v3", "AGPL"],
            name: "licenses"
        },
        {
            type: "input",
            message: "Who else contributed to this project?",
            name: "contributors"
        },
        {
            type: "input",
            message: "How do you test the file?",
            name: "tests"
        },
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "gitHubName"
        }, 
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        }
    ]).then(function(userInput){
        let projectName = userInput.projectName
        let descripton = userInput.description
        let install = userInput.install
        let usage = userInput.usage
        let licenses = userInput.licenses
        let contributors = userInput.contributors
        let tests = userInput.tests
        let githubName = userInput.gitHubName
        let email = userInput.email

        if(licenses === "MIT"){
            licenses = "[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)"
        } else if(licenses === "GPL v3"){
            licenses = "[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)"
        } else if (licenses === "AGPL"){
            licenses = "[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)"
        }

        const githubURL = `https://api.github.com/users/${githubName}`
        axios
            .get(githubURL)
            .then(function(response){
                image = response.data.avatar_url
                link = response.data.html_url
                name = response.data.name
const readmeFile =
`# ${projectName}

## Descripton
${descripton}
                        
## Table of Contents
                        
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Tests](#tests)
                        
## Installation
${install}
                        
## Usage
${usage}
                        
## License
${licenses}
                
## Tests
${tests}
                
## Contact
![profile image](${image})
<br/>
${name}
<br/>
[GitHub Page](${link})
<br/>
${email}
                `
                        
                        fs.writeFile(`READ.md`, readmeFile,err=>{
                            if(err){
                                return console.log(err)
                            }
                            console.log("New README.md created")
                        })
            })
    })