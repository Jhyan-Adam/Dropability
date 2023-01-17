#author: originally ChatGPT [AI], with edits from Dropanility developers
#NEEDS REFINING

import openpyxl
import json

# Open the Excel workbook and get the sheet
wb = openpyxl.load_workbook('C:\\Users\\Jhyan\\Downloads\\itemsSampleDB1.xlsx')
sheet = wb.active

# Get the headings from the first row of the sheet
headings = [cell.value for cell in sheet[1]]

# Create a list to hold the data
data = []

# Iterate through the rows of the sheet, starting at the second row
for row in sheet.iter_rows(min_row=2):
    # Create a dictionary for each row, with keys named after the headings and values from the cells
    row_data = {}
    for heading, cell in zip(headings, row):
        row_data[heading] = cell.value
    # Add the row data to the list
    data.append(row_data)

# Convert the data to JSON format
json_data = json.dumps(data, indent=1)

# Write the JSON data to a file
with open('items.json', 'x') as f:
    f.write(json_data)
