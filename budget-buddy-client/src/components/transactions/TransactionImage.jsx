import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

function ImageToTextConverter() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSyBA-ljqvGDlV9IFOvL1PtTbt4BzmlvTh_A'); // Replace with your API key

  useEffect(() => {
    // Validate Gemini API key (optional)
    if (!geminiApiKey) {
      console.error('Please provide a valid Gemini AI API key.');
    }
  }, [geminiApiKey]);

 

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setSelectedImage(event.target.files[0]);
    } else {
      alert('Please select only one image.');
    }
  };
  const downloadTextFile = () => {
    if (!extractedText) {
      alert('No text extracted yet. Please convert an image first.');
      return;
    }

    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted_text.txt';
    link.click();
  };

  const handleConvertClick = async () => {
    if (!selectedImage) {
      alert('Please select an image to convert.');
      return;
    }

    setIsProcessing(true);
    setExtractedText(''); // Clear previous text

    try {
      // Access your API key as an environment variable (see "Set up your API key" above)
      const genAI = new GoogleGenerativeAI("AIzaSyBA-ljqvGDlV9IFOvL1PtTbt4BzmlvTh_A");

      const imagePart = await fileToGenerativePart(selectedImage);

      const prompt = "Extract text from this image"; // Modified prompt
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Replace with appropriate model if needed

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      setExtractedText(text);
    } catch (error) {
      console.error('Error during text extraction:', error);
      alert('An error occurred while processing the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="image-to-text-converter">
      <h1>Image to Text Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleConvertClick} disabled={isProcessing}>
        {isProcessing ? 'Converting...' : 'Convert Image to Text'}
      </button>
      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <pre>{extractedText}</pre>
          <button onClick={downloadTextFile}>Download as Text File</button> (Functionality not implemented yet)
        </div>
      )}
      {!geminiApiKey && <p className="error">Please enter your Gemini AI API key.</p>}
    </div>
  );
}

export default ImageToTextConverter;
