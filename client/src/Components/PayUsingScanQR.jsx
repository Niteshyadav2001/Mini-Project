import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const PayUsingScanQR = () => {
  const [scanResult, setScanResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);
  const scannerRef = useRef(null);
  const fileInputRef = useRef();

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then(devices => {
        setAvailableCameras(devices);
        if (devices.length) setSelectedCameraId(devices[0].id);
      })
      .catch(err => {
        console.error('Camera fetch error:', err);
        setCameraError('Unable to fetch camera list.');
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {}).then(() => {
          scannerRef.current.clear().catch(() => {});
          scannerRef.current = null;
        });
      }
    };
  }, []);

  const startCamera = async () => {
    if (!selectedCameraId) {
      setCameraError('No camera selected.');
      return;
    }

    setIsCameraActive(true);
    setCameraError(null);
    setScanResult(null);

    await new Promise(res => setTimeout(res, 50));

    try {
      scannerRef.current = new Html5Qrcode('qr-scanner-container');

      await scannerRef.current.start(
        { deviceId: { exact: selectedCameraId } },
        { fps: 10, qrbox: 250 },
        decodedText => {
          setScanResult(decodedText);
          stopCamera();
        },
        errorMsg => {
          console.warn('QR scan error:', errorMsg);
        }
      );
    } catch (err) {
      console.error('Start camera error:', err);
      setCameraError('Failed to start camera. Check permissions.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = async () => {
    if (!scannerRef.current) return;
    try {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
    } catch (e) {
      console.warn('Error stopping scanner:', e);
    } finally {
      scannerRef.current = null;
      setIsCameraActive(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode("qr-scanner-container");
      const result = await html5QrCode.scanFile(file, true);
      setScanResult(result);
    } catch (err) {
      console.error("QR scan from image failed:", err);
      setCameraError("Failed to scan image. Please upload a clear QR code.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pay Using QR Code</h1>

      {availableCameras.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Select Camera:</label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={selectedCameraId}
            onChange={e => setSelectedCameraId(e.target.value)}
          >
            {availableCameras.map(cam => (
              <option key={cam.id} value={cam.id}>
                {cam.label || `Camera ${cam.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {cameraError && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-4">
          {cameraError}
        </div>
      )}

      <div
        id="qr-scanner-container"
        className={`w-full min-h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden ${
          isCameraActive ? '' : 'hidden'
        }`}
        style={{ position: 'relative' }}
      >
        <style>
          {`
            #qr-scanner-container video, 
            #qr-scanner-container canvas {
              width: 100% !important; 
              height: 100% !important; 
              object-fit: cover;
            }
          `}
        </style>
      </div>

      <div className="flex space-x-3 mb-3">
        <button
          onClick={startCamera}
          disabled={isCameraActive}
          className={`flex-1 py-2 px-4 rounded ${
            isCameraActive
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          Start Camera
        </button>
        <button
          onClick={stopCamera}
          disabled={!isCameraActive}
          className={`flex-1 py-2 px-4 rounded ${
            !isCameraActive
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white`}
        >
          Stop Camera
        </button>
      </div>

      <div className="mb-4">
        <button
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded"
          onClick={() => fileInputRef.current.click()}
        >
          🖼️ Upload from gallery
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {scanResult && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded">
          <h3 className="font-semibold text-green-800 dark:text-green-100">Scan Result:</h3>
          <p className="break-all mt-1 text-green-700 dark:text-green-200">{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default PayUsingScanQR;