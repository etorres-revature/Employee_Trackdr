INSERT INTO department
(name)
VALUES 
    ("Sales"),
    ("Research"),
    ("Executive"),
    ("Human Resources"),
    ("Legal"),
    ("Finance"),
    ("Maintenance"),
    ("Public Relations"),
    ("Technology"),
    ("Training");

INSERT INTO role 
(title, salary, department_id)
VALUES 
    ("Sales Manager", 75000.00, 1),
    ("Salesperson", 60000.00, 1),
    ("Research Director", 55000.00, 2),
    ("Research Analyst", 45000.00, 2),
    ("HR Director", 65000.00, 4),
    ("HR Analyst", 45000.00, 4),
    ("CEO", 150000.00, 3),
    ("CFO", 125000.00, 3),
    ("CTO", 140000.00, 3),
    ("Accountant", 62500.00, 6),
    ("General Counsel", 165000.00, 5),
    ("Janitor", 28000.00, 7),
    ("PR Manager", 72500.00, 8),
    ("Press liasion", 42000, 8),
    ("Developer", 75000, 9),
    ("Systems Analyst", 58750.00, 9),
    ("Trainer", 43250, 10);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES 
    ("Eric", "Torres", 7, NULL),
    ("Vincent", "Doria", 15, NULL),
    ("Nathan", "Schmitzer", 16, 2),
    ("Abraham", "Spindel", 1, NULL),
    ("Lorn", "Johnson", 2, 4),
    ("Bob", "Ellis", 2, 4),
    ("Ji", "Smith", 3, NULL),
    ("Rebecca", "Smith", 4, 7),
    ("James", "Smith", 4, 7),
    ("Donna", "Torres", 8, 1),
    ("Shane", "Schilling", 9, 1),
    ("Yvette", "Johnson", 5, NULL),
    ("Randy", "Davidson", 6, 12),
    ("Jerry", "Phillips", 6, 12),
    ("James", "Howard", 11, 1),
    ("Jeff", "Wilson", 12, 12),
    ("Erin", "Holmes", 12, 12),
    ("Vassaly", "Sivan", 17, 12),
    ("Melissa", "Iorio", 10, 10),
    ("Melanie", "Rouse", 10, 10);