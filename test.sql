-- ALTER TABLE users
-- ALTER COLUMN role SET DEFAULT 'customer';
-- UPDATE users
-- SET is_Active = true
-- WHERE id = 5;

select * from customers
select * from policies
select * from users
select * from documents
select * from agents


-- Add columns to the payments table 
ALTER TABLE "payments" ADD COLUMN "receipt_path" VARCHAR(255), ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP; 
-- Add column to the policies table 
ALTER TABLE "policies" ADD COLUMN "next_due_date" TIMESTAMP(3); 

INSERT INTO users (
    name, 
    email,
    password_hash,
    phone,
    role,
    is_active
)
VALUES (
    'Rahul Sharma',
    'agent1@example.com',
    '$2a$12$K85G2n0TSwqyKIgNw9eGfekrVaKSiUS174oQdd6PzYc4FR5XuovUu',
    '9876543210',
    'agent',
    TRUE
);
SELECT id, name, email, role
FROM users
WHERE role = 'agent';

select * from agents

DELETE FROM agents
WHERE id = 4
  AND employee_code = 'EMP-82163';

UPDATE agents
SET employee_code = 'EMP-000001'
WHERE id = 4;
