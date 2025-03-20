from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key="")  

# Dataset text (from Step 1)
dataset_text = """
- In January 2023, the foreign exchange forecast is 100.5, the national production forecast is 200.3, the low-grown production forecast is 50.1, the mid-grown production forecast is 75.2, and the high-grown production forecast is 90.4.
- In February 2023, the foreign exchange forecast is 101.2, the national production forecast is 201.0, the low-grown production forecast is 51.0, the mid-grown production forecast is 76.0, and the high-grown production forecast is 91.0.
...
"""

@app.route("/chat", methods=["POST"])
def chat():
    user_query = request.json.get("query")
    
    # Combine dataset and user query
    prompt = (
        f"The following is a dataset of monthly forecasts:\n\n{dataset_text}\n\n"
        f"User Query: {user_query}\n\n"
        "Answer the user's question based on the dataset above."
    )
    
    # Call GPT model
    completion = client.chat.completions.create(
        model="gpt-3",  # Use "gpt-4" or "gpt-3.5-turbo"
        messages=[
            {"role": "system", "content": "You are a helpful assistant that provides insights based on forecasted data."},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Extract and return GPT response
    gpt_response = completion.choices[0].message.content
    return jsonify({"response": gpt_response})

if __name__ == '__main__':
    app.run(debug=True)