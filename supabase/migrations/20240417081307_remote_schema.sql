
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."builds" (
    "owner" "text" NOT NULL,
    "mask_relic" "uuid" NOT NULL,
    "fossil_relic" "uuid" NOT NULL,
    "tresure_relic" "uuid" NOT NULL,
    "book_relic" "uuid" NOT NULL,
    "statue_relic" "uuid" NOT NULL,
    "necklace_relic" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."builds" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_build"() RETURNS SETOF "public"."builds"
    LANGUAGE "sql"
    AS $$
  select * from builds;
$$;

ALTER FUNCTION "public"."update_build"() OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."book_relics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."book_relics" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."build_fellows" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "build" "uuid" NOT NULL,
    "fellow" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fellow_order" smallint NOT NULL
);

ALTER TABLE "public"."build_fellows" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."build_labels" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "build" "uuid" NOT NULL,
    "label" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."build_labels" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."build_skills" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "skill" "uuid" NOT NULL,
    "delay" real NOT NULL,
    "build" "uuid" NOT NULL,
    "skill_order" smallint NOT NULL
);

ALTER TABLE "public"."build_skills" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."fellows" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."fellows" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."fossil_relics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."fossil_relics" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."labels" (
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order" smallint NOT NULL
);

ALTER TABLE "public"."labels" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."mask_relics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."mask_relics" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."necklace_relics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."necklace_relics" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."parking_servers" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "self" boolean NOT NULL
);

ALTER TABLE "public"."parking_servers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."parkings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "number" smallint NOT NULL,
    "open_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owner" "uuid" NOT NULL
);

ALTER TABLE "public"."parkings" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."skills" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."skills" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."statue_relics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."statue_relics" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tresure_relics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."tresure_relics" OWNER TO "postgres";

ALTER TABLE ONLY "public"."book_relics"
    ADD CONSTRAINT "book_relics_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."book_relics"
    ADD CONSTRAINT "book_relics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."book_relics"
    ADD CONSTRAINT "book_relics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."build_fellows"
    ADD CONSTRAINT "build_fellows_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."build_labels"
    ADD CONSTRAINT "build_labels_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "builds_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."fellows"
    ADD CONSTRAINT "fellows_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."fellows"
    ADD CONSTRAINT "fellows_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."fellows"
    ADD CONSTRAINT "fellows_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."fossil_relics"
    ADD CONSTRAINT "fossil_relics_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."fossil_relics"
    ADD CONSTRAINT "fossil_relics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."fossil_relics"
    ADD CONSTRAINT "fossil_relics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."labels"
    ADD CONSTRAINT "labels_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."labels"
    ADD CONSTRAINT "labels_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."mask_relics"
    ADD CONSTRAINT "mask_relics_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."mask_relics"
    ADD CONSTRAINT "mask_relics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."mask_relics"
    ADD CONSTRAINT "mask_relics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."necklace_relics"
    ADD CONSTRAINT "necklace_relics_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."necklace_relics"
    ADD CONSTRAINT "necklace_relics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."necklace_relics"
    ADD CONSTRAINT "necklace_relics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."parkings"
    ADD CONSTRAINT "parking_number_key" UNIQUE ("number");

ALTER TABLE ONLY "public"."parkings"
    ADD CONSTRAINT "parking_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."parking_servers"
    ADD CONSTRAINT "parking_servers_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."parking_servers"
    ADD CONSTRAINT "parking_servers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."build_skills"
    ADD CONSTRAINT "skill_builds_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."statue_relics"
    ADD CONSTRAINT "statue_relics_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."statue_relics"
    ADD CONSTRAINT "statue_relics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."statue_relics"
    ADD CONSTRAINT "statue_relics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tresure_relics"
    ADD CONSTRAINT "tresure_relics_image_url_key" UNIQUE ("image_url");

ALTER TABLE ONLY "public"."tresure_relics"
    ADD CONSTRAINT "tresure_relics_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."tresure_relics"
    ADD CONSTRAINT "tresure_relics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."build_fellows"
    ADD CONSTRAINT "public_build_fellows_build_fkey" FOREIGN KEY ("build") REFERENCES "public"."builds"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."build_fellows"
    ADD CONSTRAINT "public_build_fellows_fellow_fkey" FOREIGN KEY ("fellow") REFERENCES "public"."fellows"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."build_labels"
    ADD CONSTRAINT "public_build_labels_build_fkey" FOREIGN KEY ("build") REFERENCES "public"."builds"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."build_labels"
    ADD CONSTRAINT "public_build_labels_label_fkey" FOREIGN KEY ("label") REFERENCES "public"."labels"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "public_builds_book_relic_fkey" FOREIGN KEY ("book_relic") REFERENCES "public"."book_relics"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "public_builds_fossil_relic_fkey" FOREIGN KEY ("fossil_relic") REFERENCES "public"."fossil_relics"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "public_builds_mask_relic_fkey" FOREIGN KEY ("mask_relic") REFERENCES "public"."mask_relics"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "public_builds_necklace_relic_fkey" FOREIGN KEY ("necklace_relic") REFERENCES "public"."necklace_relics"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "public_builds_statue_relic_fkey" FOREIGN KEY ("statue_relic") REFERENCES "public"."statue_relics"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."builds"
    ADD CONSTRAINT "public_builds_tresure_relic_fkey" FOREIGN KEY ("tresure_relic") REFERENCES "public"."tresure_relics"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."parkings"
    ADD CONSTRAINT "public_parkings_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."parking_servers"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."build_skills"
    ADD CONSTRAINT "public_skill_builds_build_fkey" FOREIGN KEY ("build") REFERENCES "public"."builds"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."build_skills"
    ADD CONSTRAINT "public_skill_builds_skill_id_fkey" FOREIGN KEY ("skill") REFERENCES "public"."skills"("id") ON UPDATE CASCADE;

