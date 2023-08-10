import React from "react";
import { Grid, Typography, hexToRgb } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LineGraph from "./LineGraph";
import ComplexityGraph from "./ComplexityGraph";
import DoughnutChart from "./Doughnut";

const Graphs = ({application}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const graphWordings = [
    "This is the Score Evaluation graph. The Score evaluation graph looks at each attempt at the user question and outputs the corresponding score, aka the number of test cases passed.",
    "This is the Resume Parser graph looks at the users resume and compares it with the job description, outputting a percentage of how the Resume matches the Job Posting",
    "This is the Complexity Analysis graph looks at each user attempt at the question and gives back the graphical function",
  ];

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={2}
      sx={{ height: "805px" }}
    >
      <Grid item md={12} mt={"1rem"}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Score Evaluation" style={{ color: "#fff" }} />
          <Tab label="Resume Parser" style={{ color: "#fff" }} />
          <Tab label="Complexity Analysis" style={{ color: "#fff" }} />
        </Tabs>
      </Grid>
      <Grid
        item
        md={11}
        sx={{ background: "#202123", borderRadius: "20px", height: "615px" }}
      >
        {(() => {
          switch (value) {
            case 0:
              return (
                <>
                  <Grid container justifyContent={"center"}>
                  {application.codingQuestionResultArray ? (
                  <LineGraph height={"350px"} application={application}/>
                    ) : (
                      <div>Loading..</div>
                    )}
                    <Typography
                      sx={{ color: "#fff", mt: 2, textAlign: "center", p: 2 }}
                    >
                      {graphWordings[0]}
                    </Typography>
                  </Grid>
                </>
              );
            case 1:
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    marginTop: "-130px",
                  }}
                >
                  <DoughnutChart
                    height={"700px"}
                    width={"700px"}
                    top={"65%"}
                    left={"50%"}
                    fontSize={"55px"}
                    application={application}
                  />
                  <Grid
                    container
                    mt={"-170px"}
                    justifyContent={"center"}
                    ml={"6rem"}
                  >
                    <Grid item md={4}>
                      <Typography sx={{ color: "#fff", mt: 2, ml: 27 }}>
                        0
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography sx={{ color: "#fff", mt: 2, ml: 6 }}>
                        Number of Key Words
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography sx={{ color: "#fff", mt: 2, ml: 5 }}>
                        100
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{
                      color: "#fff",
                      mt: 4,
                      textAlign: "center",
                    }}
                  >
                    {graphWordings[1]}
                  </Typography>
                </div>
              );
            case 2:
              return (
                <>
                  <Grid container justifyContent={"center"}>
                    <ComplexityGraph width={"1000px"} height={"500px"} />
                    <Typography
                      sx={{
                        color: "#fff",
                        mt: 2,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {graphWordings[2]}
                    </Typography>
                  </Grid>
                </>
              );
            default:
              return (
                <>
                  <Grid container justifyContent={"center"}>
                  {application.codingQuestionResultArray ? (
                  <LineGraph height={"350px"} application={application}/>
                    ) : (
                      <div>Loading..</div>
                    )}
                    <Typography
                      sx={{ color: "#fff", mt: 2, textAlign: "center", p: 2 }}
                    >
                      {graphWordings[0]}
                    </Typography>
                  </Grid>
                </>
              );
          }
        })()}
      </Grid>
    </Grid>
  );
};

export default Graphs;