import features from "@/lib/fixtures/features.json";
import environments from "@/lib/fixtures/environments.json";
import { SyntheticEvent } from "react";

const updateLocation = () => {};
const FeatureFlagListView = () => {
  const handleEnvironment = async (formData: FormData) => {
    "use server";
    console.log(formData);
  };
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    "use client"
    e.preventDefault();
    const formData = new FormData();
  };
  const handleSelect = () => {};
  const selectEnvironment = handleEnvironment.bind(null);
  return (
    <form action={selectEnvironment} onSubmit={handleSubmit}>
      <button>Submit</button>
      <div className="form-group">
        <label htmlFor="environment">Environment</label>
        <select id="environment" name="environment" required>
          <option value="">Please Select Environment</option>
          {environments.map(({ label, environment }) => (
            <option value={environment}>{label}</option>
          ))}
        </select>
      </div>
      <ul>
        {features.map(({ id, name }) => (
          <li id={id.toString()} key={id}>
            {name}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default FeatureFlagListView;
