import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(`
    Missing Supabase configuration!
    Please ensure you have set:
    - VITE_SUPABASE_URL
    - VITE_SUPABASE_ANON_KEY
    in your .env file
  `);
  
  // You might want to throw an error in development
  if (import.meta.env.DEV) {
    throw new Error('Missing Supabase configuration in development');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth functions
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('Sign in error:', error);
    return { error };
  }
};

export const signUpWithEmail = async (email, password, metadata = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  } catch (error) {
    console.error('Sign up error:', error);
    return { error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data?.session, error };
  } catch (error) {
    console.error('Get session error:', error);
    return { error };
  }
};

export const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user, error };
  } catch (error) {
    console.error('Get user error:', error);
    return { error };
  }
};

// Database functions
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { profile: data, error };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { error };
  }
};

export const getPublicServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);
    return { services: data, error };
  } catch (error) {
    console.error('Get public services error:', error);
    return { error };
  }
};

export const getServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);
    return { services: data, error };
  } catch (error) {
    console.error('Get services error:', error);
    return { error };
  }
};

export const createOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select();
    return { order: data?.[0], error };
  } catch (error) {
    console.error('Create order error:', error);
    return { error };
  }
};

export const getOrders = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, services(*)')
      .eq('user_id', userId);
    return { orders: data, error };
  } catch (error) {
    console.error('Get orders error:', error);
    return { error };
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    return { users: data, error };
  } catch (error) {
    console.error('Get all users error:', error);
    return { error };
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select();
    return { user: data?.[0], error };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { error };
  }
};

export default supabase;