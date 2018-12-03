--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: assessment_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_categories (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.assessment_categories OWNER TO postgres;

--
-- Name: assessment_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessment_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessment_categories_id_seq OWNER TO postgres;

--
-- Name: assessment_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessment_categories_id_seq OWNED BY public.assessment_categories.id;


--
-- Name: assessment_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_questions (
    assessment_id integer NOT NULL,
    id integer NOT NULL,
    question_text text NOT NULL
);


ALTER TABLE public.assessment_questions OWNER TO postgres;

--
-- Name: assessment_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_resources (
    id integer NOT NULL,
    tag text NOT NULL
);


ALTER TABLE public.assessment_resources OWNER TO postgres;

--
-- Name: assessment_resources_html; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_resources_html (
    id integer NOT NULL,
    html text NOT NULL
);


ALTER TABLE public.assessment_resources_html OWNER TO postgres;

--
-- Name: assessment_resources_html_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessment_resources_html_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessment_resources_html_id_seq OWNER TO postgres;

--
-- Name: assessment_resources_html_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessment_resources_html_id_seq OWNED BY public.assessment_resources_html.id;


--
-- Name: assessment_resources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessment_resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessment_resources_id_seq OWNER TO postgres;

--
-- Name: assessment_resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessment_resources_id_seq OWNED BY public.assessment_resources.id;


--
-- Name: assessment_resources_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_resources_images (
    uuid_ uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id integer NOT NULL,
    data bytea NOT NULL
);


ALTER TABLE public.assessment_resources_images OWNER TO postgres;

--
-- Name: assessment_responses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessment_responses (
    assessment_id integer NOT NULL,
    question_id integer NOT NULL,
    id integer NOT NULL,
    response_text text NOT NULL
);


ALTER TABLE public.assessment_responses OWNER TO postgres;

--
-- Name: assessment_responses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessment_responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessment_responses_id_seq OWNER TO postgres;

--
-- Name: assessment_responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessment_responses_id_seq OWNED BY public.assessment_responses.id;


--
-- Name: assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessments (
    id integer NOT NULL,
    uuid_ uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    json_structure text NOT NULL
);


ALTER TABLE public.assessments OWNER TO postgres;

--
-- Name: assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessments_id_seq OWNER TO postgres;

--
-- Name: assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessments_id_seq OWNED BY public.assessments.id;


--
-- Name: ast_assessment_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ast_assessment_categories (
    assessment_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.ast_assessment_categories OWNER TO postgres;

--
-- Name: ast_assessment_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ast_assessment_resources (
    assessment_id integer NOT NULL,
    resource_id integer NOT NULL
);


ALTER TABLE public.ast_assessment_resources OWNER TO postgres;

--
-- Name: ast_live_assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ast_live_assessments (
    assessment_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.ast_live_assessments OWNER TO postgres;

--
-- Name: ast_user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ast_user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.ast_user_roles OWNER TO postgres;

--
-- Name: ast_users_assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ast_users_assessments (
    user_id integer NOT NULL,
    assessment_id integer NOT NULL
);


ALTER TABLE public.ast_users_assessments OWNER TO postgres;

--
-- Name: guest_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guest_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.guest_users_id_seq OWNER TO postgres;

--
-- Name: guest_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guest_users (
    id integer DEFAULT nextval('public.guest_users_id_seq'::regclass) NOT NULL,
    assessment_uuid uuid NOT NULL,
    jwt character varying,
    tag text NOT NULL
);


ALTER TABLE public.guest_users OWNER TO postgres;

--
-- Name: live_assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_assessments (
    id integer NOT NULL,
    assessment_uuid uuid NOT NULL,
    pin text NOT NULL
);


ALTER TABLE public.live_assessments OWNER TO postgres;

--
-- Name: live_assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.live_assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.live_assessments_id_seq OWNER TO postgres;

--
-- Name: live_assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.live_assessments_id_seq OWNED BY public.live_assessments.id;


--
-- Name: past_assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.past_assessments (
    start timestamp without time zone NOT NULL,
    "end" timestamp without time zone NOT NULL,
    assessment_uuid uuid NOT NULL,
    tag text NOT NULL
);


ALTER TABLE public.past_assessments OWNER TO postgres;

--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    role_name text NOT NULL,
    description text
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_id_seq OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    uuid4 uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name text,
    last_name text,
    user_name character varying(32) NOT NULL,
    email text NOT NULL,
    hash text NOT NULL,
    salt text DEFAULT (NOT NULL::boolean)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: assessment_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_categories ALTER COLUMN id SET DEFAULT nextval('public.assessment_categories_id_seq'::regclass);


--
-- Name: assessment_resources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources ALTER COLUMN id SET DEFAULT nextval('public.assessment_resources_id_seq'::regclass);


--
-- Name: assessment_resources_html id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources_html ALTER COLUMN id SET DEFAULT nextval('public.assessment_resources_html_id_seq'::regclass);


--
-- Name: assessment_responses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses ALTER COLUMN id SET DEFAULT nextval('public.assessment_responses_id_seq'::regclass);


--
-- Name: assessments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments ALTER COLUMN id SET DEFAULT nextval('public.assessments_id_seq'::regclass);


--
-- Name: live_assessments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_assessments ALTER COLUMN id SET DEFAULT nextval('public.live_assessments_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: assessment_categories assessment_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_categories
    ADD CONSTRAINT assessment_categories_name_key UNIQUE (name);


--
-- Name: assessment_categories assessment_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_categories
    ADD CONSTRAINT assessment_categories_pkey PRIMARY KEY (id);


--
-- Name: assessment_questions assessment_questions_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_questions
    ADD CONSTRAINT assessment_questions_id_key UNIQUE (id);


--
-- Name: assessment_questions assessment_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_questions
    ADD CONSTRAINT assessment_questions_pkey PRIMARY KEY (assessment_id, id);


--
-- Name: assessment_resources_html assessment_resources_html_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources_html
    ADD CONSTRAINT assessment_resources_html_pkey PRIMARY KEY (id);


--
-- Name: assessment_resources_images assessment_resources_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources_images
    ADD CONSTRAINT assessment_resources_images_pkey PRIMARY KEY (uuid_);


--
-- Name: assessment_resources assessment_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources
    ADD CONSTRAINT assessment_resources_pkey PRIMARY KEY (id);


--
-- Name: assessment_resources assessment_resources_tag_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources
    ADD CONSTRAINT assessment_resources_tag_key UNIQUE (tag);


--
-- Name: assessment_responses assessment_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_pkey PRIMARY KEY (assessment_id, question_id, id);


--
-- Name: assessments assessments_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_id_key UNIQUE (id);


--
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (id, uuid_);


--
-- Name: assessments assessments_uuid__key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_uuid__key UNIQUE (uuid_);


--
-- Name: ast_assessment_categories ast_assessment_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_assessment_categories
    ADD CONSTRAINT ast_assessment_categories_pkey PRIMARY KEY (assessment_id, category_id);


--
-- Name: ast_assessment_resources ast_assessment_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_assessment_resources
    ADD CONSTRAINT ast_assessment_resources_pkey PRIMARY KEY (assessment_id, resource_id);


--
-- Name: ast_live_assessments ast_live_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_live_assessments
    ADD CONSTRAINT ast_live_assessments_pkey PRIMARY KEY (assessment_id, user_id);


--
-- Name: ast_user_roles ast_user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_user_roles
    ADD CONSTRAINT ast_user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: ast_users_assessments ast_users_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_users_assessments
    ADD CONSTRAINT ast_users_assessments_pkey PRIMARY KEY (user_id, assessment_id);


--
-- Name: live_assessments live_assessments_pin_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_assessments
    ADD CONSTRAINT live_assessments_pin_key UNIQUE (pin);


--
-- Name: live_assessments live_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_assessments
    ADD CONSTRAINT live_assessments_pkey PRIMARY KEY (id);


--
-- Name: past_assessments past_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.past_assessments
    ADD CONSTRAINT past_assessments_pkey PRIMARY KEY (assessment_uuid, tag);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (user_name);


--
-- Name: user_roles user_roles_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_id_key UNIQUE (id);


--
-- Name: user_roles user_roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_name_key UNIQUE (role_name);


--
-- Name: users users_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_hash_key UNIQUE (hash);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: assessment_questions assessment_questions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_questions
    ADD CONSTRAINT assessment_questions_fk0 FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);


--
-- Name: assessment_resources_html assessment_resources_html_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources_html
    ADD CONSTRAINT assessment_resources_html_fk0 FOREIGN KEY (id) REFERENCES public.assessment_resources(id);


--
-- Name: assessment_resources_images assessment_resources_images_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_resources_images
    ADD CONSTRAINT assessment_resources_images_fk0 FOREIGN KEY (id) REFERENCES public.assessment_resources(id);


--
-- Name: assessment_responses assessment_responses_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_fk0 FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);


--
-- Name: assessment_responses assessment_responses_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessment_responses
    ADD CONSTRAINT assessment_responses_fk1 FOREIGN KEY (question_id) REFERENCES public.assessment_questions(id);


--
-- Name: ast_assessment_categories ast_assessment_categories_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_assessment_categories
    ADD CONSTRAINT ast_assessment_categories_fk0 FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);


--
-- Name: ast_assessment_categories ast_assessment_categories_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_assessment_categories
    ADD CONSTRAINT ast_assessment_categories_fk1 FOREIGN KEY (category_id) REFERENCES public.assessment_categories(id);


--
-- Name: ast_assessment_resources ast_assessment_resources_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_assessment_resources
    ADD CONSTRAINT ast_assessment_resources_fk0 FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);


