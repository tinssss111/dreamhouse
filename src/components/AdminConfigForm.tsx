/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";

interface ConfigData {
  contract_address: string;
  pump_fun_url: string;
  x_link: string;
  instagram_link: string;
  tiktok_link: string;
}

export default function AdminConfigForm() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [originalConfig, setOriginalConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ConfigData = await response.json();
        setConfig(data);
        setOriginalConfig(data);
      } catch (e: unknown) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...(prevConfig as ConfigData),
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUnlock = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!password) {
      setError("Please enter password.");
      setTimeout(() => setError(null), 1500);
      return;
    }

    const response = await fetch("/api/config/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    if (response.ok) {
      setUnlocked(true);
      setMessage("Password correct! You can now edit.");
      setTimeout(() => setMessage(null), 1500);
    } else {
      setError(result.message || "Incorrect password.");
      setTimeout(() => setError(null), 1500);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage(null);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setConfig(originalConfig);
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!config || !password) {
      setError("Missing required information.");
      setTimeout(() => setError(null), 1500);
      return;
    }

    try {
      const response = await fetch("/api/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...config, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }

      setMessage("Changes saved successfully!");
      setTimeout(() => setMessage(null), 1500);
      setOriginalConfig(config);
      setIsEditing(false);
    } catch (e: unknown) {
      setError(`Update error: ${(e as Error).message}`);
      setTimeout(() => setError(null), 1500);
    }
  };

  const getFieldLabel = (field: string) => {
    switch (field) {
      case "contract_address":
        return "Contract Address";
      case "pump_fun_url":
        return "Pump.fun URL";
      case "x_link":
        return "Twitter X Link";
      case "instagram_link":
        return "Instagram Link";
      case "tiktok_link":
        return "TikTok Link";
      default:
        return field
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mb-3"></div>
          <p className="text-gray-600">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (error && !config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Back Button */}
        <div className="mb-[-50px]">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-white rounded-md border-2 border-b-4 border-black hover:bg-gray-50 transition hover:border-t-4 hover:border-b-2"
          >
            ← Back
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">$DREAMHOUSE</h1>
          <p className="text-gray-600">Admin Configuration</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-b-8 border-black">
          {!unlocked && (
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-lg text-gray-900 mb-2">
                  Authentication Required
                </h2>
                <p className="text-gray-600 text-sm">
                  Enter your admin password to continue
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Admin Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Enter password"
                  />
                </div>

                {error && (
                  <div className="">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {message && (
                  <div className="">
                    <p className="text-green-700 text-sm">{message}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleUnlock}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Unlock
                </button>
              </div>
            </div>
          )}

          {unlocked && config && (
            <div className="px-10 py-3">
              <div className="text-center mb-6"></div>
              <div className="space-y-4">
                <div className="grid gap-6">
                  {[
                    "contract_address",
                    "pump_fun_url",
                    "x_link",
                    "instagram_link",
                    "tiktok_link",
                  ].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {getFieldLabel(field)}
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        value={(config as any)[field] || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${
                          !isEditing ? "bg-gray-50 text-gray-600" : ""
                        }`}
                        placeholder={`Enter ${getFieldLabel(
                          field
                        ).toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {message && (
                  <div className="">
                    <p className="text-green-700 text-sm">{message}</p>
                  </div>
                )}

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          © 2025 $DREAMHOUSE. All rights reserved.
        </div>
      </div>
    </div>
  );
}
