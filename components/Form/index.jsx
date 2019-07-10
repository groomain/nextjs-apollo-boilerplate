import React, { useState } from 'react';
import { FormField, TextInput, Box, Button } from 'grommet';
import { FormLock, View } from 'grommet-icons';

export const CustomTextInput = ({
  field,
  form: { touched, errors },
  htmlFor,
  placeholder,
  value,
  type,
  ...props
}) => (
  <FormField
    label={field.name}
    htmlFor={htmlFor}
    error={touched[field.name] && errors[field.name] ? errors[field.name] : ''}
  >
    <TextInput
      id={htmlFor}
      placeholder={placeholder}
      value={value}
      type={type}
      {...field}
    />
  </FormField>
);

export const CustomPasswordInput = ({
  field,
  form: { touched, errors },
  htmlFor,
  placeholder,
  value,
  type,
  ...props
}) => {
  const [reveal, setReveal] = useState(false);

  return (
    <FormField
      label={field.name}
      htmlFor={htmlFor}
      error={
        touched[field.name] && errors[field.name] ? errors[field.name] : ''
      }
    >
      <Box direction="row" border>
        <TextInput
          id={htmlFor}
          placeholder={placeholder}
          value={value}
          type={reveal ? 'text' : 'password'}
          {...field}
        />
        <Button
          icon={reveal ? <View size="medium" /> : <FormLock size="medium" />}
          onClick={() => setReveal(!reveal)}
        />
      </Box>
    </FormField>
  );
};
