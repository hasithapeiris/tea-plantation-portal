import pandas as pd
from langchain.agents import create_pandas_dataframe_agent
from langchain.chat_models import ChatOpenAI
import os

# Load dataset
df = pd.read_csv("../fee_forecast.csv")

# Convert the 'Month' column to datetime for better querying
df["month"] = pd.to_datetime(df["month"])

# Set your OpenAI API key
os.environ["OPENAI_API_KEY"] = ""

# Load the GPT model
llm = ChatOpenAI(model_name="gpt-4", temperature=0.5)

# Create an agent to interact with the dataset
agent = create_pandas_dataframe_agent(llm, df, verbose=True)

# Function to handle user queries
def chat_with_model(user_input):
    try:
        response = agent.run(user_input)
        return response
    except Exception as e:
        return f"Error processing request: {str(e)}"

# Example Test
print(chat_with_model("What is the national production forecast for January 2026?"))
