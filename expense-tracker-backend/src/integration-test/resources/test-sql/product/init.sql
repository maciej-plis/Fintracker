-- INIT SHOPS --
INSERT INTO purchase_shop (id, name)
VALUES ('52b29637-629d-4a10-b296-37629d8a104b', 'Auchan'),
       ('82328bbd-8a85-4da1-b28b-bd8a858da1d6', 'Leroy Merlin');

-- INIT CATEGORIES --
INSERT INTO product_category (id, name)
VALUES ('e385edcf-3028-4548-85ed-cf30282548f2', 'Food'),
       ('7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', 'Tools');

-- INIT PURCHASE 1 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('b0d87032-5c1e-4500-9870-325c1ed50005', '2021-01-01', '52b29637-629d-4a10-b296-37629d8a104b', '2024-01-01 00:00:00', '2024-01-01 00:00:00', false);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('eb1e3c4e-8640-4e83-9e3c-4e8640be834a', 'b0d87032-5c1e-4500-9870-325c1ed50005', 'Bread', 1, 1.99, 'e385edcf-3028-4548-85ed-cf30282548f2', '', 0),
       ('7d1eac4e-39da-409c-9eac-4e39da009c13', 'b0d87032-5c1e-4500-9870-325c1ed50005', 'Ammeter', 1, 99.99, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 1);

-- INIT PURCHASE 2 --
INSERT INTO purchase (id, date, shop_id, created_at, modified_at, deleted)
VALUES ('f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', '2022-12-12', '82328bbd-8a85-4da1-b28b-bd8a858da1d6', '2022-01-01 00:00:00', '2022-01-01 00:00:00', true);
INSERT INTO product (id, purchase_id, name, amount, price, category_id, description, ordinal)
VALUES ('618a7b6e-8abd-494b-8a7b-6e8abd894b7d', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Drill', 1, 299.99, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 0),
       ('b6b01935-750b-411a-b019-35750b811ab6', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Screws', 1.123, 9.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 1),
       ('06ea6428-5a64-48c1-aa64-285a6418c11b', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Nuts', 0.423, 18.49, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 2),
       ('0e9e3ae4-84b1-4555-9e3a-e484b10555ff', 'f8d4b3a8-3aaf-4ffe-94b3-a83aaf3ffee8', 'Lamp', 1, 49.99, '7c0ab0ca-8c5e-4373-8ab0-ca8c5ec373b6', '', 3);
