create table if not exists user
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- columns
    account_address varchar(255)                                not null comment 'user wallet address',
    nickname        varchar(20)                                     null comment 'user nickname',
    profile_image   varchar(255)                                    null comment 'user profile image',
    description     varchar(255)                                    null comment 'user description',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'user table';

create table if not exists article
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- fk columns
    user_id         bigint unsigned                             not null comment 'user.id',

    -- columns
    title           varchar(255)                                not null comment 'article title',
    description     varchar(255)                                    null comment 'article description',
    level           int                                         not null comment 'article level',
    is_public       tinyint         default 1                   not null comment 'article public flag',
    has_ad          tinyint         default 1                   not null comment 'article ad flag',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null,

    foreign key (user_id) references user(id)

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'article table';

create table if not exists keyword
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- columns
    name            varchar(20)                                 not null comment 'keyword.name',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'keyword table';

create table if not exists article_block
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- fk columns
    article_id      bigint unsigned                             not null comment 'article.id',

    -- columns
    `order`           int                                         not null comment 'article block order',
    link            varchar(255)                                    null comment 'article block link',
    description     varchar(255)                                    null comment 'article block description',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null,

    foreign key (article_id) references article(id)

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'article block table';

create table if not exists article_keyword
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- fk columns
    article_id      bigint unsigned                             not null comment 'article.id',
    keyword_id      bigint unsigned                             not null comment 'keyword.id',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null,

    foreign key (article_id) references article(id),
    foreign key (keyword_id) references keyword(id)

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'article keyword table';

create table if not exists advertisement
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- fk columns
    user_id         bigint unsigned                             not null comment 'user.id',
    article_id      bigint unsigned                             not null comment 'article.id',

    -- columns
    title           varchar(255)                                not null comment 'advertisement title',
    link            varchar(255)                                not null comment 'advertisement link',
    current_price   double                                      not null comment 'advertisement price',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null,

    foreign key (user_id) references user(id),
    foreign key (article_id) references article(id)

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'advertisement table';

create table if not exists hit
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- fk columns
    user_id         bigint unsigned                             not null comment 'user.id',
    article_id      bigint unsigned                             not null comment 'article.id',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null,

    foreign key (user_id) references user(id),
    foreign key (article_id) references article(id)

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'hit table';

create table if not exists `like`
(
    -- primary key
    id              bigint unsigned                             not null auto_increment primary key,

    -- fk columns
    user_id         bigint unsigned                             not null comment 'user.id',
    article_id      bigint unsigned                             not null comment 'article.id',

    -- common columns
    created_at      timestamp       default current_timestamp   not null,
    updated_at      timestamp       default current_timestamp   not null on update current_timestamp,
    deleted_at      timestamp                                       null,

    foreign key (user_id) references user(id),
    foreign key (article_id) references article(id)

) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci
  comment = 'like table';
