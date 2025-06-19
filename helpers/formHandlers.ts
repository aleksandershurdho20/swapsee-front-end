import React from "react";

type Store<T> = {
  handleEmptyValues: (name: keyof T, label: string) => void;
  handleChange: (name: keyof T, value: string) => void;
};

export const handleSelectBlur = <T>(
  store: Store<T>,
  name: keyof T,
  label: string
) => {
  store.handleEmptyValues(name, label);
};

export const handleChange = <T>(
  store: Store<T>,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = event.target;
  store.handleChange(name as keyof T, value);
};

export const handleFocus = <T>(
  store: Store<T>,
  event: React.ChangeEvent<HTMLInputElement>,
  label: string
) => {
  const { name } = event.target;
  store.handleEmptyValues(name as keyof T, label);
};

export const handleSelectChange = <T>(
  store: Store<T>,
  name: string,
  value:string
) => {
  store.handleChange(name as keyof T, value);
};