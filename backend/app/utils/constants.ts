// List of skills used in RS stats
export const skills = [
	{ name: 'Overall', imageUrl: '/images/skills/Overall.png' },
	{ name: 'Attack', imageUrl: '/images/skills/Attack.png' },
	{ name: 'Defence', imageUrl: '/images/skills/Defence.png' },
	{ name: 'Strength', imageUrl: '/images/skills/Strength.png' },
	{ name: 'Constitution', imageUrl: '/images/skills/Constitution.png' },
	{ name: 'Ranged', imageUrl: '/images/skills/Ranged.png' },
	{ name: 'Prayer', imageUrl: '/images/skills/Prayer.png' },
	{ name: 'Magic', imageUrl: '/images/skills/Magic.png' },
	{ name: 'Cooking', imageUrl: '/images/skills/Cooking.png' },
	{ name: 'Woodcutting', imageUrl: '/images/skills/Woodcutting.png' },
	{ name: 'Fletching', imageUrl: '/images/skills/Fletching.png' },
	{ name: 'Fishing', imageUrl: '/images/skills/Fishing.png' },
	{ name: 'Firemaking', imageUrl: '/images/skills/Firemaking.png' },
	{ name: 'Crafting', imageUrl: '/images/skills/Crafting.png' },
	{ name: 'Smithing', imageUrl: '/images/skills/Smithing.png' },
	{ name: 'Mining', imageUrl: '/images/skills/Mining.png' },
	{ name: 'Herblore', imageUrl: '/images/skills/Herblore.png' },
	{ name: 'Agility', imageUrl: '/images/skills/Agility.png' },
	{ name: 'Thieving', imageUrl: '/images/skills/Thieving.png' },
	{ name: 'Slayer', imageUrl: '/images/skills/Slayer.png' },
	{ name: 'Farming', imageUrl: '/images/skills/Farming.png' },
	{ name: 'Runecrafting', imageUrl: '/images/skills/Runecrafting.png' },
	{ name: 'Hunter', imageUrl: '/images/skills/Hunter.png' },
	{ name: 'Construction', imageUrl: '/images/skills/Construction.png' },
	{ name: 'Summoning', imageUrl: '/images/skills/Summoning.png' },
	{ name: 'Dungeoneering', imageUrl: '/images/skills/Dungeoneering.png' },
	{ name: 'Divination', imageUrl: '/images/skills/Divination.png' },
	{ name: 'Invention', imageUrl: '/images/skills/Invention.png' },
	{ name: 'Archaeology', imageUrl: '/images/skills/Archaeology.png' },
	{ name: 'Necromancy', imageUrl: '/images/skills/Necromancy.png' },
];

// User roles
export const Guest = 'guest';
export const User = 'user';
export const Admin = 'admin';

//Amount of salt rounds for hashing
export const saltRounds = process.env.SALT_ROUNDS || '10';