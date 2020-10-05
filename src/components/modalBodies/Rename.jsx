import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { actions } from '../../slices/index.js';

const renderBody = ({ formik, inputRef, hideModalHandler }) => (
  <Modal.Body>
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormControl
          name="newChannelName"
          className="mb-2"
          ref={inputRef}
          value={formik.values.newChannelName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
        />
        <FormControl.Feedback className="d-block" type="invalid">
          {formik.errors.networkError}
          &nbsp;
        </FormControl.Feedback>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" type="button" variant="secondary" onClick={hideModalHandler}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>Submit</Button>
        </div>
      </FormGroup>
    </Form>
  </Modal.Body>
);

const Rename = (props) => {
  const { hideModalHandler, channel } = props;
  const { id, name } = channel;
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [null]);

  const formik = useFormik({
    initialValues: {
      newChannelName: name,
    },
    onSubmit: async ({ newChannelName }, { setErrors }) => {
      if (name === newChannelName) {
        hideModalHandler();

        return;
      }
      try {
        await dispatch(actions.renameChannel({ id, name: newChannelName }));
        hideModalHandler();
      } catch (error) {
        console.log(error);
        setErrors({ networkError: error.message });
      }
    },
  });

  return renderBody({ inputRef, formik, hideModalHandler });
};

export default Rename;