--
-- Name: ast_assessment_resources ast_assessment_resources_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_assessment_resources
    ADD CONSTRAINT ast_assessment_resources_fk1 FOREIGN KEY (resource_id) REFERENCES public.assessment_resources(id);


--
-- Name: ast_live_assessments ast_live_assessments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_live_assessments
    ADD CONSTRAINT ast_live_assessments_fk0 FOREIGN KEY (assessment_id) REFERENCES public.live_assessments(id);


--
-- Name: ast_live_assessments ast_live_assessments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_live_assessments
    ADD CONSTRAINT ast_live_assessments_fk1 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: ast_live_assessments ast_live_assessments_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_live_assessments
    ADD CONSTRAINT ast_live_assessments_fk2 FOREIGN KEY (role_id) REFERENCES public.user_roles(id);


--
-- Name: ast_user_roles ast_user_roles_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_user_roles
    ADD CONSTRAINT ast_user_roles_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: ast_user_roles ast_user_roles_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_user_roles
    ADD CONSTRAINT ast_user_roles_fk1 FOREIGN KEY (role_id) REFERENCES public.user_roles(id);


--
-- Name: ast_users_assessments ast_users_assessments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_users_assessments
    ADD CONSTRAINT ast_users_assessments_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: ast_users_assessments ast_users_assessments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ast_users_assessments
    ADD CONSTRAINT ast_users_assessments_fk1 FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);


--
-- Name: guest_users guest_users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_users
    ADD CONSTRAINT guest_users_fk0 FOREIGN KEY (assessment_uuid) REFERENCES public.assessments(uuid_);


--
-- Name: live_assessments live_assessments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_assessments
    ADD CONSTRAINT live_assessments_fk0 FOREIGN KEY (assessment_uuid) REFERENCES public.assessments(uuid_);


--
-- Name: past_assessments past_assessments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.past_assessments
    ADD CONSTRAINT past_assessments_fk0 FOREIGN KEY (assessment_uuid) REFERENCES public.assessments(uuid_);


--
-- PostgreSQL database dump complete
--

