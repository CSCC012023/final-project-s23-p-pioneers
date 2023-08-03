const ResumeParserStrategy = require("./ResumeParserStrategy");

class EdenaiAPIParserStrategy extends ResumeParserStrategy {
    parseResume(resumeData, username) {
        const options = {
            method: "POST",
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2MyMDI1NmItYTU1Ni00N2RkLWE5YWQtMDRiNjhkZWFkYjIwIiwidHlwZSI6ImFwaV90b2tlbiJ9.ylqBTZUgsKRuQkuN31kM8vg0wEaKx9DUXt56q_gM3CQ",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              providers: "affinda",
              file_url: resumeData, // Url of image or pdf file
            }),
          };
          
          fetch("https://api.edenai.run/v2/ocr/resume_parser", options)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {

              // Assuming your JSON data is stored in a variable called 'responseData'
              const skills = data.affinda.extracted_data.skills;

              // Extracting just the names of the skills
              const skillNames = skills.map((skill) => skill.name);
                            
              // Adding the skills to the database
              this.addSkillsToDatabase(skillNames, username);
              
              console.log("------------------------------------");
              console.log(data);
              console.log("------------------------------------");
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
    }
}


module.exports = EdenaiAPIParserStrategy;