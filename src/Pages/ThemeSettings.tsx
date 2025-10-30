import React from "react";
import { supabase } from "../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils/utils";

interface Theme {
  id: string;
  name: string;
  gradient: string;
  icon: string;
}

interface UserProfile {
  id: string;
  wellness_theme?: string;
  is_dark_mode?: boolean;
}

export default function ThemeSettings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, wellness_theme, is_dark_mode')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { mutate: updateTheme } = useMutation({
    mutationFn: async ({ theme, isDarkMode }: { theme?: string; isDarkMode?: boolean }) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('profiles')
        .update({
          wellness_theme: theme,
          is_dark_mode: isDarkMode,
        })
        .eq('id', user.id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  const isDarkMode = profile?.is_dark_mode ?? false;
  const currentTheme = profile?.wellness_theme;

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 pt-8">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Profile"))}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Theme Settings
          </h1>
        </div>

        {/* Dark Mode Toggle */}
        <Card className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${isDarkMode ? 'bg-indigo-600' : 'bg-yellow-400'} flex items-center justify-center transition-colors`}>
                {isDarkMode ? <Moon className="w-6 h-6 text-white" /> : <Sun className="w-6 h-6 text-gray-900" />}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600">
                  {isDarkMode ? 'Currently enabled' : 'Currently disabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={(checked) => updateTheme({ isDarkMode: checked })}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}