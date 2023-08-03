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
}

module.exports = ResumeParserStrategy;