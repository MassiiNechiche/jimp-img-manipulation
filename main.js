var Jimp = require('jimp');

/**
 * From what i see, image sizes are :
 *      - original
 *      - thumbnail     height always at 156px max, width accordingly
 *      - small         width or height 500px max and then scale accordingly
 *      - medium        width or height 750px max and then scale accordingly
 *      - large         width or height 750px max and then scale accordingly
 */

const max = {
	thumbnail: 156,
	small: 500,
	medium: 750,
	large: 1000,
};

const resize = async (img, size = 'duplicate') => {
	if (!`${size}` in max) return;

	const height = img.getHeight();
	const width = img.getWidth();

	let newHeight, newWidth, theNumber;

	switch (size) {
		case 'thumbnail':
			theNumber = max.thumbnail;
			break;
		case 'small':
			theNumber = max.small;
			break;
		case 'medium':
			theNumber = max.medium;
			break;
		case 'large':
			theNumber = max.large;
			break;
		default:
			await img.writeAsync(`./assets/duplicate_study.` + img.getExtension());
			return;
	}

	if (size !== 'thumbnail') {
		if (height > width) {
			newWidth = (width * theNumber) / height;
			newHeight = theNumber;
		} else {
			newHeight = (height * theNumber) / width;
			newWidth = theNumber;
		}
	} else {
		newWidth = (width * theNumber) / height;
		newHeight = theNumber;
	}
	await img.resize(newWidth, newHeight).writeAsync(`./assets/${size}_study.` + img.getExtension());
};

Jimp.read('./images/study.png')
	.then(async (img) => {
		// Duplicate
		await resize(img);

		// Thumbnail
		await resize(img, 'thumbnail');

		// Small
		await resize(img, 'small');

		// Medium
		await resize(img, 'medium');

		// Large
		await resize(img, 'large');
	})
	.catch((err) => console.log(err));
