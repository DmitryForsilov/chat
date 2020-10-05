import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index.js';
import SharedBody from './SharedBody.jsx';

const generateOnSubmit = (args) => async ({ name }, { setErrors }) => {
  const { hideModalHandler, dispatch } = args;

  try {
    await dispatch(actions.addChannel({ name }));
    hideModalHandler();
  } catch (error) {
    console.log(error);
    setErrors({ networkError: error.message });
  }
};

const Add = (props) => {
  const { hideModalHandler } = props;
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: generateOnSubmit({ hideModalHandler, dispatch }),
  });

  return (
    <SharedBody
      inputRef={inputRef}
      formik={formik}
      hideModalHandler={hideModalHandler}
    />
  );
};

export default Add;
