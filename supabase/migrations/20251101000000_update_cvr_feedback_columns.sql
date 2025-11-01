/*
  # Update CVR Feedback Columns

  1. Changes
    - Remove old CVR feedback column: cvr_impact
    - Add new CVR feedback columns:
      - cvr_initial_reconsideration (boolean)
      - cvr_final_reconsideration (boolean)
      - cvr_confidence_change (integer, 1-7 scale)
      - cvr_comfort_level (integer, 1-7 scale)
      - cvr_perceived_value (integer, 1-7 scale)
      - cvr_overall_impact (integer, 1-7 scale)

  2. Notes
    - Existing cvr_helpfulness and cvr_clarity columns remain unchanged
    - All new columns are optional (nullable)
    - These changes align with the updated CVR feedback questions in the application
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_impact'
  ) THEN
    ALTER TABLE session_feedback DROP COLUMN cvr_impact;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_initial_reconsideration'
  ) THEN
    ALTER TABLE session_feedback ADD COLUMN cvr_initial_reconsideration boolean;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_final_reconsideration'
  ) THEN
    ALTER TABLE session_feedback ADD COLUMN cvr_final_reconsideration boolean;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_confidence_change'
  ) THEN
    ALTER TABLE session_feedback ADD COLUMN cvr_confidence_change integer;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_comfort_level'
  ) THEN
    ALTER TABLE session_feedback ADD COLUMN cvr_comfort_level integer;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_perceived_value'
  ) THEN
    ALTER TABLE session_feedback ADD COLUMN cvr_perceived_value integer;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_feedback' AND column_name = 'cvr_overall_impact'
  ) THEN
    ALTER TABLE session_feedback ADD COLUMN cvr_overall_impact integer;
  END IF;
END $$;
