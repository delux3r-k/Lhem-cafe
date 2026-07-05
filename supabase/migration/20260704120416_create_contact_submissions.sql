/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
- `id` (uuid, primary key)
- `name` (text, not null) - Full name of the person contacting
- `email` (text, not null) - Email address for reply
- `message` (text, not null) - The message/inquiry content
- `created_at` (timestamptz, default now) - When the submission was received

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated to INSERT (anyone can submit the contact form).
- No SELECT/UPDATE/DELETE for anon - only service role can manage submissions.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact forms (INSERT only)
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- No read access for anon/authenticated - only service role can view submissions
-- This is intentional: contact submissions are private to the café owner