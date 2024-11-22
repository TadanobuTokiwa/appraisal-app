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