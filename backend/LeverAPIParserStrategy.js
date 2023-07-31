const axios = require('axios');
const ResumeParserStrategy = require('./ResumeParserStrategy');

class LeverAPIParserStrategy extends ParserStrategy{
    async parseResume(resumeData) {
        const apiKey = 'YOUR_LEVER_API_KEY';
        try {
            const apiUrl = 'https://api.lever.co/v0/resumes/parse';
      
            const headers = {
              'Authorization': `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
              'Content-Type': 'application/json'
            };
      
            const response = await axios.post(apiUrl, resumeData, { headers });
      
            // Extracting the parsedData object from the response
            const { parsedData } = response.data;
      
            // Assuming 'parsedData' contains the candidate's work history, education, etc.
            // You can further process 'parsedData' according to your needs and return it.
            return parsedData;
          } catch (error) {
            console.error('Error parsing resume:', error.message);
            throw error;
          }
        }
      }

module.exports = LeverAPIParserStrategy;