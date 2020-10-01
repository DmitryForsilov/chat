import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index.js';

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
    onSubmit: async ({ name }, { setErrors }) => {
      try {
        await dispatch(actions.addChannel({ name }));
        hideModalHandler();
      } catch (error) {
        console.log(error);
        setErrors({ networkError: error.message });
      }
    },
  });

  return (
    <Modal show onHide={hideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              className="mb-2"
              ref={inputRef}
              value={formik.values.name}
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
    </Modal>
  );
};

export default Add;
