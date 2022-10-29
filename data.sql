drop table if exists Recipe;
create table Recipe (
    id bigint generated always as identity primary key,
    title VARCHAR(25),
    description VARCHAR(50),
    iglist VARCHAR(100),
    instructions VARCHAR(9500)
);

drop function if exists server;
create or replace function server(query text)
returns setof record language sql  as $$
  select
  *
from
  recipe
where
  to_tsvector(iglist || ' ' || title || ' ' || instructions) -- concat columns, but be sure to include a space to separate them!
  @@ to_tsquery('rice');
$$;