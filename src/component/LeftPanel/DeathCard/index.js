import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import BugReportIcon from "@material-ui/icons/BugReport";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";

import "./index.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    margin: "0 auto",
    marginBottom: "10px",
    backgroundColor: theme.palette.primary.main,
    width: "20vw",
  },
  content: {
    width: "20vw",
  },
  text: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
  },
  primaryText: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    fontWeight: 600,
  },
  secondaryText: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    fontWeight: 300,
    fontSize: "1em",
    marginTop: "10px",
  },
  icon: {
    marginRight: "10px",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.light,
  },
}));

const ActiveCard = (props) => {
  const { provinceData } = props; // [{provinceData} , {provinceData}]
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          className={classes.text}
          color="white"
          align="center"
        >
          New Deaths
        </Typography>
        <div className="death-card-stats--container">
          <Avatar className={classes.icon}>
            <BugReportIcon />
          </Avatar>
          <Typography
            variant="h5"
            component="h2"
            color="primary"
            className={classes.primaryText}
          >
            {provinceData[1].Deaths - provinceData[0].Deaths}
          </Typography>
        </div>
        <Typography
          variant="h5"
          component="h2"
          color="primary"
          className={classes.secondaryText}
          align="center"
        >
          Confirmed Deaths: {provinceData[1].Deaths}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActiveCard;
