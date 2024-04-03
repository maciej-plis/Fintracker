-- INIT SHOPS --
INSERT INTO purchase_shop (id, name)
VALUES ('82328bbd-8a85-4da1-b28b-bd8a858da1d6', 'Leroy Merlin');

-- INIT CATEGORIES --
INSERT INTO product_category (id, name)
VALUES ('7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', 'Tools');

-- INIT PURCHASE 1 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('4e172c43-2877-49ef-972c-432877b9ef96', '2022-12-12', '82328bbd-8a85-4da1-b28b-bd8a858da1d6', '2023-01-01 00:00:00', '2023-01-01 00:00:00', false);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('ee826338-8946-4030-8263-3889468030fe', '4e172c43-2877-49ef-972c-432877b9ef96', 'Drill', 1, 299.99, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 2),
       ('c619dedb-78fc-479b-99de-db78fcb79be1', '4e172c43-2877-49ef-972c-432877b9ef96', 'Screws', 1.123, 9.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 0),
       ('aaf640fa-b488-4907-b640-fab4886907ef', '4e172c43-2877-49ef-972c-432877b9ef96', 'Nuts', 0.423, 18.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 1);
