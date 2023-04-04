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
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    'Romanian Two Piece Mess Kit',
    'Description text...',
    'Camp Cooking and Field Stoves',
    14.99,
    'https://www.varusteleka.com/pictures/thumbs500a/50270609e578001911.jpg'
  );
INSERT INTO `items` (
    `itemName`,
    `description`,
    `category`,
    `price`,
    `image`
  )
VALUES (
    'French F1/F2 2-Person Tent',
    'Description text...',
    'Shelters',
    39.99,
    'https://www.varusteleka.com/pictures/thumbs500a/214595ef099010975d.jpg'
  );