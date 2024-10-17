-- INIT SHOPS --
INSERT INTO purchase_shop (id, name)
VALUES ('52b29637-629d-4a10-b296-37629d8a104b', 'Auchan'),
       ('82328bbd-8a85-4da1-b28b-bd8a858da1d6', 'Leroy Merlin');

-- INIT CATEGORIES --
INSERT INTO product_category (id, name)
VALUES ('e385edcf-3028-4548-85ed-cf30282548f2', 'Food'),
       ('e945a735-5dcc-45f6-85a7-355dcca5f68c', 'Sweets'),
       ('4bbdfc73-d409-4ede-bdfc-73d4091edeb2', 'Fruits'),
       ('7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', 'Tools');

-- INIT PURCHASE 1 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('b0d87032-5c1e-4500-9870-325c1ed50005', '2021-01-01', '52b29637-629d-4a10-b296-37629d8a104b', '2024-01-01 00:00:00', '2024-01-01 00:00:00', false);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('eb1e3c4e-8640-4e83-9e3c-4e8640be834a', 'b0d87032-5c1e-4500-9870-325c1ed50005', 'Bread', 1, 1.99, 'e385edcf-3028-4548-85ed-cf30282548f2', '', 0),
       ('7d1eac4e-39da-409c-9eac-4e39da009c13', 'b0d87032-5c1e-4500-9870-325c1ed50005', 'Bananas', 0.234, 29.99, '4bbdfc73-d409-4ede-bdfc-73d4091edeb2', 'Eco', 1);

-- INIT PURCHASE 2 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('4e172c43-2877-49ef-972c-432877b9ef96', '2022-12-12', '82328bbd-8a85-4da1-b28b-bd8a858da1d6', '2023-01-01 00:00:00', '2023-01-01 00:00:00', false);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('ee826338-8946-4030-8263-3889468030fe', '4e172c43-2877-49ef-972c-432877b9ef96', 'Drill', 1, 299.99, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 0),
       ('c619dedb-78fc-479b-99de-db78fcb79be1', '4e172c43-2877-49ef-972c-432877b9ef96', 'Screws', 1.123, 9.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 1),
       ('aaf640fa-b488-4907-b640-fab4886907ef', '4e172c43-2877-49ef-972c-432877b9ef96', 'Nuts', 0.423, 18.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 2);

-- INIT PURCHASE 3 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', '2022-12-12', '82328bbd-8a85-4da1-b28b-bd8a858da1d6', '2022-01-01 00:00:00', '2022-01-01 00:00:00', true);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('618a7b6e-8abd-494b-8a7b-6e8abd894b7d', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Drill', 1, 299.99, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 0),
       ('b6b01935-750b-411a-b019-35750b811ab6', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Screws', 1.123, 9.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 1),
       ('06ea6428-5a64-48c1-aa64-285a6418c11b', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Nuts', 0.423, 18.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 2);

-- INIT PURCHASE 4 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('02f5eed3-a72f-40e7-b5ee-d3a72fc0e770', '2020-12-12', '52b29637-629d-4a10-b296-37629d8a104b', '2022-01-01 01:00:00', '2022-01-01 01:00:00', false);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('7adab356-dcc7-45ea-9ab3-56dcc745ea11', '02f5eed3-a72f-40e7-b5ee-d3a72fc0e770', 'Bread', 1, 1.99, 'e385edcf-3028-4548-85ed-cf30282548f2', '', 0),
       ('41b9e7ab-51cd-4661-b9e7-ab51cdb66139', '02f5eed3-a72f-40e7-b5ee-d3a72fc0e770', 'Butter', 1, 2.99, 'e385edcf-3028-4548-85ed-cf30282548f2', '', 1);

-- INIT PURCHASE 5 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('ce149464-b1a1-4a0b-9494-64b1a17a0b6d', '2020-12-11', '52b29637-629d-4a10-b296-37629d8a104b', '2021-12-12 11:30:31', '2021-12-12 11:35:21', false);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('d05f3238-8c64-4fb3-9f32-388c644fb32d', 'ce149464-b1a1-4a0b-9494-64b1a17a0b6d', 'Potato chips', 1, 2.49, 'e385edcf-3028-4548-85ed-cf30282548f2', '', 0),
       ('f39d818a-2c5d-407c-9d81-8a2c5df07c90', 'ce149464-b1a1-4a0b-9494-64b1a17a0b6d', 'Pepsi', 1, 1.49, 'e385edcf-3028-4548-85ed-cf30282548f2', '', 1);
