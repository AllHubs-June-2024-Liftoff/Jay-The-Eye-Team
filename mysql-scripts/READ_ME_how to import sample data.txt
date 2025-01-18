0 - Start by dropping tables. Use the "drop-tables.sql" file
1 - Right-click the "mysql-scripts" folder and select "Open in Terminal"
2 - Copy and paste the line below in the PowerShell terminal
3 - Open the exported sql file in MySQL Workbench

************* Copy Below *******************

Get-ChildItem '.\sample_data_files' -Filter '*import*.sql' | Get-Content | Set-Content '.\all-sample-data-merged.sql'