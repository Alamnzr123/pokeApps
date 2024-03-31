CREATE TABLE IF NOT EXISTS public.pokemons
(
    id integer NOT NULL DEFAULT nextval('pokemons_id_seq'::regclass),
    nickname character varying(255) COLLATE pg_catalog."default",
    imageurl character varying(255) COLLATE pg_catalog."default",
    pokemonid character varying(255) COLLATE pg_catalog."default",
    renamecount character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pokemons_pkey PRIMARY KEY (id)
)