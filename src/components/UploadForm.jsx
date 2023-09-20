import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const UploadForm = ({
  setTitle,
  setSelectedCategories,
  handleFileChange,
  handleSubmit,
  selectedCategories
}) => {
  return (
    <Box component={"form"} flex onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormControl>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
        >
          {selectedCategories.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Input
        type="file"
        inputProps={{ multiple: true }}
        onChange={handleFileChange}
        required
      />

      <Button type="submit">Guardar</Button>
    </Box>
  );
};

export default UploadForm;
