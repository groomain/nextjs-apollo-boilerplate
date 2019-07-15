import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormField, TextInput, Box, Button } from 'grommet';
import { FormLock, View } from 'grommet-icons';

export const CustomTextInput = ({
  field,
  form: { touched, errors },
  htmlFor,
  placeholder,
  type,
}) => {
  return (
    <FormField
      label={field.name}
      htmlFor={htmlFor}
      error={
        touched[field.name] && errors[field.name] ? errors[field.name] : ''
      }
    >
      <TextInput
        id={htmlFor}
        placeholder={placeholder}
        type={type}
        {...field}
      />
    </FormField>
  );
};

CustomTextInput.propTypes = {
  form: PropTypes.shape({ touched: PropTypes.string, errors: PropTypes.string })
    .isRequired,
  field: PropTypes.shape({ name: PropTypes.string }).isRequired,
  htmlFor: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

CustomTextInput.defaultProps = {
  htmlFor: '',
  placeholder: '',
  type: '',
};

export const CustomPasswordInput = ({
  field,
  form: { touched, errors },
  htmlFor,
  placeholder,
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

CustomPasswordInput.propTypes = {
  form: PropTypes.shape({ touched: PropTypes.string, errors: PropTypes.string })
    .isRequired,
  field: PropTypes.shape({ name: PropTypes.string }).isRequired,
  htmlFor: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

CustomPasswordInput.defaultProps = {
  htmlFor: '',
  placeholder: '',
  type: '',
};
