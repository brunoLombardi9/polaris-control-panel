import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  collectionOptions,
  tattoosCategories,
  galleryCategories,
} from "../constants";

const ControlPanel = () => {
  const [title, setTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(
    collectionOptions[0]
  );
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
        uploadBytes(
          ref(storage, `${selectedCollection}/${title}/${file.name}`),
          file
        )
      )
    );

    await Promise.all(uploadTasks);

    // Guardar información en la colección 'tattoo'
    const storagePaths = selectedFiles.map(
      (file) => `${selectedCollection}/${title}/${file.name}`
    );

    await addDoc(collection(db, selectedCollection), {
      title,
      category: selectedCategory,
      images: storagePaths,
    });

    // Limpiar el formulario después de guardar
    setTitle("");
    setSelectedCategory("");
    setSelectedFiles([]);
  }

  useEffect(() => {
    selectedCollection === collectionOptions[0]
      ? setCategoriesOptions(tattoosCategories)
      : setCategoriesOptions(galleryCategories);
  }, [selectedCollection]);

  return (
    <Container>
      <FormControl>
        <InputLabel>Colección</InputLabel>
        <Select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          required
        >
          {collectionOptions.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box component={"form"} flex onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <FormControl>
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
        </FormControl>

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

export default ControlPanel;
