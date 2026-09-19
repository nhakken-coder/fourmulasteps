/**
 * fourmulasteps アプリ設定ファイル
 * 
 * アプリ内に直接埋め込む Gemini API キーを設定します。
 * 環境変数 VITE_GEMINI_API_KEY が指定されている場合はそちらを優先します。
 */

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
export const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.6-flash";


export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ilhboivwtlalfxqbowsh.supabase.co";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_kevRD59r2WWMgNo0FakErA_VlC7Kc_g";
