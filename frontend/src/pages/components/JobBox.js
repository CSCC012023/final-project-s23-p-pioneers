import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  jobBox: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  jobImageContainer: {
    width: "100%",
    display: "flex",
  },
  jobImage: {
    flex: 1,
    height: "295px",
    width: "300px",
    borderRadius: "20px 20px 0px 0px",
    background: props => `url(${props.imagePath}) lightgray 50% / 100% 100% no-repeat`,
  },
  
  jobDetails: {
    flex: 1,
    padding: "20px 30px 25px 30px",
    backgroundColor: "#3B3B3B",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  companyName: {
    fontSize: "16px",
    fontWeight: 600,
  },
  positionName: {
    fontSize: "20px",
    fontWeight: 600,
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    marginRight: "10px",
  },
  value: {
    fontSize: "16px",
  },
});

const JobBox = ({ job }) => {
  const classes = useStyles({ imagePath: job.imagePath });

  return (
    <div className={classes.jobBox}>
      <div className={classes.jobImageContainer}>
        <div className={classes.jobImage}></div>
      </div>
      <div className={classes.jobDetails}>
        <Typography variant="h6" className={classes.companyName}>
          {job.companyName}
        </Typography>
        <Typography variant="h5" className={classes.positionName}>
          {job.positionName}
        </Typography>
        <div className={classes.rowContainer}>
          <div>
            <Typography variant="subtitle1" className={classes.label}>
              Location:
            </Typography>
            <Typography variant="body1" className={classes.value}>
              {job.location}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className={classes.label}>
              Type:
            </Typography>
            <Typography variant="body1" className={classes.value}>
              {job.type}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBox;
