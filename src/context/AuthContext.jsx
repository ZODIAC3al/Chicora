import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { supabase } from "../../lib/supabase";
import Loading from "../components/Shared/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFetchingRef = useRef(false);

  // --- HELPER: Fetch Profile ---
  const fetchUserProfile = useCallback(async (userId) => {
    if (!userId || isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.error("Unexpected profile error:", err);
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  // --- INITIALIZATION ---
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          setUser(session.user);
          fetchUserProfile(session.user.id);
        }
      } catch (err) {
        console.error("Auth Init Error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // Safety Timeout
    const timeoutId = setTimeout(() => {
      if (loading && mounted) setLoading(false);
    }, 3000);

    // Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "TOKEN_REFRESHED") return;

      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, loading]);

  // --- ACTIONS (Renamed back to original names) ---

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { ...metadata, phone: metadata.phone },
        },
      });

      if (error) throw error;

      if (data.user) {
        const newProfile = {
          id: data.user.id,
          email: data.user.email,
          name: metadata.name || "",
          phone: metadata.phone || "",
          created_at: new Date().toISOString(),
          role: "client",
        };
        setProfile(newProfile);
        await supabase.from("users").insert([newProfile]);
      }
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Sign out error", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user: user ? { ...user, ...profile } : null,
    profile, // Helper for Navbar role checks
    loading,
    signIn, // Correct name for Login page
    signUp, // Correct name for Register page
    signOut, // Correct name for Navbar logout
  };

  if (loading) {
    return <Loading />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
