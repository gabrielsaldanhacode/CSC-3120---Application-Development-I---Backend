-- CSC 3210 Application Development I Backend
-- Project: Campus Resource Reservation API
-- Milestone 2: Database Schema Design

DROP DATABASE IF EXISTS campus_reservation;
CREATE DATABASE campus_reservation;
USE campus_reservation;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  role VARCHAR(30) NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
  resource_id INT AUTO_INCREMENT PRIMARY KEY,
  resource_name VARCHAR(120) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  location VARCHAR(120) NULL,
  description TEXT, -- ADDED FOR REALISM
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  resource_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  purpose VARCHAR(255), -- ADDED FOR REALISM
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- CONSTRAINT: Prevent end_time from being before start_time
  CONSTRAINT chk_reservation_time CHECK (end_time > start_time),

  CONSTRAINT fk_reservations_users
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_reservations_resources
    FOREIGN KEY (resource_id) REFERENCES resources(resource_id)
    ON DELETE CASCADE
);

CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_resource ON reservations(resource_id);
CREATE INDEX idx_reservations_time ON reservations(start_time, end_time);

-- Sample Data
INSERT INTO users (full_name, email, role) VALUES
('Jordan Smith', 'jordan.smith@madonna.edu', 'student'),
('Casey Lee', 'casey.lee@madonna.edu', 'admin');

INSERT INTO resources (resource_name, resource_type, location, description) VALUES
('Study Room A', 'study_room', 'Library', 'Quiet room with whiteboard'),
('Camera Kit 1', 'equipment', 'Media Center', 'Canon DSLR with 50mm lens');

INSERT INTO reservations (user_id, resource_id, start_time, end_time, purpose) VALUES
(1, 1, '2026-02-10 10:00:00', '2026-02-10 12:00:00', 'CS Project Brainstorming');

-- Ready for Milestone 3