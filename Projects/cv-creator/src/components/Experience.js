import * as React from "react";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { getDateString } from "../helpers/DateHelper";

export default function Experience({ experienceInfo: info, dispatch }) {
  const [experienceList, setExperienceList] = useState(info);
  const [experienceListDOM, setExperienceListDOM] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  function addExperienceList() {
    const _fromDate = getDateString(fromDate);
    const _toDate = getDateString(toDate);
    const experience = {
      id: experienceList.length + 1,
      position,
      description,
      company,
      city,
      fromDate: _fromDate,
      toDate: _toDate,
    };
    const expList = [...experienceList, experience];
    resetExperience();
    setExperienceList(expList);
  }

  useEffect(() => {
    getExperienceList();
    return () => {
      dispatch({
        type: "experience",
        data: experienceList,
      });
    };
  }, [experienceList]);

  function handleExperienceDelete(index) {
    const filteredList = experienceList.filter((x) => x.id !== index);
    setExperienceList(filteredList);
  }

  function getExperienceList() {
    let experienceDom = "";
    if (experienceList.length === 0) {
      experienceDom = <></>;
      setExperienceListDOM(experienceDom);
      return;
    }
    experienceDom = (
      <>
        <br />
        <Divider />
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell align="right">Company</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">From Date</TableCell>
                <TableCell align="right">To Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {experienceList.map((exp, i) => (
                <TableRow
                  key={exp.position}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {exp.position}
                  </TableCell>
                  <TableCell align="right">{exp.company}</TableCell>
                  <TableCell align="right">{exp.city}</TableCell>
                  <TableCell align="right">{exp.fromDate}</TableCell>
                  <TableCell align="right">{exp.toDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      onClick={() => handleExperienceDelete(i + 1)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );

    setExperienceListDOM(experienceDom);
  }

  function resetExperience(params) {
    setFromDate(new Date());
    setToDate(new Date());
    setCity("");
    setCompany("");
    setPosition("");
    setDescription("");
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Experience
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="position"
            name="position"
            label="Position"
            fullWidth
            autoComplete="experience-position"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="company"
            name="company"
            label="Company"
            fullWidth
            autoComplete="experience-company"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="experience-city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              id="fromDate"
              name="fromDate"
              label="From Date"
              inputFormat="MM/dd/yyyy"
              value={fromDate}
              fullWidth
              onChange={(newValue) => setFromDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              id="toDate"
              name="toDate"
              label="To Date"
              inputFormat="MM/dd/yyyy"
              value={toDate}
              fullWidth
              onChange={(newValue) => setToDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            autoComplete="experience-description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => addExperienceList()}
            name="add"
            id="add"
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>

      {experienceListDOM}
    </>
  );
}
