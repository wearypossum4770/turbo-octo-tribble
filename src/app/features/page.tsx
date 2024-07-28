"use client";
import features from "@/lib/fixtures/features.json";
import environments from "@/lib/fixtures/environments.json";
// 22055
import { useRouter } from "next/navigation";
import { SyntheticEvent, useReducer } from "react";

const FeatureFlagListView = () => {
  const router = useRouter();
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { environment, feature } = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    router.push(`/features/${environment}/${feature}`);
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      <button>Submit</button>
      <div className="form-group">
        <label htmlFor="environment">Environment</label>
        <select id="environment" name="environment" required>
          <option value="" disabled>
            Please Select Environment
          </option>
          {environments.map(({ id, label, environment }) => (
            <option key={id} value={environment}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Feature</label>
        <select id="feature" name="feature" required>
          <option value="" disabled>
            Please Select Feature
          </option>
          {features.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default FeatureFlagListView;
