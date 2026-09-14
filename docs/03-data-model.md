# Data Model – Zielbild

Core Entities: profiles, brands, projects, products, experiments, tasks, inbox_items, content_items, content_versions, knowledge_entries, learned_memories, decisions, reviews, revenue_entries, acquisition_sources, relationships, ai_interactions, ai_feedback.

Wichtige Prinzipien: UUIDs, user_id, created_at/updated_at, optionale archived_at, relationale Kerndaten plus JSONB für flexible Metadaten, Rohinput erhalten, Content-Versionen erhalten, historische Gültigkeit unterstützen.

Projects: project_type client|own, brand_id, client_name, project_value, deadline, next_milestone, next_action, waiting_for, acquisition_source.
Tasks: Status, due, completed, estimated_minutes, energy low|medium|high, impact/urgency/revenue/growth/strategic/blocking scores, ai_priority_score.
Content: type, stage idea|explore|direction|draft|refine|ready|published|learn, body_json, parent_content_id.
Knowledge: scope user|brand|general, category, content, source, valid_from, valid_to, importance.
Learned Memory: state observed|learned|core|rejected, confidence, evidence_count, evidence.
Decisions: reasoning, validity, active|superseded|reversed, superseded_by.
Reviews: week|month|quarter|year, period, structured_data, narrative, reflection_answers.
Relationships: from_type/from_id, relation_type, to_type/to_id.
