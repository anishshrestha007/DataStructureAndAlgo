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
export default function Education({ educationInfo: info, dispatch }) {
  const [educationList, setEducationList] = useState(info);
  const [educationListDOM, setEducationListDOM] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  function addEducationList() {
    const _fromDate = getDateString(fromDate);
    const _toDate = getDateString(toDate);
    const education = {
      id: educationList.length + 1,
      university,
      degree,
      subject,
      city,
      fromDate: _fromDate,
      toDate: _toDate,
    };
    const expList = [...educationList, education];
    resetEducation();
    setEducationList(expList);
  }

  useEffect(() => {
    getEducationList();
    return () => {
      dispatch({
        type: "education",
        data: educationList,
      });
    };
  }, [educationList]);

  function handleEducationDelete(index) {
    const filteredList = educationList.filter((x) => x.id !== index);
    setEducationList(filteredList);
  }

  function getEducationList() {
    let educationDom = "";
    if (educationList.length === 0) {
      educationDom = <></>;
      setEducationListDOM(educationDom);
      return;
    }
    educationDom = (
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
                <TableCell align="right">University</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Degree</TableCell>
                <TableCell align="right">Subject</TableCell>
                <TableCell align="right">From Date</TableCell>
                <TableCell align="right">To Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educationList.map((exp, i) => (
                <TableRow
                  key={exp.university}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {exp.university}
                  </TableCell>

                  <TableCell align="right">{exp.city}</TableCell>
                  <TableCell align="right">{exp.degree}</TableCell>
                  <TableCell align="right">{exp.subject}</TableCell>
                  <TableCell align="right">{exp.fromDate}</TableCell>
                  <TableCell align="right">{exp.toDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      onClick={() => handleEducationDelete(i + 1)}
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

    setEducationListDOM(educationDom);
  }

  function resetEducation(params) {
    setFromDate(new Date());
    setToDate(new Date());
    setCity("");
    setUniversity("");
    setDegree("");
    setSubject("");
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="university"
            name="university"
            label="University"
            fullWidth
            autoComplete="education-university"
            onChange={(e) => setUniversity(e.target.value)}
            value={university}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="education-city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="degree"
            name="degree"
            label="Degree"
            fullWidth
            autoComplete="education-degree"
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="subject"
            name="subject"
            label="Subject"
            fullWidth
            autoComplete="education-subject"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
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
          <Button
            onClick={() => addEducationList()}
            name="add"
            id="add"
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {educationListDOM}
    </>
  );
}
