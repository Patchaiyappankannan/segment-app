import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SaveSegmentModal from './SaveSegmentModal';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Save segment
      </Button>
      <SaveSegmentModal show={show} handleClose={handleClose} />
    </div>
  );
}

export default App;
