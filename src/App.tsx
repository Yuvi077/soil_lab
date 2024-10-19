import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Activity, Droplet, Zap, AlertOctagon } from 'lucide-react';
import SoilSeparationAnimation from './components/SoilSeparationAnimation';
import TestResults from './components/TestResults';
import TestAnimation from './components/TestAnimation';
import SAMLogo from './components/SAMLogo';

const socket = io('http://localhost:3000');

function App() {
  const [status, setStatus] = useState('Separating soil...');
  const [testResult, setTestResult] = useState(null);
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    socket.on('updateStatus', (newStatus) => {
      setStatus(newStatus);
    });

    socket.on('testResult', (data) => {
      setTestResult(data);
      setCurrentTest(null);
    });

    // Start separation automatically
    socket.emit('startSeparation');

    return () => {
      socket.off('updateStatus');
      socket.off('testResult');
    };
  }, []);

  const startTest = (testType) => {
    socket.emit('startTest', testType);
    setCurrentTest(testType);
  };

  const abortTest = () => {
    socket.emit('abortTest');
    setCurrentTest(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Soil Analysis Module</h1>
        <SAMLogo />
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2" /> Status: {status}
        </h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <button
            onClick={() => startTest('dry')}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
            disabled={currentTest !== null}
          >
            <Zap className="mr-2" /> Dry Analysis
          </button>
          <button
            onClick={() => startTest('wet')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            disabled={currentTest !== null}
          >
            <Droplet className="mr-2" /> Wet Analysis
          </button>
          <button
            onClick={() => startTest('spectroscopic')}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300 flex items-center justify-center"
            disabled={currentTest !== null}
          >
            <AlertOctagon className="mr-2" /> Spectroscopic Test
          </button>
          <button
            onClick={abortTest}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            disabled={currentTest === null}
          >
            Abort Test
          </button>
        </div>
      </div>

      {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8" style={{ height: '400px' }}>
        <SoilSeparationAnimation />
        {currentTest && <TestAnimation testType={currentTest} />}
      </div> */}

      {testResult && <TestResults result={testResult} />}
    </div>
  );
}

export default App;