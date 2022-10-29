import React, { useState } from 'react';
import { CKEditor } from "ckeditor4-react";
import { supabase } from '../lib/initSupabase';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react'

function App() {
  const [formFields, setFormFields] = useState([
    { ingredient: '', quantity: '' },
  ])
  const [otherfields, setOtherFields] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState("");
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }
  const handleOther = (event) => {
    let data = { ...otherfields };
    data[event.target.name] = event.target.value;
    setOtherFields(data);
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const iglist = ingQua();
    const title = otherfields.title;
    const description = otherfields.description;

    if (description === "" || title === "" || instructions === "" || iglist.length === 0) {
      setLoading(false);
      return;
    }
    // console.log(iglist, title, description, instructions,"submit txt")
    const { error } = await supabase
      .from('recipe')
      .insert({ title, description, instructions, iglist });
    if (error) {
      console.log(error);
    } else {
      console.log("success");
      window.location.href = "/";
    }
    setLoading(false);
  }
  const addFields = () => {
    let object = {
      ingredient: '',
      quantity: ''
    }
    setFormFields([...formFields, object])
  }
  const ingQua = () => {
    let data = "";
    formFields.map((item, index) => {
      if (item.ingredients !== "" && item.quantity !== "")
        data += item.ingredient + "->" + item.quantity + ";^;";
    });
    return data;
  }
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const isError = () => {
    const iglist = ingQua();
    const title = otherfields.title;
    const description = otherfields.description;
    const instructions = instructions;

    if (description === "" || title === "" || instructions === "" || iglist.length === 0) {
      return true;
    }
    return false
  }

  return (
    <FormControl padding={50} isInvalid={isError}>
      <FormLabel>Title</FormLabel>
      <Input required name='title' type='text' value={otherfields.title} onChange={handleOther} />
      <FormLabel>Description</FormLabel>
      <Input required type='text' name='description' value={otherfields.description} onChange={handleOther} />
      {formFields.map((form, index) => {
        return (
          <div key={index}>
            <input
              name='ingredient'
              placeholder='Ingredient'
              onChange={event => handleFormChange(event, index)}
              value={form.ingredient}
              disabled={loading}
            />
            <input
              name='quantity'
              placeholder='Quantity'
              onChange={event => handleFormChange(event, index)}
              value={form.quantity}
              disabled={loading}
            />
            <button onClick={() => removeFields(index)}>Remove</button>
          </div>
        )
      })}
      <button onClick={addFields}>Add More..</button>
      <CKEditor
        data="<p>Hello from CKEditor 4!</p>"
        onChange={(event) => {
          setInstructions(event.editor.getData());
        }}
      />
      {!isError ? (
        <FormHelperText>
          Everything is good!
        </FormHelperText>
      ) : (
        <FormErrorMessage>All fields are required.</FormErrorMessage>
      )}
      <Button
        mt={4}
        colorScheme='teal'
        isLoading={loading}
        onClick={submit}
        disabled={loading}
      >
        Submit
      </Button>
    </FormControl>
  )
}

export default App;