import {
  Box,
  Button,
  Container,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  tattoosCategories,
} from "../constants";

const UploadTattooForm = () => {
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState(tattoosCategories);
  const [selectedCategory, setSelectedCategory] = useState(
    categoriesOptions[0]
  );

  async function handleFileChange(e) {
    const formFiles = e.target.files;
    const files = Array.from(formFiles).map((file) => file);
    setSelectedFiles(files);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Subir archivos a Firebase Storage

    const uploadTasks = await Promise.all(
      selectedFiles.map((file) =>
        uploadBytes(ref(storage, `tattoos/${title}/${file.name}`), file)
      )
    );

    await Promise.all(uploadTasks);

    // Guardar información en la colección 'tattoo'
    const storagePaths = selectedFiles.map(
      (file) => `tattoos/${title}/${file.name}`
    );

    await addDoc(collection(db, "tattoos"), {
      title,
      category: selectedCategory,
      images: storagePaths,
    });

    // Limpiar el formulario después de guardar
    setTitle("");
    setSelectedCategory("");
    setSelectedFiles([]);
  }

  return (
    <Container
      sx={{
        display:"flex",
        backgroundColor: "primary.main",
        padding: 2,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"form"}
        sx={{ flexDirection: "column", width: "100%" }}
        onSubmit={handleSubmit}
      >
        <InputLabel>Categoría</InputLabel>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          {categoriesOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

        <Box>
          <InputLabel>Título</InputLabel>
          <TextField
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Box>

        <Input
          type="file"
          inputProps={{ multiple: true }}
          onChange={handleFileChange}
          required
        />

        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </Box>

      {selectedFiles.map((file) => (
        <Typography key={file.name}>{file.name}</Typography>
      ))}
    </Container>
  );
};

export default UploadTattooForm;
