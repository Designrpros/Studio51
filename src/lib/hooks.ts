import { useState, useEffect } from "react";
import { configureCloudKit, RecordType } from "@/lib/cloudkit";

export function useCloudKitData(recordType: string) {
  const [data, setData] = useState<RecordType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const container = await configureCloudKit();
        const query = { recordType };
        const response = await container.publicCloudDatabase.fetchRecords(query);
        setData(response.records);
        setError(null);
      } catch (err: unknown) {
        setError("Failed to fetch data.");
        console.error("CloudKit fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recordType]);

  return { data, error, loading };
}