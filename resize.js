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
}

const resize = async (img, size = 'duplicate', name) => {
    if (!`${size}` in max) return

    const height = img.getHeight()
    const width = img.getWidth()

    let newHeight, newWidth, theNumber

    switch (size) {
        case 'thumbnail':
            theNumber = max.thumbnail
            break
        case 'small':
            theNumber = max.small
            break
        case 'medium':
            theNumber = max.medium
            break
        case 'large':
            theNumber = max.large
            break
        default:
            await img.writeAsync(
                `./assets/resized/${name}.` + img.getExtension()
            )
            return
    }

    if (size !== 'thumbnail') {
        if (height > width) {
            newWidth = (width * theNumber) / height
            newHeight = theNumber
        } else {
            newHeight = (height * theNumber) / width
            newWidth = theNumber
        }
    } else {
        newWidth = (width * theNumber) / height
        newHeight = theNumber
    }
    await img
        .resize(newWidth, newHeight)
        .writeAsync(`./assets/resized/${name}__${size}.` + img.getExtension())
}

module.exports = resize
