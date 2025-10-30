/*
  # Add Infeasible Options Checked Column

  This migration adds a new column to the final_decisions table to track which infeasible
  options the participant indicated they would have chosen if those options were feasible.
  This is particularly relevant for Scenario 3 where resource constraints may make certain
  options infeasible.

  1. Changes
    - Add `infeasible_options_checked` column to `final_decisions` table
      - JSONB type to store array of option objects: [{id, label, title}]
      - Nullable field (only populated for Scenario 3)

  2. Purpose
    - Track user preferences for infeasible options in resource-constrained scenarios
    - Understand what users would choose if constraints were removed
    - Provide insight into value preferences even when options cannot be selected
*/

-- Add infeasible_options_checked column to final_decisions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'final_decisions' AND column_name = 'infeasible_options_checked'
  ) THEN
    ALTER TABLE final_decisions ADD COLUMN infeasible_options_checked jsonb DEFAULT '[]';
  END IF;
END $$;
