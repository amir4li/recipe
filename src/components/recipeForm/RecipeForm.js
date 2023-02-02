import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, FieldArray, Field } from 'formik';
import { recipeSchema } from './validate';
import { Stack, TextField, Button, Typography, Box, IconButton, InputAdornment, Input } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, EditOutlined } from '@mui/icons-material';
import Dropzone from "react-dropzone";


function RecipeForm() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const handleFormSubmit = async (values, onSubmitProps)=> {

        // Image upload to cloudinary
        const { photo } = values;
        const formData = new FormData()
        try {
            formData.append("file", photo)
            formData.append("upload_preset", "omd4wotw");
            formData.append("cloud_name", "hln4lqhjx");
            const res = await axios.post("https://api.cloudinary.com/v1_1/hln4lqhjx/image/upload", formData);
            values.photo = res.data.url
        } catch (err) {
            console.log(err)
        };

        // Sending data to backend 
        try {
            const res = await axios.post("http://localhost:5000/api/v1/recipes", values,
            { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"} });

            onSubmitProps.resetForm();           
            navigate("/my-recipes")
        } catch (err) {
            console.log(err)
        }
    };

    const initialRecipeValues = {
        name: "",
        category: "",
        origin: "",
        description: "",
        ingredients: [""],
        preparation: [""],
        photo: ""
    };

    return (
        <Formik
            initialValues= {initialRecipeValues}
            validationSchema={recipeSchema}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                setFieldValue,
                handleBlur,
                handleChange,
                handleSubmit
            })=> (
                <Form onSubmit={handleSubmit}>
                <Stack
                    margin="auto"
                    width="80%"
                    gap="30px"
                    color="#000"
                >
                <TextField
                    size="small"
                    variant="standard"
                    label="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    type="text"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    type="text"
                    error={Boolean(touched.category) && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="origin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.origin}
                    name="origin"
                    type="text"
                    error={Boolean(touched.origin) && Boolean(errors.origin)}
                    helperText={touched.origin && errors.origin}
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    type="text"
                    error={Boolean(touched.description) && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                />

                {/* Ingredients array input */}
                <Stack>
                <FieldArray name="ingredients">
                    {({push, remove})=> (
                        <Stack>
                        <Typography textAlign="left">Ingredients:</Typography>
                        {values.ingredients.map((ingredient, index)=> (
                            <Stack key={index} marginBottom={2}>
                            <TextField
                                size="small"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={ingredient}
                                name={ingredient}
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={()=> remove(index)} edge="end">
                                            {<RemoveCircleOutline />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                            </Stack>
                        ))}
                        <IconButton onClick={()=> push("")} disableRipple>
                            {<AddCircleOutline fontSize="large" sx={{ color: "limegreen" }} />}
                        </IconButton>
                        </Stack>
                    )}
                </FieldArray>
                </Stack>

                {/* Preparation array input */}
                <Stack>
                <FieldArray name="preparation">
                    {({push, remove})=> (
                        <>
                        <Typography textAlign="left">Preparation:</Typography>
                        {values.preparation.map((step, index)=> (
                            <Stack key={index} marginBottom={2}>
                            <TextField
                                size="small"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={step}
                                name={step}
                                type="text"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={()=> remove(index)} edge="end">
                                            {<RemoveCircleOutline />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                            </Stack>
                        ))}
                        <IconButton onClick={()=> push("")} disableRipple>
                            {<AddCircleOutline fontSize="large" sx={{ color: "limegreen" }} />}
                        </IconButton>
                        </>
                    )}
                </FieldArray>
                </Stack>
                
                {/* Image upload */}
                <Stack>
                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("photo", acceptedFiles[0])
                    }
                >
                    {({ getRootProps, getInputProps }) => (
                    <Box
                        {...getRootProps()}
                        border={"2px dashed #111"}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                    
                    <input {...getInputProps()}/>
                    {!values.photo ? (
                        <p>Add Picture Here</p>
                    ) : (
                        <Stack>
                        <Typography>{values.photo.name}</Typography>
                        <EditOutlined />
                        </Stack>
                    )}
                    </Box>
                    )}
                  </Dropzone>
                  </Stack>
                <Button type="submit" variant='contained'>Submit</Button>
                </Stack>
                </Form>
            )
            }
            
        </Formik>
    )
}

export default RecipeForm;

