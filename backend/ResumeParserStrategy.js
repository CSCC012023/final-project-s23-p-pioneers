class ResumeParserStrategy {
    parseResume(resume, username) {
        throw new Error('You have to implement the method!');
    }
    addSkillsToDatabase(newSkills, username) {
        
        const apiUrl = "http://localhost:8000";
        fetch(`${apiUrl}/addskills`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              newSkills: newSkills,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Skills updated successfully");
            })
            .catch((error) => {
              console.error("Failed to update skills:", error.message);
            });
    }
    async addGithubToDatabase(github, username) {
        const apiUrl = "http://localhost:8000";
        fetch(`${apiUrl}/addGithub`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              github: github,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Github updated successfully");
            })
            .catch((error) => {
              console.error("Failed to update github:", error.message);
            });
    }
    async addLinkedInToDatabase(linkedin, username) {
        const apiUrl = "http://localhost:8000";
        fetch(`${apiUrl}/addLinkedin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              linkedin: linkedin,
            }),

          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("LinkedIn updated successfully");
            })
            .catch((error) => {
              console.error("Failed to update LinkedIn:", error.message);
            });
    }
}

module.exports = ResumeParserStrategy;