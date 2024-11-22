import { FormSchemaType } from "../schemas/formSchema";
import { supabase } from "./supabaseClient";

export const addUser = async(id: string, username: string, email: string, usertype: string) => {
    const { error } = await supabase
    .from('users')
    .insert([{ 
        id, 
        email, 
        username,
        usertype
    }]);
    return { error };
}

export const fetchUser = async(id: string) => {
    const { data, error } = await supabase.from('users').select('id, usertype').eq('id', id).single();
    return { data, error }
}

export const addAppraisalPost = async (values: FormSchemaType, username: string) => {
    try {
        const getimageUrls = async () => {
            const promises = values.images.map(async (image) => {
                try {
                    const { imageUrl } = await addImage(image, username);
                    return imageUrl;
                } catch (error) {
                    throw new Error(`Image upload failed: ${error}`);
                }
            });
            return Promise.all(promises);
        };

        const imageUrls = await getimageUrls();

        const newPost = {
            ...values,
            created_at: new Date(),
            poster: username,
            images: imageUrls,
        };

        const { data, error } = await supabase
            .from('appraisal_posts')
            .insert([{ ...newPost }]);

        if (error) {
            throw new Error(`Database insert failed ${error}`);
        }

        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};

export const addImage = async (file: File | null, user: string | null) => {
    if (!file || !user) {
        return { filePath: null, imageUrl: null };
    }

    const date = new Date().toLocaleDateString('sv-SE');
    const filePath = `${date}/${file.name}`;
    let imageUrl = '';

    const { error } = await supabase.storage.from('images').upload(filePath, file);

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    if (!data || !data.publicUrl) {
        throw new Error('Failed to retrieve public URL for the uploaded image.');
    }

    imageUrl = data.publicUrl;
    return { imageUrl };
};