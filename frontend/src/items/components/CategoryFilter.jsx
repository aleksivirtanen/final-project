import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const CategoryFilter = (props) => {
  const [state, setState] = useState({
    shelters: true,
    sleepingbags: true,
    firewarmth: true,
    campcooking: true,
    canteens: true,
    hygiene: true,
  });

  const handleChange = (event) => {
    let currentState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(currentState);
    props.checkboxHandler(currentState);
  };

  const { shelters, sleepingbags, firewarmth, campcooking, canteens, hygiene } =
    state;

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={shelters}
              onChange={handleChange}
              name="shelters"
            />
          }
          label="Shelters"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sleepingbags}
              onChange={handleChange}
              name="sleepingbags"
            />
          }
          label="Sleeping Bags and Pads"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={firewarmth}
              onChange={handleChange}
              name="firewarmth"
            />
          }
          label="Fire and Warmth"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={campcooking}
              onChange={handleChange}
              name="campcooking"
            />
          }
          label="Camp Cooking and Field Stoves"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={canteens}
              onChange={handleChange}
              name="canteens"
            />
          }
          label="Canteens and Hydration Bladders"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hygiene}
              onChange={handleChange}
              name="hygiene"
            />
          }
          label="Hygiene and Wash up"
        />
      </FormGroup>
    </FormControl>
  );
};

export default CategoryFilter;