

const Start = `

    CREATE TABLE catergories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryname TEXT
    );

    CREATE TABLE brands (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brandname TEXT
    );

    CREATE TABLE items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryid INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    brandid INTEGER REFERENCES brands(id) ON DELETE CASCADE,
    name TEXT,
    price FLOAT
    );

    INSERT INTO categories (categoryname)
    VALUES
        ('Guitars'),
        ('Basses'),
        ('Drums'),
        ('Cymbals'),
        ('Keyboards'),
        ('Saxophones'),
        ('Microphones');


    INSERT INTO brands (brandname)
    VALUES
        ('Fender'),
        ('Gibson'),
        ('Yamaha'),
        ('Pearl'),
        ('Zildjian'),
        ('Roland'),
        ('Yanagisawa'),
        ('Shure');
    
    INSERT INTO items (categoryid, brandid, name, price)
    VALUES
        (1,1,'Telecaster', 799.99),
        (1,1,'Jaguar', 899.99),
        (1,1,'Stratocaster', 999.99),
        (1,2,'SG', 1299.99),
        (1,2,'Les Paul Standard', 2299.99 ),
        (1,3,'Pacifica', 279.99),
        (2,1,'Jazz Bass', 1199.99),
        (3,4,'12 inches Snare', 419.99),
        (4,5,'14 inches Crash', 249.99),
        (4,5,'20 inches Ride', 479.99),
        (5,3,'PSR-E383', 266.99),
        (5,6,'E-X10', 175.99),
        (6,3,'Saxophone', 899.99),
        (6,7,'Saxophone', 1699.99),
        (7,8,'SM-58', 99.99),
        (7,8,'SM-48', 69.99);
        
 
`       

        
        
        
        



