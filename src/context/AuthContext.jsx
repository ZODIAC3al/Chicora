import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { supabase } from "../../lib/supabase";
const AuthContext = createContext();
export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUserSession = useCallback(async (user) => {
    try {
      setUser(user);
      setLoading(true);

      const { data: existingProfile, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError || !existingProfile) {
        const { data: newProfile, error: createError } = await supabase
          .from("users")
          .upsert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || "",
            phone: user.user_metadata?.phone || "",
            created_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        if (
          user.user_metadata?.phone &&
          existingProfile.phone !== user.user_metadata.phone
        ) {
          const { data: updatedProfile, error: updateError } = await supabase
            .from("users")
            .update({ phone: user.user_metadata.phone })
            .eq("id", user.id)
            .select()
            .single();

          if (updateError) throw updateError;
          setProfile(updatedProfile);
        } else {
          setProfile(existingProfile);
        }
      }

      setError(null);
    } catch (err) {
      console.error("User session handling error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      return data;
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email, password, metadata = {}) => {
    try {
      setLoading(true);
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            phone: metadata.phone,
          },
        },
      });

      if (authError) throw authError;

      if (data.user) {
        const { error: profileError } = await supabase.from("users").upsert({
          id: data.user.id,
          email: data.user.email,
          name: metadata.name || "",
          phone: metadata.phone || "",
          created_at: new Date().toISOString(),
        });

        if (profileError) throw profileError;
      }

      return data;
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error("Sign out error:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      if (!user) throw new Error("User not authenticated");
      setLoading(true);

      if (updates.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: updates.email,
        });
        if (authError) throw authError;
      }

      const { data, error: profileError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (profileError) throw profileError;
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);
  // In your Supabase service file
 const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        phone: updates.phone,
        details: updates.details
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { user: data, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

  useEffect(() => {
    let mounted = true;
    let authSubscription;

    const initializeAuth = async () => {
      try {
        setLoading(true);

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session check error:", sessionError);
          if (mounted) setError(sessionError);
          return;
        }

        if (session?.user && mounted) {
          await handleUserSession(session.user);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (!mounted) return;

            try {
              if (session?.user) {
                await handleUserSession(session.user);

                if (event === "SIGNED_IN" && typeof navigate === "function") {
                  navigate("/");
                }
              } else {
                setUser(null);
                setProfile(null);

                if (typeof navigate === "function" && 
                    window.location.pathname !== "/") {
                  navigate("/");
                }
              }
            } catch (err) {
              console.error("Auth state change error:", err);
              setError(err);
            } finally {
              if (mounted) setLoading(false);
            }
          }
        );

        authSubscription = subscription;
      } catch (err) {
        console.error("Initialization error:", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (authSubscription?.unsubscribe) {
        authSubscription.unsubscribe();
      }
    };
  }, [navigate, handleUserSession]);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateUserProfile
  }), [user, profile, loading, error, signIn, signUp, signOut, updateProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  navigate: PropTypes.func,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};