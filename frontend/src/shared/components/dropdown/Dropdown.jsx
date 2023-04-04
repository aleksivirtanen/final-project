import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Dropdown = (props) => {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    props.handleCategoryChange(event.target.value);
    setCategory(event.target.value);
  };

  return (
    <div className="category">
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"Shelters"}>Shelters</MenuItem>
          <MenuItem value={"Sleeping Bags and Pads"}>
            Sleeping Bags and Pads
          </MenuItem>
          <MenuItem value={"Fire and Warmth"}>Fire and Warmth</MenuItem>
          <MenuItem value={"Camp Cooking and Field Stoves"}>
            Camp Cooking and Field Stoves
          </MenuItem>
          <MenuItem value={"Canteens and Hydration Bladders"}>
            Canteens and Hydration Bladders
          </MenuItem>
          <MenuItem value={"Hygiene and Wash up"}>Hygiene and Wash up</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
