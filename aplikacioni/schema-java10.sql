-- Ekzekutoje në Neon SQL Editor pas schema-java05.sql.
CREATE TABLE IF NOT EXISTS kerkesa_vendet (
  id BIGSERIAL PRIMARY KEY,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  udhetar_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  statusi TEXT NOT NULL DEFAULT 'ne_pritje'
    CHECK (statusi IN ('ne_pritje', 'pranuar')),
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (udhetim_id, udhetar_id)
);

-- Operacion atomik: bllokon udhëtimin dhe kërkesën, kontrollon pronësinë,
-- dhe ul vendet vetëm në kalimin e parë nga ne_pritje në pranuar.
CREATE OR REPLACE FUNCTION prano_kerkese_vendi(p_kerkesa_id BIGINT, p_shofer_id TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  v_udhetim_id TEXT;
  v_statusi TEXT;
  v_vende INTEGER;
BEGIN
  SELECT k.udhetim_id, k.statusi INTO v_udhetim_id, v_statusi
  FROM kerkesa_vendet k WHERE k.id = p_kerkesa_id FOR UPDATE;
  IF NOT FOUND THEN RETURN 'mungon'; END IF;

  PERFORM 1 FROM udhetimet u
  WHERE u.id = v_udhetim_id AND u.shofer_id = p_shofer_id
    AND EXISTS (SELECT 1 FROM profilet p WHERE p.github_id = p_shofer_id AND p.roli = 'shofer')
  FOR UPDATE;
  IF NOT FOUND THEN RETURN 'ndaluar'; END IF;
  IF v_statusi = 'pranuar' THEN RETURN 'pranuar_me_pare'; END IF;

  SELECT vende INTO v_vende FROM udhetimet WHERE id = v_udhetim_id;
  IF v_vende <= 0 THEN RETURN 'pa_vende'; END IF;

  UPDATE udhetimet SET vende = vende - 1 WHERE id = v_udhetim_id;
  UPDATE kerkesa_vendet SET statusi = 'pranuar' WHERE id = p_kerkesa_id;
  RETURN 'pranuar';
END;
$$;

CREATE INDEX IF NOT EXISTS kerkesa_vendet_udhetim_idx
  ON kerkesa_vendet (udhetim_id, id);
