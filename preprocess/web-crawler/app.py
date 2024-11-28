import requests
import pandas as pd
from time import sleep
import json
from io import StringIO

# Define the URL and headers for the POST request
url = "https://www.srilankateaboard.lk/wp-admin/admin-ajax.php"
headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
}

# Initialize an empty list to store data
data_list = []

# Iterate over the years and months
for year in range(2012, 2016):  # Adjust the range as needed
    for month in range(1, 13):  # Loop over months (1 to 12)
        year_month_str = f"{year}-{month:02d}"  # Format as YYYY-MM (e.g., 2012-01)
        payload = {
            "action": "ajaxteaprice",
            "selected_category": "1692",  # Category for Export
            "selected_year": year_month_str,
            "req_type": "teaprice_data",
            "wpsecurity": "d616a2dc71",  # You may need to update this token dynamically if it changes.
        }
        
        # Send POST request
        response = requests.post(url, headers=headers, data=payload)
        
        if response.status_code == 200:
            print(f"Data fetched for {year_month_str}")
            
            try:
                # Parse the JSON response
                response_data = json.loads(response.text)
                html_table = response_data.get("htmloptions", "")
                
                # Check if there is a valid table in the response
                if "<table" in html_table.lower():
                    tables = pd.read_html(StringIO(html_table))
                    
                    for table in tables:
                        table["Year-Month"] = year_month_str  # Add Year-Month column
                        data_list.append(table)
                else:
                    print(f"No valid table found in the response for {year_month_str}.")
            except (ValueError, KeyError) as e:
                print(f"Error processing data for {year_month_str}: {e}")
        else:
            print(f"Failed to fetch data for {year_month_str}. HTTP Status: {response.status_code}")
        
        # Sleep to avoid overwhelming the server
        sleep(1)

# Combine all tables into a single DataFrame
if data_list:
    final_df = pd.concat(data_list, ignore_index=True)
    # Save to CSV
    final_df.to_csv("tea_export_data.csv", index=False)
    print("Data saved to tea_export_data.csv")
else:
    print("No data fetched.")
