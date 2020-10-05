import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index.js';
import SharedBody from './SharedBody.jsx';

const generateOnSubmit = (args) => async ({ name }, { setErrors }) => {
  const { channel, hideModalHandler, dispatch } = args;

  if (channel.name === name) {
    hideModalHandler();

    return;
  }
  try {
    await dispatch(actions.renameChannel({ id: channel.id, name }));
    hideModalHandler();
  } catch (error) {
    console.log(error);
    setErrors({ networkError: error.message });
  }
};

const Rename = (props) => {
  const { hideModalHandler, channel } = props;
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [null]);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: generateOnSubmit({ channel, hideModalHandler, dispatch }),
  });

  return (
    <SharedBody
      inputRef={inputRef}
      formik={formik}
      hideModalHandler={hideModalHandler}
    />
  );
};

export default Rename;
