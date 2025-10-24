/*
  # Add Mechanism-Specific Feedback Columns

  ## Purpose
  This migration adds detailed feedback columns to the session_feedback table to capture
  participant experiences with three key decision support mechanisms:
  1. CVR (Value Reflection) Mechanism
  2. APA (Adaptive Preference Analysis) Mechanism
  3. Visualization & Expert Analysis Tools

  ## Changes
  - Adds 9 new feedback columns organized by mechanism (3 columns per mechanism)
  - Adds 3 comment fields for qualitative feedback on each mechanism
  - All rating columns use 1-7 scale consistent with existing feedback metrics
  - Maintains organized structure for easy data retrieval and analysis

  ## Column Organization

  ### CVR Mechanism Feedback (cvr_*)
  - cvr_helpfulness: How helpful were CVR questions in reconsidering decisions
  - cvr_clarity: Clarity of CVR question presentation
  - cvr_impact: Impact of CVR scenarios on final decision-making
  - cvr_comments: Open-ended feedback about CVR experience

  ### APA Mechanism Feedback (apa_*)
  - apa_comparison_usefulness: Usefulness of comparing choices with CVR scenarios
  - apa_reordering_effectiveness: Effectiveness of value reordering feature
  - apa_perspective_value: Value of understanding options from different perspectives
  - apa_comments: Open-ended feedback about APA experience

  ### Visualization & Expert Analysis Feedback (viz_*)
  - viz_expert_usefulness: Usefulness of expert analysis and recommendations
  - viz_chart_clarity: Clarity of radar and bar chart visualizations
  - viz_tradeoff_value: Value of trade-off comparisons and differences view
  - viz_comments: Open-ended feedback about visualization tools
*/

-- Add CVR Mechanism Feedback Columns
ALTER TABLE session_feedback
ADD COLUMN IF NOT EXISTS cvr_helpfulness integer CHECK (cvr_helpfulness BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS cvr_clarity integer CHECK (cvr_clarity BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS cvr_impact integer CHECK (cvr_impact BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS cvr_comments text DEFAULT '';

-- Add APA Mechanism Feedback Columns
ALTER TABLE session_feedback
ADD COLUMN IF NOT EXISTS apa_comparison_usefulness integer CHECK (apa_comparison_usefulness BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS apa_reordering_effectiveness integer CHECK (apa_reordering_effectiveness BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS apa_perspective_value integer CHECK (apa_perspective_value BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS apa_comments text DEFAULT '';

-- Add Visualization & Expert Analysis Feedback Columns
ALTER TABLE session_feedback
ADD COLUMN IF NOT EXISTS viz_expert_usefulness integer CHECK (viz_expert_usefulness BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS viz_chart_clarity integer CHECK (viz_chart_clarity BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS viz_tradeoff_value integer CHECK (viz_tradeoff_value BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS viz_comments text DEFAULT '';

-- Add comment to table describing the new columns
COMMENT ON COLUMN session_feedback.cvr_helpfulness IS 'Rating 1-7: How helpful were CVR questions in reconsidering decisions';
COMMENT ON COLUMN session_feedback.cvr_clarity IS 'Rating 1-7: Clarity of CVR question presentation';
COMMENT ON COLUMN session_feedback.cvr_impact IS 'Rating 1-7: Impact of CVR scenarios on final decision-making';
COMMENT ON COLUMN session_feedback.cvr_comments IS 'Open-ended comments about CVR experience';

COMMENT ON COLUMN session_feedback.apa_comparison_usefulness IS 'Rating 1-7: Usefulness of comparing simulation choices with CVR scenarios';
COMMENT ON COLUMN session_feedback.apa_reordering_effectiveness IS 'Rating 1-7: Effectiveness of the value reordering feature';
COMMENT ON COLUMN session_feedback.apa_perspective_value IS 'Rating 1-7: Value of understanding options from different perspectives';
COMMENT ON COLUMN session_feedback.apa_comments IS 'Open-ended comments about APA experience';

COMMENT ON COLUMN session_feedback.viz_expert_usefulness IS 'Rating 1-7: Usefulness of expert analysis and recommendations';
COMMENT ON COLUMN session_feedback.viz_chart_clarity IS 'Rating 1-7: Clarity of radar and bar chart visualizations';
COMMENT ON COLUMN session_feedback.viz_tradeoff_value IS 'Rating 1-7: Value of trade-off comparisons and differences view';
COMMENT ON COLUMN session_feedback.viz_comments IS 'Open-ended comments about visualization tools';
