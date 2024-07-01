import React, { useState } from 'react';
import { Modal, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function SaveSegmentModal({ show, handleClose }) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);

  const handleAddSchema = (schema) => {
    setSelectedSchemas([...selectedSchemas, schema]);
    setAvailableSchemas(availableSchemas.filter((option) => option.value !== schema.value));
  };

  const handleSave = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    try {
      const response = await axios.post('https://webhook.site/your-webhook-url', data);
      console.log('Response:', response);
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save Segment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSegmentName">
            <Form.Label>Segment Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSchema">
            <Form.Label>Add schema to segment</Form.Label>
            <DropdownButton id="dropdown-basic-button" title="Select schema">
              {availableSchemas.map((option) => (
                <Dropdown.Item key={option.value} onClick={() => handleAddSchema(option)}>
                  {option.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>

          {selectedSchemas.map((schema, index) => (
            <div key={index} className="schema-item">
              {schema.label}
            </div>
          ))}

          <Button variant="link" onClick={() => handleAddSchema({ label: '', value: '' })}>
            + Add new schema
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save segment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveSegmentModal;
