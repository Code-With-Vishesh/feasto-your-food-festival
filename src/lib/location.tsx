import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const JAIPUR_AREAS = [
  "Jaipur",
  "C-Scheme",
  "Malviya Nagar",
  "Vaishali Nagar",
  "Mansarovar",
  "Jagatpura",
  "Raja Park",
  "Civil Lines",
  "Bani Park",
  "MI Road",
  "Sanganer",
  "Tonk Road",
  "Lal Kothi",
  "Amer",
];

interface LocationValue {
  location: string;
  setLocation: (l: string) => void;
}

const Ctx = createContext<LocationValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState("Jaipur");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("feasto-location");
      if (saved) setLocation(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("feasto-location", location);
    } catch {
      /* ignore */
    }
  }, [location]);

  return <Ctx.Provider value={{ location, setLocation }}>{children}</Ctx.Provider>;
}

export function useLocationArea() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocationArea must be used within LocationProvider");
  return ctx;
}
