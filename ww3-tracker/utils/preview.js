import videoExtensions from "video-extensions";
import imageExtensions from "image-extensions";

export default async function getMediaPreview(url) {

    if (url.includes("ww3tracker.s3.amazonaws.com")) {
        const type = url.split(".").pop();
        if (type in videoExtensions) {
            return {
                type: "video",
                description: null,
                image: url,
                favicon: null
            }
        } else if (type in imageExtensions) {
            return {
                type: "img",
                description: null,
                image: url,
                favicon: null
            }
        } else {
            return {
                type: "img",
                description: null,
                image: url,
                favicon: null
            }
        }
    }

    return {
        ...data,
        type: "img"
    }

}