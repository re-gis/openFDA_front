import React, { useState } from "react";
import { Recommendation } from "../interfaces/Recommendation";
import { AxiosResponse } from "axios";
import instance from "../services/api";
import { toast } from "react-toastify";

const SearchInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Recommendation | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response: AxiosResponse = await instance.post("/recs", { input });
      toast.success("Recommendations fetched successfully.");
      setRecommendations(response.data);
    } catch (error) {
      setLoading(false);
      setRecommendations(null);
      toast.error(
        `No recommendations found for ${input}, Try something precise and different!`
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a medicine or symptom..."
        className="px-4 py-2 w-72 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 ml-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
      {loading && <p className="mt-2 text-gray-600">Loading...</p>}
      {recommendations ? (
        <div className="mt-6 text-left flex flex-col items-center w-[100%]">
          <h3 className="font-semibold text-lg">Recommendations:</h3>
          <div className="flex flex-row gap-10 items-center justify-center w-[80%]">
            <div className="flex flex-col gap-5 w-[50%]">
              <h4 className="font-bold mt-4">Medications:</h4>
              <ul>
                {recommendations.medications.map((med, index) => (
                  <li key={index}>{med.brand_name || "Unknown"}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="font-bold mt-4">Tests:</h4>
              <ul>
                {recommendations.tests.length != 0 ? (
                  recommendations.tests.map((test, index) => (
                    <li key={index}>{test.name || "Unknown"}</li>
                  ))
                ) : (
                  <li>No tests found.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="mt-8">
          No Recommendations yet, Please type in something precise.
        </h1>
      )}
    </div>
  );
};

export default SearchInput;
