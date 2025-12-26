import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTngUFrMkO9_wLxEMS2lW4kMZmaP4NzOcqt1G5FLFLGvsanIbMcy3krdsQ0mo2dc154_cKvbF0TLzQ8/pub?gid=0&single=true&output=csv";

export const useGuestName = () => {
  const [guestName, setGuestName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // URLSearchParams is case-sensitive, so accept several common variants.
    const kodeParam =
      searchParams.get("kode") ??
      searchParams.get("Kode") ??
      searchParams.get("KODE");
    const kode = kodeParam?.trim();

    // If no kode parameter, check for legacy "to" parameter
    if (!kode) {
      const legacyName = searchParams.get("to")?.replace(/_/g, " ");
      setGuestName(legacyName || undefined);
      setIsLoading(false);
      return;
    }

    // Fetch from Google Sheet CSV
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csv) => {
        const kodeNormalized = kode
          .toUpperCase()
          // common typo: 0 (zero) used instead of O
          .replace(/^A0/, "AO");

        const rows = csv
          .split(/\r?\n/)
          .filter(Boolean)
          .map((r) => r.split(","));

        const data = rows.slice(1); // skip header
        const tamu = data.find((row) =>
          (row[0] ?? "")
            .replace(/^\uFEFF/, "")
            .trim()
            .toUpperCase() === kodeNormalized
        );

        if (tamu && tamu[1]) {
          setGuestName(tamu[1].trim());
        } else {
          setGuestName(undefined);
        }
      })
      .catch((err) => {
        console.error("Error fetching guest data:", err);
        setGuestName(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return { guestName, isLoading };
};
