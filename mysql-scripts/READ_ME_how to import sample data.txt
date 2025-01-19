
You can import the "all-sample-data-merged.sql" file from MySQL Workbench

***********************************
***********************************

If you want to remerge the individual import files:

0 - Start by dropping tables in MySQL Workbench. Use the "drop-tables.sql" file
1 - In IntelliJ, right-click the "mysql-scripts" folder and select "Open in Terminal"
2 - Copy and paste the code below in the IntelliJ PowerShell terminal
3 - Open the refreshed "all-sample-data-merged.sql" file in MySQL Workbench

************* Code to merge individual import files *******************

Get-ChildItem '.\sample_data_files' -Filter '*import*.sql' | Get-Content | Set-Content '.\all-sample-data-merged.sql'