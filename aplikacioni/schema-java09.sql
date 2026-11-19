-- Ekzekutoje në Neon SQL Editor pas schema-java05.sql.
CREATE TABLE IF NOT EXISTS udhetimet_preferuara (
  id BIGSERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT udhetimet_preferuara_nje_perdorues_udhetim
    UNIQUE (udhetar_id, udhetim_id)
);

CREATE INDEX IF NOT EXISTS udhetimet_preferuara_perdorues_idx
  ON udhetimet_preferuara (udhetar_id, udhetim_id);
