import React from "react";
import { NativeSelect, FormControl, InputLabel } from "@mui/material";
import "./styles.css";

interface IDropdown {
  data: string[] | null;
  title: string;
  handleChange: (prop: string) => void;
}

const Dropdown: React.FC<IDropdown> = ({ data, title, handleChange }) => {
  return (
    <div className="dropdownContainer">
      <FormControl className="formControl">
        <InputLabel variant="standard" htmlFor="native-select">
          {title}
        </InputLabel>
        <NativeSelect
          defaultValue=""
          inputProps={{
            id: "native-select",
          }}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">{title}</option>
          {data &&
            data.map(
              (item: string, i: number): JSX.Element => (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            )}
        </NativeSelect>
      </FormControl>
      </div>
  );
};

export default Dropdown;
