/*
  # Add Consent Tracking to User Sessions

  1. Changes
    - Add `consent_agreed` (boolean) column to track if user agreed to consent
    - Add `consent_timestamp` (timestamptz) column to record when consent was given

  2. Purpose
    - Track informed consent compliance for research ethics (IRB requirements)
    - Record timestamp of consent for audit trail

  3. Notes
    - These fields are required before participants can proceed with the experiment
    - Consent information is critical for research compliance
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_sessions' AND column_name = 'consent_agreed'
  ) THEN
    ALTER TABLE user_sessions ADD COLUMN consent_agreed boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_sessions' AND column_name = 'consent_timestamp'
  ) THEN
    ALTER TABLE user_sessions ADD COLUMN consent_timestamp timestamptz;
  END IF;
END $$;
