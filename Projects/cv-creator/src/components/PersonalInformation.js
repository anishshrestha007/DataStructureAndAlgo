import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomImage from "../common/CustomImage";

export default function PersonalInformation({ personalInfo: info, dispatch }) {
  const [firstName, setFirstName] = useState(info.firstName);
  const [lastName, setLastName] = useState(info.lastName);
  const [title, setTitle] = useState(info.title);
  const [address, setAddress] = useState(info.address);
  const [phone, setPhone] = useState(info.phone);
  const [email, setEmail] = useState(info.email);
  const [description, setDescription] = useState(info.description);
  const [github, setGitHub] = useState(info.github);
  const [linkedin, setLinkedIn] = useState(info.linkedin);
  const [photo, setPhoto] = useState(info.photo);

  useEffect(() => {
    return () => {
      dispatch({
        type: "personal",
        data: {
          firstName,
          lastName,
          title,
          address,
          phone,
          email,
          description,
          linkedin,
          github,
          photo,
        },
      });
    };
  }, [
    firstName,
    lastName,
    title,
    address,
    phone,
    email,
    description,
    github,
    linkedin,
    photo,
  ]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="person-title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="person-address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="person-phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="person-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="github"
            name="github"
            label="Github Profile"
            fullWidth
            autoComplete="person-github"
            onChange={(e) => setGitHub(e.target.value)}
            value={github}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="linkedin"
            name="linkedin"
            label="Linkedin Profile"
            fullWidth
            autoComplete="person-linkedin"
            onChange={(e) => setLinkedIn(e.target.value)}
            value={linkedin}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            autoComplete="person-description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomImage photo={photo} setPhoto={(value) => setPhoto(value)} />
        </Grid>
      </Grid>
    </>
  );
}
