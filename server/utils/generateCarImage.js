import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateCarImage = async (make, model, color) => {
    try {
        const prompt = `A realistic, high-quality PNG image of a single ${color} ${make} ${model} car, parked on a transparent background, 45 degree front to side view, studio lighting, no other distractions, where the car is in full view`;

        const output = await replicate.run(
            "fofr/sticker-maker:4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a",
            {
                input: {
                    steps: 17,
                    width: 1152,
                    height: 1152,
                    prompt: prompt,
                    output_format: "png",
                    output_quality: 100,
                    negative_prompt: "",
                    number_of_images: 1
                }
            }
        );

        const imageUrl = output[0];

        // const uploaded = await cloudinary.uploader.upload(imageUrl, {
        //     folder: "cars",
        //     format: "png",
        // });

        // return uploaded.secure_url;

        return imageUrl;

    } catch (err) {
        console.error("generateCarImage error:", err.message);
        throw err;
    }
};
