

import  { useState, useRef } from 'react';
import './App.css'
const Camera = () => {
  const [CameraisOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const closeCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setCameraOpen(false);
  };

  return (
    <div>
      <button onClick={CameraisOpen ? closeCamera : openCamera}>
        {CameraisOpen ? 'Close Camera' : 'Open Camera'}
      </button>
      {CameraisOpen && <video ref={videoRef} autoPlay />}
    </div>
  );
};

export default Camera;
