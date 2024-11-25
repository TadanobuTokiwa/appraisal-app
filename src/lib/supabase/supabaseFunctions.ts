import { appraisal_posts } from "@/types/supabaseTableTypes";
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

export const getTodayAppraisalPostsByUser = async (username: string) => {

    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'形式

    const { data, error } = await supabase
        .from('appraisal_posts')
        .select('*')
        .eq('poster', username)
        .gte('created_at', `${today}T00:00:00`)
        .lt('created_at', `${today}T23:59:59`);

    if (error) {
        console.error('データ取得エラー:', error.message);
        return { data: null, error };
    }

    return { data, error: null };
};

export const getAppraisalPostById = async (id: number):Promise<appraisal_posts[] | null> => {
    try {
        const { data, error } = await supabase
            .from('appraisal_posts')
            .select('*')
            .eq('id', id)

        if (error) {
            console.error('Error fetching record:', error);
            return null;
        }
        return data;

    } catch (error) {
        console.error('Unexpected error:', error);
        return null;
    }
};

export const updateAppraisalPostById = async (id: number, newValues: Partial<appraisal_posts>) => {

    const newPost = {
        ...newValues,
        responsed_at: new Date()
    }

    try {
        const { error } = await supabase
            .from('appraisal_posts')
            .update(newPost)
            .eq('id', id);

        if (error) {
            console.error('Error updating record:', error);
            return null;
        }

        return error;
    } catch (error) {
        console.error('Unexpected error:', error);
        return null;
    }
};