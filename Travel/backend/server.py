from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai



app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyBYz_yK4Egf716vo8iKKh_Mo_Bk7M9HZrk") 

# Create a GenerativeModel object
model = genai.GenerativeModel("gemini-pro")

@app.route('/generate_text', methods=['POST'])
def generate_text():
    # print(request.form.get('user_input'))
    try:
        data = request.get_json()
        system_prompt = "I want you to act as a travel advisor for Indian users who would like to travel to a particular destination.You are supposed ask user for their budget and how many days would they like to stay and create a detailed day to day travel itinerary with image urls based on user's budget.Also suggest hotels where the user could stay. Display costs in INR (Indian Rupees) format and in the end calculate the total expenditure in INR (Indian Rupees)."
        user_input = data.get('user_input', "")
        # Generate text from combined prompt
        prompt = system_prompt + user_input
        response = model.generate_content(prompt)
        # print(response)
        return jsonify({"generated_text":response.text})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')