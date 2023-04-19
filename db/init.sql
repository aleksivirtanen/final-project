CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(60),
  `itemName` varchar(60) NOT NULL,
  `description` varchar(255),
  `category` varchar(60) NOT NULL,
  `price` FLOAT NOT NULL,
  `image` varchar(200),
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
INSERT INTO `users` (`id`, `name`, `email`, `password`)
VALUES (
    1,
    'Seppo Raty',
    'seppo@raty.com',
    '$2a$12$stzoKdDeAhklwUiwIKyK7./Ijl3L03UxMyKg.ElzCrgQCW9wkA7Wi'
  );
INSERT INTO `users` (`id`, `name`, `email`, `password`)
VALUES (
    2,
    'Matti Meikalainen',
    'matti@meikalainen.com',
    '$2a$12$stzoKdDeAhklwUiwIKyK7./Ijl3L03UxMyKg.ElzCrgQCW9wkA7Wi'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    1,
    'Swiss Three Piece Mess Kit',
    'Description text...',
    'Camp Cooking and Field Stoves',
    19.99,
    'https://www.varusteleka.com/pictures/thumbs500a/472425ea198159a9fc.jpg'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    1,
    'Romanian Two Piece Mess Kit',
    'Description text...',
    'Camp Cooking and Field Stoves',
    14.99,
    'https://www.varusteleka.com/pictures/thumbs500a/50270609e578001911.jpg'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    2,
    'French F1/F2 2-Person Tent',
    'Description text...',
    'Shelters',
    39.99,
    'https://www.varusteleka.com/pictures/thumbs500a/214595ef099010975d.jpg'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    2,
    'Carinthia Compression Bag',
    'Description text... Description text... Description text...',
    'Sleeping Bags and Pads',
    30.55,
    'https://www.varusteleka.com/pictures/thumbs500a/4941961c1dec538865.jpg'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    1,
    'UCO Waterproof Matches',
    'Description text...',
    'Fire and Warmth',
    3.99,
    'https://www.varusteleka.com/pictures/thumbs500a/54950624ff648ecd1e.jpg'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    1,
    'Dutch 1Q Canteen with Pouch and Cup',
    'Description text...',
    'Canteens and Hydration Bladders',
    17.99,
    'https://www.varusteleka.com/pictures/thumbs500a/50911616963c84be2d.jpg'
  );
INSERT INTO `items` (
    `userId`,
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    2,
    'Robens Fjell Trekking Towel',
    'Description text...',
    'Hygiene and Wash up',
    14.99,
    'https://www.varusteleka.com/pictures/thumbs500a/550856272883999184.jpg'
  );