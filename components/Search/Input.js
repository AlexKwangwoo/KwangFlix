import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
  background-color: white;
  margin: 0px 30px;
  padding: 10px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

// onChangeText는 실행되면 우리에게 argument를 준다 string인..
const Input = ({ placeholder, value, onChange, onSubmit }) => (
  <TextInput
    value={value}
    onChangeText={onChange}
    placeholder={placeholder}
    onSubmitEditing={onSubmit}
    returnKevType={"search"}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Input;
