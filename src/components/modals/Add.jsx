import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const Add = (props) => {
  const { hideModal, addChannel } = props;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  const hideModalHandler = () => {
    hideModal();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }, { setErrors }) => {
      try {
        await addChannel({ name });
      } catch (error) {
        console.log(error);
        setErrors({ networkError: error.message });
      }

      hideModalHandler();
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
