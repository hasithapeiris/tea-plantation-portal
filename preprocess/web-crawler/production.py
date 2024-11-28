import requests
import pandas as pd
from time import sleep
import os
import json
from io import StringIO

# Define the URL and headers for the POST request
url = "https://www.srilankateaboard.lk/wp-admin/admin-ajax.php"
headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
}

# Check if the CSV file already exists
csv_file = "tea_production_data.csv"
existing_data = None

if os.path.exists(csv_file):
    print(f"Loading existing data from {csv_file}...")
    existing_data = pd.read_csv(csv_file)
else:
    print(f"No existing data found. Creating {csv_file}.")

# Initialize a set of already fetched dates
fetched_dates = set()

if existing_data is not None:
    # Extract the already fetched 'Year-Month' dates
    fetched_dates = set(existing_data["Year"].unique())

# Initialize an empty list to store new data
new_data_list = []

# Iterate over the years and months
for year in range(2011, 2020):  # Adjust the range as needed
    for month in range(1, 13):  # Loop over months (1 to 12)
        year_month_str = f"{year}-{month:02d}"  # Format as YYYY-MM
        if year_month_str in fetched_dates:
            print(f"Skipping {year_month_str} (already in CSV).")
            continue
        
        # Prepare the payload for the request
        payload = {
            "action": "ajaxteaprice",
            "selected_category": "2371",  # Category for Export
            "selected_year": year_month_str,
            "req_type": "teaprice_data",
            "wpsecurity": "d616a2dc71",  # Update this token if necessary
        }
        
        # Send POST request
        response = requests.post(url, headers=headers, data=payload)
        
        if response.status_code == 200:
            print(f"Fetching data for {year_month_str}...")
            
            try:
                # Parse the JSON response
                response_data = json.loads(response.text)
                html_table = response_data.get("htmloptions", "")
                
                # Check if there is a valid table in the response
                if "<table" in html_table.lower():
                    tables = pd.read_html(StringIO(html_table))
                    
                    for table in tables:
                        # table["Year-Month"] = year_month_str  # Add Year-Month column
                        new_data_list.append(table)
                else:
                    print(f"No valid table found in the response for {year_month_str}.")
            except (ValueError, KeyError) as e:
                print(f"Error processing data for {year_month_str}: {e}")
        else:
            print(f"Failed to fetch data for {year_month_str}. HTTP Status: {response.status_code}")
        
        # Sleep to avoid overwhelming the server
        sleep(1)

# Combine all new data into a single DataFrame
if new_data_list:
    new_data_df = pd.concat(new_data_list, ignore_index=True)
    
    if existing_data is not None:
        # Append new data to the existing DataFrame
        final_df = pd.concat([existing_data, new_data_df], ignore_index=True)
    else:
        final_df = new_data_df
    
    # Save to CSV
    final_df.to_csv(csv_file, index=False)
    print(f"Data updated and saved to {csv_file}")
else:
    print("No new data fetched.")
