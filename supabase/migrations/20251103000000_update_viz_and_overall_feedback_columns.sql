/*
  # Update Visualization and Overall Feedback Columns

  1. Changes
    - Replace old visualization feedback columns with new structured questions
    - Replace old overall feedback columns with new questions
    - Add new columns for comprehensive feedback collection

  2. New Visualization Columns
    - viz_clarity: Clarity of radar and bar charts (1-7)
    - viz_helpfulness: Did visualizations help decision (boolean)
    - viz_usefulness: Helpfulness in decision-making (1-7)
    - viz_tradeoff_value: Value of trade-off comparisons (1-7)
    - viz_tradeoff_helpfulness: Helpfulness in reaching decision (1-7)
    - viz_expert_usefulness: Usefulness of expert analyses (1-7)
    - viz_expert_confidence_impact: Did expert analyses increase confidence (boolean)
    - viz_comments: Open-ended feedback

  3. New Overall Experience Columns
    - overall_scenario_alignment: Noticed increasing alignment over time (boolean)
    - overall_decision_satisfaction: Satisfaction with decisions (1-7)
    - overall_process_satisfaction: Satisfaction with process (1-7)
    - overall_confidence_consistency: Confidence in value consistency (1-7)
    - overall_learning_insight: Learning about values influence (1-7)
    - overall_comments: Open-ended feedback

  4. Security
    - No RLS changes needed (inherits from table)
*/

-- Drop old columns that are being replaced
ALTER TABLE session_feedback
DROP COLUMN IF EXISTS viz_chart_clarity,
DROP COLUMN IF EXISTS decision_satisfaction,
DROP COLUMN IF EXISTS process_satisfaction,
DROP COLUMN IF EXISTS perceived_transparency,
DROP COLUMN IF EXISTS notes_free_text;

-- Add new visualization feedback columns
ALTER TABLE session_feedback
ADD COLUMN IF NOT EXISTS viz_clarity integer CHECK (viz_clarity BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS viz_helpfulness boolean,
ADD COLUMN IF NOT EXISTS viz_usefulness integer CHECK (viz_usefulness BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS viz_tradeoff_helpfulness integer CHECK (viz_tradeoff_helpfulness BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS viz_expert_confidence_impact boolean;

-- Add new overall experience columns
ALTER TABLE session_feedback
ADD COLUMN IF NOT EXISTS overall_scenario_alignment boolean,
ADD COLUMN IF NOT EXISTS overall_decision_satisfaction integer CHECK (overall_decision_satisfaction BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS overall_process_satisfaction integer CHECK (overall_process_satisfaction BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS overall_confidence_consistency integer CHECK (overall_confidence_consistency BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS overall_learning_insight integer CHECK (overall_learning_insight BETWEEN 1 AND 7),
ADD COLUMN IF NOT EXISTS overall_comments text DEFAULT '';

-- Add comments for documentation
COMMENT ON COLUMN session_feedback.viz_clarity IS 'Rating 1-7: Clarity of radar and bar chart visualizations';
COMMENT ON COLUMN session_feedback.viz_helpfulness IS 'Boolean: Did visualizations help make decision';
COMMENT ON COLUMN session_feedback.viz_usefulness IS 'Rating 1-7: Helpfulness of visualizations in decision-making';
COMMENT ON COLUMN session_feedback.viz_tradeoff_helpfulness IS 'Rating 1-7: Helpfulness of trade-off views in reaching decision';
COMMENT ON COLUMN session_feedback.viz_expert_confidence_impact IS 'Boolean: Did expert analyses increase confidence';

COMMENT ON COLUMN session_feedback.overall_scenario_alignment IS 'Boolean: Noticed increasing alignment of solutions with values over time';
COMMENT ON COLUMN session_feedback.overall_decision_satisfaction IS 'Rating 1-7: Satisfaction with decisions made across scenarios';
COMMENT ON COLUMN session_feedback.overall_process_satisfaction IS 'Rating 1-7: Satisfaction with overall decision-making process';
COMMENT ON COLUMN session_feedback.overall_confidence_consistency IS 'Rating 1-7: Confidence that decisions remained consistent with values';
COMMENT ON COLUMN session_feedback.overall_learning_insight IS 'Rating 1-7: How much simulation helped learn about values influence';
COMMENT ON COLUMN session_feedback.overall_comments IS 'Open-ended feedback about overall experience';