CREATE POLICY "Enable delete access for all users" ON "public"."build_fellows" FOR DELETE USING (true);

CREATE POLICY "Enable delete access for all users" ON "public"."build_skills" FOR DELETE USING (true);

CREATE POLICY "Enable delete access for all users" ON "public"."builds" FOR DELETE USING (true);

CREATE POLICY "Enable delete for all users" ON "public"."build_labels" USING (true);

CREATE POLICY "Enable insert for all users" ON "public"."build_fellows" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON "public"."build_labels" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON "public"."build_skills" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON "public"."builds" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."book_relics" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."build_fellows" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."build_labels" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."build_skills" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."builds" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."fellows" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."fossil_relics" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."labels" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."mask_relics" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."necklace_relics" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."parking_servers" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."parkings" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."skills" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."statue_relics" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."tresure_relics" FOR SELECT USING (true);

CREATE POLICY "Enable update access for all users" ON "public"."parking_servers" FOR UPDATE USING (true);

CREATE POLICY "Enable update access for all users" ON "public"."parkings" FOR UPDATE USING (true);

CREATE POLICY "Enable update for all users" ON "public"."build_fellows" FOR UPDATE USING (true);

CREATE POLICY "Enable update for all users" ON "public"."build_labels" FOR UPDATE USING (true);

CREATE POLICY "Enable update for all users" ON "public"."build_skills" FOR UPDATE USING (true);

CREATE POLICY "Enable update for all users" ON "public"."builds" FOR UPDATE USING (true);

ALTER TABLE "public"."book_relics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."build_fellows" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."build_labels" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."build_skills" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."builds" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."fellows" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."fossil_relics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."labels" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."mask_relics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."necklace_relics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."parking_servers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."parkings" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."skills" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."statue_relics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tresure_relics" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."parking_servers";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."parkings";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."builds" TO "anon";
GRANT ALL ON TABLE "public"."builds" TO "authenticated";
GRANT ALL ON TABLE "public"."builds" TO "service_role";

GRANT ALL ON FUNCTION "public"."update_build"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_build"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_build"() TO "service_role";

GRANT ALL ON TABLE "public"."book_relics" TO "anon";
GRANT ALL ON TABLE "public"."book_relics" TO "authenticated";
GRANT ALL ON TABLE "public"."book_relics" TO "service_role";

GRANT ALL ON TABLE "public"."build_fellows" TO "anon";
GRANT ALL ON TABLE "public"."build_fellows" TO "authenticated";
GRANT ALL ON TABLE "public"."build_fellows" TO "service_role";

GRANT ALL ON TABLE "public"."build_labels" TO "anon";
GRANT ALL ON TABLE "public"."build_labels" TO "authenticated";
GRANT ALL ON TABLE "public"."build_labels" TO "service_role";

GRANT ALL ON TABLE "public"."build_skills" TO "anon";
GRANT ALL ON TABLE "public"."build_skills" TO "authenticated";
GRANT ALL ON TABLE "public"."build_skills" TO "service_role";

GRANT ALL ON TABLE "public"."fellows" TO "anon";
GRANT ALL ON TABLE "public"."fellows" TO "authenticated";
GRANT ALL ON TABLE "public"."fellows" TO "service_role";

GRANT ALL ON TABLE "public"."fossil_relics" TO "anon";
GRANT ALL ON TABLE "public"."fossil_relics" TO "authenticated";
GRANT ALL ON TABLE "public"."fossil_relics" TO "service_role";

GRANT ALL ON TABLE "public"."labels" TO "anon";
GRANT ALL ON TABLE "public"."labels" TO "authenticated";
GRANT ALL ON TABLE "public"."labels" TO "service_role";

GRANT ALL ON TABLE "public"."mask_relics" TO "anon";
GRANT ALL ON TABLE "public"."mask_relics" TO "authenticated";
GRANT ALL ON TABLE "public"."mask_relics" TO "service_role";

GRANT ALL ON TABLE "public"."necklace_relics" TO "anon";
GRANT ALL ON TABLE "public"."necklace_relics" TO "authenticated";
GRANT ALL ON TABLE "public"."necklace_relics" TO "service_role";

GRANT ALL ON TABLE "public"."parking_servers" TO "anon";
GRANT ALL ON TABLE "public"."parking_servers" TO "authenticated";
GRANT ALL ON TABLE "public"."parking_servers" TO "service_role";

GRANT ALL ON TABLE "public"."parkings" TO "anon";
GRANT ALL ON TABLE "public"."parkings" TO "authenticated";
GRANT ALL ON TABLE "public"."parkings" TO "service_role";

GRANT ALL ON TABLE "public"."skills" TO "anon";
GRANT ALL ON TABLE "public"."skills" TO "authenticated";
GRANT ALL ON TABLE "public"."skills" TO "service_role";

GRANT ALL ON TABLE "public"."statue_relics" TO "anon";
GRANT ALL ON TABLE "public"."statue_relics" TO "authenticated";
GRANT ALL ON TABLE "public"."statue_relics" TO "service_role";

GRANT ALL ON TABLE "public"."tresure_relics" TO "anon";
GRANT ALL ON TABLE "public"."tresure_relics" TO "authenticated";
GRANT ALL ON TABLE "public"."tresure_relics" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
