from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS
CORS(app)

import pytesseract
from pytesseract import Output
import cv2
import pandas as pd
import re
import nltk
from nltk.tokenize import word_tokenize
from flask import request, jsonify
import os

# Download NLTK data (if not already downloaded)
nltk.download('punkt')

# Function to extract structured data from OCR text
def extract_columns(ocr_text):
    lines = ocr_text.split('\n')
    structured_data = []

    for line in lines:
        tokens = word_tokenize(line)

        # Heuristic rules to identify columns
        item = None
        quantity = None
        amount = None

        for token in tokens:
            if re.match(r'^[0-9]+$', token):
                if quantity is None:
                    quantity = token
                else:
                    amount = token
            elif re.match(r'^[0-9]+\.[0-9]{2}$', token):
                amount = token
            else:
                if item is None:
                    item = token
                else:
                    item += f" {token}"

        # Only keep rows where both quantity and amount are integers
        if quantity and amount and quantity.isdigit() and amount.isdigit():
            structured_data.append({
                "Item": item,
                "Quantity": int(quantity),
                "Amount": int(amount)
            })

    return pd.DataFrame(structured_data)

# Main function to process the bill image
def process_bill_image(image_path):
    # Read the image
    image = cv2.imread(image_path)

    # Perform OCR
    ocr_result = pytesseract.image_to_string(image, output_type=Output.STRING)

    # Extract structured data
    structured_data = extract_columns(ocr_result)

    return structured_data

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    image_path = f"temp_{image_file.filename}"
    image_file.save(image_path)

    try:
        # Process the image and extract structured data
        result = process_bill_image(image_path)

        # Convert the result to a list of dictionaries
        transactions = result.to_dict(orient='records')

        # Add transactions directly to the frontend
        return jsonify({"transactions": transactions}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary image file
        if os.path.exists(image_path):
            os.remove(image_path)

if __name__ == '__main__':
    app.run(debug=True)