"use client";

import { useState, useRef, useEffect } from "react";
import { useGeocoding, GeoResult } from "@/lib/hooks/use-geocoding";
import { MapPin, Loader2, Search } from "lucide-react";
import { inputClass } from "@/lib/utils/styles";

interface Props {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  onSelect: (result: GeoResult) => void;
  required?: boolean;
}

export default function LocationInput({
  name,
  placeholder = "Rechercher une ville...",
  defaultValue = "",
  onSelect,
  required = false,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const { results, isLoading, search, clear } = useGeocoding();
  const containerRef = useRef<HTMLDivElement>(null);

  // Ferme le dropdown si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        clear();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clear]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    search(val);
    setIsOpen(true);
  };

  const handleSelect = (result: GeoResult) => {
    const city =
      result.address?.city ||
      result.address?.town ||
      result.address?.village ||
      result.display_name.split(",")[0];

    setValue(city);
    setIsOpen(false);
    clear();
    onSelect(result);
  };

  const formatName = (result: GeoResult) => {
    const parts = result.display_name.split(",");
    return {
      main: parts[0].trim(),
      sub: parts.slice(1, 3).join(",").trim(),
    };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Input visible — affiche le nom */}
      <div className="relative">
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          aria-hidden="true"
        >
          {isLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Search size={15} />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => value.length > 1 && setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          className={`${inputClass} pl-10`}
          autoComplete="off"
        />
      </div>

      {/* Inputs hidden pour lat/lng/name */}
      <input type="hidden" name={name} value={value} />

      {/* Dropdown suggestions */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
          {results.map((result, i) => {
            const { main, sub } = formatName(result);
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(result)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-0"
              >
                <MapPin size={14} className="text-[#BC4800] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">
                    {main}
                  </p>
                  <p className="text-xs text-stone-400 truncate">{sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Pas de résultats */}
      {isOpen && !isLoading && value.length > 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg p-4 text-center">
          <p className="text-sm text-stone-400">Aucun résultat trouvé</p>
        </div>
      )}
    </div>
  );
}
